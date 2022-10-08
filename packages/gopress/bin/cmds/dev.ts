import fs from 'fs-extra';
import path from 'path';
import { createSpinner } from 'nanospinner';
import { buildIa } from './build-ia';
import { loadConfig } from 'bin/utils/config';
import chokidar from 'chokidar';
import { getContentDir } from 'bin/utils/paths';
import { getTimestamp } from 'bin/utils/timestamp';

/**
 * Start gopress dev server
 * @param args
 * dir : base directory path for site.
 */
export default async function dev(args) {
  const { dir } = args;
  // copy site files
  await copySiteFiles(dir);
  // load config and generate ia
  const config = await loadConfig();

  await buildIa(config, dir);
  const contentDir = getContentDir(dir);
  const contentWatcher = chokidar
    .watch(contentDir, {
      ignored: /(^|[\/\\])\../,
      ignoreInitial: true,
    })
    .on('all', (event, file) => {
      buildIa(config, dir);
    });
  process.on('SIGINT', function () {
    contentWatcher.close();
  });

  // start dev server
  const workingDir = path.resolve(dir || process.cwd());
}
async function copySiteFiles(dir) {
  const spinner = createSpinner('Creating GoPress site files').start();
  const srcDir = path.resolve(__dirname, `../site`);
  const destDir = path.resolve(dir || process.cwd(), '.gopress');

  // To copy a folder or file, select overwrite accordingly
  try {
    fs.copySync(srcDir, destDir, { overwrite: false });
    spinner.success({ mark: '✅', text: `${getTimestamp()} GoPress files created.` });
  } catch (err) {
    spinner.error();
  }
}
