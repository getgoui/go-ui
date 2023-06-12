/**
 * replace workspace versions before releasing
 * only to be ran in CI
 */
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const packages = ['react', 'vue'];

export default async function releasePrepWrappers(args) {
  const corePackageFile = path.resolve(__dirname, `../packages/core/package.json`);
  const content = fs.readFileSync(corePackageFile, 'utf8');
  const coreInfo = JSON.parse(content);
  const coreVersion = coreInfo.version;
  try {
    packages.map((pkg) => {
      const pkgRoot = path.resolve(__dirname, `../packages/${pkg}`);
      const pkgFile = path.resolve(pkgRoot, 'package.json');
      const content = fs.readFileSync(pkgFile, 'utf8');
      let json = JSON.parse(content);
      // replace version number
      json['version'] = coreVersion;
      const newContent = JSON.stringify(json, undefined, 2);
      fs.writeFileSync(pkgFile, newContent);
    });
  } catch (error) {
    console.error('Error:', error);
    exit(1);
  }

  exec('git add . && git commit -m "bump versions for wrapper libraries"');
}
