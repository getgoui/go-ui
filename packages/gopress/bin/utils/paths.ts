import path from 'path';

export function getContentDir(dir) {
  const rootPath = `${dir || process.cwd()}/.gopress`;
  return path.resolve(`${rootPath}/../content`);
}
