const { getLoaders, loaderByName, addAfterLoader } = require("@craco/craco");

module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    pluginOptions,
    context: { env, paths }
  }) => {
    const astroturfLoader = {
      loader: require.resolve("astroturf/loader")
    };
    const astroturfCssLoader = {
      loader: require.resolve("astroturf/css-loader")
    };

    console.log(webpackConfig);

    // const { hasFoundAny, matches } = getLoaders(
    //   webpackConfig,
    //   loaderByName("babel-loader")
    // );

    // if (hasFoundAny) {
    //   matches.forEach(x => {
    //     addAfterLoader(webpackConfig, x, astroturfLoader);
    //   });
    // }
    
    // addAfterLoader(webpackConfig, loaderByName("style-loader"), astroturfCssLoader);

    // addAfterLoader(webpackConfig, loaderByName("babel-loader"), astroturfLoader);

    console.log(webpackConfig);
    return webpackConfig;
  }
};
