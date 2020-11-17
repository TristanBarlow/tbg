const { override, babelInclude, res } = require('customize-cra')
const path = require('path')

const workerLoader = {
  test: /\.worker\.ts$/,
  include: path.resolve('src'),
  use: ["workerize-loader", "babel-loader"]
}

module.exports = override(
  babelInclude([
    path.resolve('src'),        // make sure you link your own source
    path.resolve('../packages/types'),  // your shared module to transpile
  ]),
  (x => {
    console.log(x.module.rules[2].oneOf.slice(1, 0, workerLoader))
    return x
  })
)