import minimist from 'minimist';
import generate from './generate';
import help from './help';

const commands = {
  generate,
  help,
}

export async function main(argsArray: string[]): Promise<void> {
  const args = minimist(argsArray.slice(2);
  let cmd = args._[0] || 'help';
  if(args.help || args.h) {
    cmd = 'help';
  }

  if(commands[cmd]) {
    await commands[cmd](args);
  }

}
