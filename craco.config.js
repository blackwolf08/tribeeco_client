const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const reactHotReloadPlugin = require("craco-plugin-react-hot-reload");
// const babelLoader = require("craco-babel-loader");
const { addAfterLoader, loaderByName } = require("@craco/craco");


module.exports = {
  webpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
      new WebpackBar({ profile: true })
    ]
  },
  babel:  {
    plugins: [
      "emotion"
    ]
  },
  plugins: [
    {
      plugin: reactHotReloadPlugin
    },
    // {
    //   plugin: babelLoader,
    //   options: {
    //     excludes: [/(node_modules|bower_components)/]
    //   }
    // },
  ]
};
