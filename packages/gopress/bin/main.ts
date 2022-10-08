import minimist from 'minimist';
import dev from './cmds/dev';
import build from './cmds/build';
import hello from './cmds/hello';
import help from './cmds/help';

const commands = {
  dev,
  build,
  hello,
  help,
};

export async function main(argsArray) {
  const args = minimist(argsArray.slice(2));
  let cmd = args._[0] || 'help';
  if (!Object.keys(commands).includes(cmd)) {
    cmd = 'help';
  }
  if (args.help || args.h) {
    cmd = 'help';
  }
  if (args.version || args.v) {
    cmd = 'hello';
  }
  if (commands[cmd]) {
    await commands[cmd](args);
  }
}
