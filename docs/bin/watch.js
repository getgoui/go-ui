import chalk from 'chalk';
import chokidar from 'chokidar';
import path from 'path';
import cpr from 'cpr';

/**
 * Watch file changes and run custom commands
 */
export default async function watch(args) {
  console.log(chalk.green('Watching for changes...'));
  const rootPath = path.resolve(__dirname, '../');
  const srcPath = `${rootPath}/content/`;
  const destPath = `${rootPath}/www/assets/content/`;

  const onContentChange = file => {
    console.log(chalk.green(`🎉 ${file} changed`));

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
    [`${rootPath}/content/**/*`]: onContentChange,
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
