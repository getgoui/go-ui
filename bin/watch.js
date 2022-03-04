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
  const onComponentChange = (file) => {
    console.log(chalk.green(`- ${file} changed, [trying to see if stencil build watch will pick this up]`));
    // console.log(chalk.green(`- ${file} changed`));
    // console.log(chalk.green(`- Updating readme.md file`));
    // // run stencil build --docs-readme command
    // // @optimisation - find a way to only run doc generation
    // exec('npx stencil build --docs-readme', (err, stdout, stderr) => {
    //   console.log(stdout);
    //   if (err) {
    //     console.error(chalk.red(`exec error: ${err}`));
    //     return;
    //   }
    //   console.log(chalk.green(`- [Result] readme file updated.`));
    // });
  };
  const watch = {
    [`${rootPath}/src/global/**/*.scss`]: onGlobalStyleChange,
    [`${rootPath}/src/components/**/*.tsx`]: onComponentChange,
    [`${rootPath}/src/patterns/**/*.tsx`]: onComponentChange,
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
