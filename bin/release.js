#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RELEASE_COMMAND = 'pnpm run release';

function getLatestVersion(packageName) {
  console.log(`> Getting latest version number from npm`);
  try {
    const output = execSync(`npm view ${packageName}@latest version`);
    const version = output.toString().trim();
    return version;
  } catch (error) {
    console.error(`❎ Cannot get latest version for ${packageName}`);
    throw error;
  }
}

function syncCurrentCoreVersion() {
  console.log(`0️⃣STEP 0. Sync current core version in case it's not the latest`);
  try {
    const latestVer = getLatestVersion('@go-ui/core');
    // get package json from core
    const pkgFile = path.resolve(__dirname, '../packages/core/package.json');
    const content = fs.readFileSync(pkgFile, 'utf8');
    let json = JSON.parse(content);
    if (json.version === latestVer) {
      console.log('✅ package.json in core is already up to date.');
      return;
    }
    // replace version number
    json['version'] = latestVer;
    const newContent = JSON.stringify(json, undefined, 2);
    fs.writeFileSync(pkgFile, newContent);
    console.log(`✅ package.json in core has been updated to ${latestVer}.`);
  } catch (error) {
    console.error('❎ Error:', error);
    process.exit(1);
  }
}

/**
 * Run release script in packages/core/package.json
 */
function releaseCore() {
  console.log(`1️⃣ STEP 1. Release core`);
  try {
    // set working directory to ./packages/core
    const cwd = path.resolve(__dirname, '../packages/core');
    execSync(RELEASE_COMMAND, { cwd, stdio: 'inherit' });
    console.log('✅ Core package has been released.');
  } catch (error) {
    console.error('❎ Error:', error);
    process.exit(1);
  }
}

/**
 * make sure react and vue packages use the same version number as core
 * run `pnpm run gg release-prep-wrappers` in root
 */
function syncVersionToWrappers() {
  console.log(`2️⃣ STEP 2. Sync version to wrappers`);
  try {
    execSync('pnpm run gg release-prep-wrappers', { stdio: 'inherit' });
    console.log('✅ React and Vue packages have been synced.');
    console.log('✅ <demo-frame> version has been synced.');
  } catch (error) {
    console.error('❎ Error:', error);
    process.exit(1);
  }
}

/**
 * Run release script in packages/react/package.json and packages/vue/package.json
 */
function releaseWrappers() {
  const associatedPkgs = ['react', 'vue', 'demo-frame'];
  console.log(`3️⃣ STEP 3. Release associated packages, ${associatedPkgs.join(', ')}`);
  try {
    for (let i = 0; i < associatedPkgs.length; i++) {
      const lib = associatedPkgs[i];
      const cwd = path.resolve(__dirname, `../packages/${lib}`);
      execSync(RELEASE_COMMAND, { cwd, stdio: 'inherit' });
      console.log(`✅ ${lib} package have been released.`);
    }
  } catch (error) {
    console.error('❎ Error:', error);
    process.exit(1);
  }
}

function main() {
  syncCurrentCoreVersion();
  releaseCore();
  syncVersionToWrappers();
  releaseWrappers();
}

main();
