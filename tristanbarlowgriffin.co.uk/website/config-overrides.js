const { override, babelInclude, addBabelPlugin } = require('customize-cra')
const path = require('path')
const { exit } = require('process')

const workerLoader = {
  test: /\.worker\.ts/,
  include: path.resolve('src'),
  use: ["workerize-loader", "babel-loader"]
}

module.exports = override(
  addBabelPlugin(["@babel/plugin-transform-typescript", { "allowNamespaces": true }]),
  babelInclude([
    path.resolve('src'),        // make sure you link your own source
    path.resolve('../packages/types'),  // your shared module to transpile
  ])
)