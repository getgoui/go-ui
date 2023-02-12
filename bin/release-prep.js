/**
 * replace workspace versions before releasing
 * only to be ran in CI
 */
import fs from 'fs';
import path from 'path';

const dependingPkgs = ['react', 'vue'];

export default async function releasePrep(args) {
  const latestCore = 'latest';
  dependingPkgs.map((pkg) => {
    const pkgRoot = path.resolve(__dirname, `../packages/${pkg}`);
    const pkgFile = path.resolve(pkgRoot, 'package.json');
    const content = fs.readFileSync(pkgFile, 'utf8');
    let json = JSON.parse(content);
    // replace version number
    json['dependencies']['@go-ui/core'] = latestCore;
    fs.writeFileSync(pkgFile, JSON.stringify(json, undefined, 2));
  });
}
