const { override, babelInclude, a } = require('customize-cra')
const path = require('path')

module.exports = override(
  babelInclude([
    path.resolve('src'),        // make sure you link your own source
    path.resolve('../packages/types'),  // your shared module to transpile
  ]),
)