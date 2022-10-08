import hello from './hello';
import chalk from 'chalk';

export default async function help() {
  await hello();
  console.log(
    chalk.greenBright(`
Available commands:
-------------------
build - build the static site.
dev   - start dev server and watch file changes.
help  - show this message.
`),
  );
}
