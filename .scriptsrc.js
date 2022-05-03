import { execSync } from 'child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { extname, resolve } from 'path';
import chokidar from 'chokidar';
import { buildSync } from 'esbuild';
import postcss from 'postcss';
import postcssCsso from 'postcss-csso';
import postcssImport from 'postcss-import';

/**
 * Utils
 * -----------------------------------------------------------------------------
 */

/**
 * Simple log wrapper.
 */
const log = (() => {
  let state = 'info';
  /**
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
   */
  function inner(message) {
    inner.force(state, message);
  }
  /**
   * @param {string} type
   * @param {string} message
   */
  inner.force = (type, message) => {
    /* eslint-disable-next-line no-console */
    console.log(`[${time()} ${type}] ${message}`);
  };
  /**
   * @param {string} type
   * @returns {typeof log} log instance.
   */
  inner.type = (type) => {
    state = type;
    return log;
  };
  /**
   * @param {string} message
   */
  inner.warn = (message) => {
    inner.force('warn', message);
  };
  /**
   * @param {string} message
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
   * @param {string} event npm event in `package.json`.
   * @param {() => void} callback callback to run when the event is triggered.
   */
  function inner(event, callback) {
    store.set(event, callback);
  }
  /**
   * @param {string?} event npm event in `package.json`.
   */
  inner.run = async (event = process.env.npm_lifecycle_event) => {
    if (store.has(event)) {
      await store.get(event)();
      return;
    }
    throw new Error(`Script ${event} not found`);
  };
  return inner;
})();

/**
 * @param {string} file
 */
function extractDirectory(file) {
  const [, directory] = file.match(/(.+)\//);
  return directory;
}

/**
 * @param {PathOrFileDescriptor} file
 * @param {string | NodeJS.ArrayBufferView} data
 */
function write(file, data) {
  const directory = extractDirectory(file);
  if (!existsSync(directory)) {
    mkdirSync(directory);
  }
  writeFileSync(resolve(file), data, {
    flag: 'w',
    recursive: true,
  });
}

/**
 * @param {string} src
 * @param {string} dest
 */
function copy(src, dest) {
  const [, outputFile] = src.match(/.+\/(.+)/);
  write(`${dest}/${outputFile}`, readFileSync(resolve(src)));
}

/**
 * @param {string} command
 * @returns {string}
 */
function echo(command) {
  return execSync(command).toString().trim();
}

/**
 * Build scripts
 * -----------------------------------------------------------------------------
 */

scripts('build-colors', () => {
  log('Building colors');
  copy('src/color.ini', 'lib');
});

scripts('build-scripts', () => {
  log('Building scripts');
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

scripts('build-styles', async () => {
  log('Building styles');
  const processor = postcss()
    .use(postcssCsso())
    .use(postcssImport());
  const from = resolve('src/styles/main.css');
  const result = await processor.process(readFileSync(from), {
    from,
  });
  write('lib/user.css', result.css);
});

scripts('build', async () => {
  scripts.run('build-colors');
  scripts.run('build-scripts');
  await scripts.run('build-styles');
});

/**
 * Serve script
 * -----------------------------------------------------------------------------
 */

/**
 * @returns {string} Spicetify config directory.
 */
function checkSpicetify() {
  try {
    execSync('spicetify');
  } catch (error) {
    throw new Error('Spicetify is not installed');
  }
  const root = extractDirectory(echo('spicetify -c'));
  if (!(root && existsSync(root))) {
    throw new Error('Spicetify config directory does not exist');
  }
  return root;
}

/**
 * @param {string} root Spicetify config directory.
 */
function checkTheme(root) {
  if (!existsSync(`${root}/Themes/psfy`)) {
    log.warn('Theme directory does not exist. Creating...');
    mkdirSync(`${root}/Themes/psfy`);
  }
  if (echo('spicetify config current_theme') !== 'psfy') {
    log.warn('Theme is not set. Setting...');
    execSync('spicetify config current_theme psfy');
  }
}

function checkExtension() {
  if (!echo('spicetify config extensions').includes('psfy.js')) {
    log.warn('Extension is not set. Setting...');
    execSync('spicetify config extensions psfy.js');
  }
}

/**
 * @param {string} root Spicetify config directory.
 */
function check() {
  log('Checking Spicetify');
  const root = checkSpicetify();
  checkTheme(root);
  checkExtension();
  return root;
}

/**
 * @param {string} root Spicetify config directory.
 */
function installStyles(root) {
  log('Install styles');
  copy('lib/user.css', `${root}/Themes/psfy`);
}

/**
 * @param {string} root Spicetify config directory.
 */
function installScripts(root) {
  log('Install scripts');
  copy('lib/psfy.js', `${root}/Extensions`);
}

/**
 * @param {string} root Spicetify config directory.
 */
function installColors(root) {
  log('Install colors');
  copy('lib/color.ini', `${root}/Themes/psfy`);
}

function update() {
  log('Updating changes');
  execSync('spicetify update');
}

function apply() {
  log('Apply changes');
  execSync('spicetify apply');
}

function enable() {
  log('Enabling devtools');
  execSync('spicetify enable-devtools');
}

scripts('serve', () => {
  const root = check();
  let isReady = false;
  chokidar.watch('src')
    .on('ready', () => {
      isReady = true;
      log.info('Initial scan complete');
    })
    .on('all', (event, path) => {
      if (!isReady) return;
      log.type(event)(path);
      switch (extname(path)) {
        case '.css':
          scripts.run('build-styles');
          installStyles(root);
          break;
        case '.ts':
          scripts.run('build-scripts');
          installScripts(root);
          break;
        case '.ini':
          scripts.run('build-colors');
          installColors(root);
          break;
        default:
          return;
      }
      update();
      apply();
      enable();
    });
});

/**
 * You are welcome
 * -----------------------------------------------------------------------------
 */

scripts.run();
