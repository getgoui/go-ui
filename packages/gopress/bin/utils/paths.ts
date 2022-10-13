import path from 'path';

export function getGoPressDir(dir) {
  return `${dir || process.cwd()}/.gopress`;
}

export function getContentDir(dir) {
  return path.resolve(`${getGoPressDir(dir)}/../content`);
}
