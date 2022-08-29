import chalk from 'chalk';
import chokidar from 'chokidar';
import path from 'path';
import { exec } from 'child_process';
import { createSpinner } from 'nanospinner';
import util from 'util';
import readline from 'readline';

const execPromise = util.promisify(exec);

const buildCore = async file => {
  const spinner = createSpinner('📦 Building core components').start();
  await execPromise('pnpm build.core');
  spinner.success({ text: 'Core library built', mark: '📦' });
};

const buildIa = async file => {
  const spinner = createSpinner('🎄 Compiling docs site content').start();
  await execPromise('pnpm --filter @go-ui/docs build.ia');
  spinner.success({ text: 'Docs site content compiled', mark: '🎄' });
};

function startDevDocsServer() {
  console.log(chalk.green('✈️ Starting docs site server.'));
  const docsServeProcess = exec('pnpm dev.docs');
  docsServeProcess.stdout.pipe(process.stdout);
  return docsServeProcess;
}

function killDocsServer(process) {
  process.kill();
  console.log(chalk.red('🗡️ Docs server killed'));
}

/**
 * Watch file changes and run custom commands
 */
export default async function dev(args) {
  const rootPath = path.resolve(__dirname, '../');
  // 1. build core
  await buildCore();

  // 2. build docs site IA
  await buildIa();

  // 3. start docs site server
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  let serverProcess = startDevDocsServer();
  console.log(chalk.green('✈️ Docs site started [press r key to restart dev server]'));

  process.stdin.on('keypress', (str, key) => {
    if (key.name === 'r') {
      killDocsServer(serverProcess);
      serverProcess = startDevDocsServer();
    }

    if (key.ctrl && key.name === 'c') {
      killDocsServer(serverProcess);
      process.exit();
    }
  });

  // 4. watch core component changes -> build core
  // 5. watch docs content changes -> build iA

  console.log(chalk.green('👀 Watching for changes...'));
  const watch = {
    [`${rootPath}/docs/content/**/*`]: buildIa,
    [`${rootPath}/packages/core/src/**/*`]: async () => {
      // stop current server
      serverProcess.kill();
      await buildCore();
      serverProcess = exec('pnpm dev.docs');
      serverProcess.stdout.pipe(process.stdout);
    },
  };

  const watchers = [];
  Object.entries(watch).forEach(([path, command]) => {
    const watcher = chokidar
      .watch(path, {
        ignored: /(^|[\/\\])\../,
        ignoreInitial: true,
      })
      .on('all', (event, file) => {
        command(file);
      });

    watchers.push(watcher);
  });
  process.on('SIGINT', function() {
    watchers.forEach(watcher => watcher.close());
    console.log(chalk.green(`- Stopped watching.`));
  });
}
