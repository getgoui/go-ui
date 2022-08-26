import chalk from 'chalk';
import chokidar from 'chokidar';
import path from 'path';
import { exec } from 'child_process';
import cpr from 'cpr';

/**
 * Watch file changes and run custom commands
 */
export default async function watch(args) {
  const rootPath = path.resolve(__dirname, '../');

  console.log(chalk.green('Watching for changes...'));

  const rebuildCoreComps = file => {
    console.log(chalk.green(`🐌 Core file [${file}] changed, rebuilding core`));
    exec('pnpm build.core').stdout.pipe(process.stdout);
  };

  const srcPath = `${rootPath}/docs/content/`;
  const destPath = `${rootPath}/docs/www/assets/content/`;

  const copyDocsContents = file => {
    console.log(chalk.green(`📖 Docs site content [${file}] changed`));

    cpr(
      srcPath,
      destPath,
      {
        overwrite: true, //If the file exists, overwrite it
        confirm: true, //After the copy, stat all the copied files to make sure they are there
      },
      function(err, files) {
        //err - The error if any (err.list might be available with an array of errors for more detailed information)
        if (err) {
          console.log(err);
        }
      },
    );
  };

  const watch = {
    [`${rootPath}/docs/content/**/*`]: copyDocsContents,
    [`${rootPath}/packages/core/src/**/*`]: rebuildCoreComps,
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
