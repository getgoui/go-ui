module.exports = {
  preset: 'jest-puppeteer',
  testPathIgnorePatterns: ['/node_modules/', 'dist'], //
  testMatch: ['<rootDir>/src/patterns/**/*.e2e.ts'],
  globals: {
    TESTURL: 'http://localhost:3333/',
  },
};
