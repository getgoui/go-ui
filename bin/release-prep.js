/**
 * replace workspace versions before releasing
 * only to be ran in CI
 */
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

function execAsync(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

async function getLatestVersion(packageName) {
  try {
    const { stdout } = await execAsync(`npm view ${packageName}@latest version`);
    const version = stdout.trim();
    return version;
  } catch (error) {
    throw error;
  }
}
const packages = ['core'];

export default async function releasePrep(args) {
  try {
    const latestVer = await getLatestVersion('@go-ui/core');
    console.log({ latestVer });
    packages.map((pkg) => {
      const pkgRoot = path.resolve(__dirname, `../packages/${pkg}`);
      const pkgFile = path.resolve(pkgRoot, 'package.json');
      const content = fs.readFileSync(pkgFile, 'utf8');
      let json = JSON.parse(content);
      // replace version number
      json['version'] = latestVer;
      const newContent = JSON.stringify(json, undefined, 2);
      fs.writeFileSync(pkgFile, newContent);
      console.log(`[${pkgFile}]`);
      console.log(newContent);
    });
  } catch (error) {
    console.error('Error:', error);
    exit(1);
  }
}
