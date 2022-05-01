import { resolve } from 'path';
import { buildSync } from 'esbuild';

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
