const {
  override,
  addBundleVisualizer,
  addBabelPlugins,
  addDecoratorsLegacy,
  disableEsLint,
  addPostcssPlugins
} = require("customize-cra");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = override(
  addDecoratorsLegacy(),
  // disableEsLint(),
  // ...addBabelPlugins("emotion", "react-hot-loader/babel"),
  // process.env.BUNDLE_VISUALIZE === 1 && addBundleVisualizer(),
  // addBundleVisualizer({
  //   "analyzerMode": "static",
  //   "reportFilename": "./build/report.html"
  // })

);
