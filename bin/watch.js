import chalk from 'chalk';
import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
/**
 * Watch file changes and run custom commands
 */
export default async function watch(args) {
  console.log(chalk.green('Watching for changes...'));
  const rootPath = path.resolve(__dirname, '../');
  const onGlobalStyleChange = (file) => {
    console.log(chalk.green(`- ${file} changed`));
    const saveTarget = path.resolve(rootPath, 'src/global/styles.scss');
    const data = fs.readFileSync(saveTarget, 'utf8');
    fs.writeFileSync(saveTarget, data);
  };
  const watch = {
    [`${rootPath}/src/global/**/*.scss`]: onGlobalStyleChange,
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
  process.on('SIGINT', function () {
    watchers.forEach((watcher) => watcher.close());
    console.log(chalk.green(`- Stopped watching.`));
  });
}
