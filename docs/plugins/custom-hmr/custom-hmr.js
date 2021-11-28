const path = require('path');

module.exports = function customHMR(context, options) {
  // ...
  return {
    name: 'custom-hmr',
    getPathsToWatch() {
      const contentPath = path.resolve(context.siteDir, 'src');
      console.log({ contentPath });
      return [`${contentPath}/**/*`];
    },
  };
};
