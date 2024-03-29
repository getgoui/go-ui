import minimist from 'minimist';
import component from './gen-component';
import pattern from './gen-pattern';
import dev from './dev';
import help from './help';
import releasePrep from './release-prep';
import releasePrepWrappers from './release-prep-wappers';

const commands = {
  component,
  pattern,
  dev,
  help,
  'release-prep': releasePrep,
  'release-prep-wrappers': releasePrepWrappers,
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
