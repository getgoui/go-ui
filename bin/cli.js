import minimist from 'minimist';
import generate from './gen-component';
// import pattern from './gen-pattern';
import dev from './dev';
import help from './help';

const commands = {
  generate,
  // pattern,
  dev,
  help,
};

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
