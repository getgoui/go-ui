import figlet from 'figlet-promised';
import chalk from 'chalk';
import { version } from '../../package.json';

export default async function hello() {
  const msg = `gopress`;

  const data = await figlet(msg);

  console.log(chalk.green(`${data}`));
  console.log(
    chalk.blue(`
v${version} by Go UI team (https://go-ui.com)
  `),
  );
}
