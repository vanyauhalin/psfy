import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { buildSync } from 'esbuild';
import postcss from 'postcss';
import postcssCsso from 'postcss-csso';
import postcssImport from 'postcss-import';

/**
 * Simple log wrapper.
 */
const log = (() => {
  let state = 'info';
  /**
   * Returns the current time.
   * @returns {string}
   */
  function time() {
    const date = new Date().toLocaleString('en-US');
    const [, hoursminutesseconds] = date.split(' ');
    const [hours, minutes, seconds] = hoursminutesseconds.split(':');
    return `${hours}:${minutes}:${seconds}`;
  }
  /**
   * @param {string} message
   * @returns {void}
   */
  function inner(message) {
    inner.force(state, message);
  }
  /**
   * @param {string} type
   * @param {string} message
   * @returns {void}
   */
  inner.force = (type, message) => {
    /* eslint-disable-next-line no-console */
    console.log(`[${type}] ${time()} ${message}`);
  };
  /**
   * @param {string} type
   * @returns {void}
   */
  inner.set = (type) => {
    state = type;
  };
  /**
   * @param {string} message
   * @returns {void}
   */
  inner.warn = (message) => {
    inner.force('warn', message);
  };
  /**
   * @param {string} message
   * @returns {void}
   */
  inner.info = (message) => {
    inner.force('info', message);
  };
  return inner;
})();

/**
 * Simple scripts wrapper based on npm events.
 */
const scripts = (() => {
  const store = new Map();
  /**
   * @param {string} name
   * @param {() => void} callback
   * @returns {void}
   */
  function inner(name, callback) {
    store.set(name, callback);
  }
  /**
   * @param {string?} event
   * @returns {void}
   */
  inner.run = (event = process.env.npm_lifecycle_event) => {
    if (store.has(event)) {
      log.info(`Running ${event}`);
      store.get(event)();
      log.info(`Finished ${event}`);
      return;
    }
    throw new Error(`Script ${event} not found`);
  };
  return inner;
})();

/**
 * @param {string} src
 * @param {string} dest
 * @returns {void}
 */
function copy(src, dest) {
  const [, outputFile] = src.match(/.+\/(.+)/);
  writeFileSync(resolve(`${dest}/${outputFile}`), readFileSync(resolve(src)), {
    flag: 'w',
  });
}

scripts('build-colors', () => {
  copy('src/color.ini', 'lib');
});

scripts('build-scripts', () => {
  const result = buildSync({
    allowOverwrite: true,
    bundle: true,
    entryPoints: [resolve('src/scripts/main.ts')],
    minify: true,
    outfile: resolve('lib/psfy.js'),
    platform: 'browser',
  });
  if (result.errors.length > 0) {
    throw new Error(result.errors);
  }
});

scripts('build-styles', () => {
  const from = resolve('src/styles/main.css');
  postcss()
    .use(postcssCsso())
    .use(postcssImport())
    .process(readFileSync(from), {
      from,
    })
    .then((result) => {
      writeFileSync(resolve('lib/user.css'), result.css, {
        flag: 'w',
      });
    });
});

scripts('build', () => {
  scripts.run('build-colors');
  scripts.run('build-scripts');
  scripts.run('build-styles');
});

scripts.run();
