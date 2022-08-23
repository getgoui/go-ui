import minimist from 'minimist';
import watch from './watch';
import help from './help';

const commands = { watch, help };

export async function main(argsArray) {
  const args = minimist(argsArray.slice(2));
  let cmd = args._[0] || 'help';
  if (args.help || args.h) {
    cmd = 'help';
  }

  if (commands[cmd]) {
    await commands[cmd](args);
  }
}
