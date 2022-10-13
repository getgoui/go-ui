import fs from 'fs-extra';
import path from 'path';
import { createSpinner } from 'nanospinner';
import { buildIa } from './build-ia';
import { loadConfig } from 'bin/utils/config';
import chokidar from 'chokidar';
import { getContentDir, getGoPressDir } from 'bin/utils/paths';
import { getTimestamp } from 'bin/utils/timestamp';
import { exec } from 'child_process';
import chalk from 'chalk';

/**
 * Start gopress dev server
 * @param args
 * dir : base directory path for site.
 */
export default async function dev(args) {
  const { dir } = args;
  // copy site files
  await copySiteFiles(dir);

  if (!fs.existsSync(getContentDir(dir))) {
    await copySampleContents(dir);
  }

  // install dependencies
  await installDeps(dir);

  // // load config and generate ia
  // const config = await loadConfig();
  // // write config file with loaded config
  // await writeConfig(config, dir);

  // await buildIa(config, dir);
  // const contentDir = getContentDir(dir);
  // const contentWatcher = chokidar
  //   .watch(contentDir, {
  //     ignored: /(^|[\/\\])\../,
  //     ignoreInitial: true,
  //   })
  //   .on('all', (event, file) => {
  //     buildIa(config, dir);
  //   });

  // // start dev server
  // const goPressDir = getGoPressDir(dir);

  // console.log(chalk.green(`✈️  ${getTimestamp()} Starting local dev server.`));
  // const docsServeProcess = exec('npx stencil build --dev --watch --serve', { cwd: goPressDir });
  // docsServeProcess.stdout.pipe(process.stdout);

  // process.on('SIGINT', function () {
  //   contentWatcher.close();
  //   docsServeProcess.kill();
  // });
}

async function copySampleContents(dir) {
  const spinner = createSpinner('Copying sample content file').start();
  const srcDir = path.resolve(__dirname, `../template/content`);
  const destDir = path.resolve(getContentDir(dir));

  // To copy a folder or file, select overwrite accordingly
  try {
    fs.copySync(srcDir, destDir, { overwrite: false });
    spinner.success({ mark: '✅', text: `${getTimestamp()} Sample content copied.` });
  } catch (err) {
    spinner.error();
  }
}

async function copySiteFiles(dir) {
  const spinner = createSpinner('Creating GoPress site files').start();
  const srcDir = path.resolve(__dirname, `../template/.gopress`);
  const destDir = path.resolve(getGoPressDir(dir));

  // To copy a folder or file, select overwrite accordingly
  try {
    fs.copySync(srcDir, destDir, { overwrite: true });
    spinner.success({ mark: '✅', text: `${getTimestamp()} GoPress files created.` });
  } catch (err) {
    spinner.error();
  }
}

async function writeConfig(data, dir) {
  const spinner = createSpinner('Creating config cache file.').start();
  const destFile = path.resolve(`${getGoPressDir(dir)}/config.ts`);

  try {
    const content = `export default ${JSON.stringify(data, null, 2)}`;
    fs.writeFileSync(destFile, content);
    spinner.success({ mark: '🛠️ ', text: `${getTimestamp()} Site config loaded.` });
  } catch (err) {
    spinner.error();
  }
}

async function installDeps(dir) {
  const spinner = createSpinner(`${getTimestamp()} Installing GoPress dependencies.`).start();
  try {
    const goPressDir = getGoPressDir(dir);
    const docsServeProcess = exec('pnpm i', { cwd: goPressDir });
    docsServeProcess.stdout.pipe(process.stdout);
    spinner.success({ mark: '🛠️ ', text: `${getTimestamp()} Dependencies installed.` });
  } catch (err) {
    spinner.error();
  }
}
