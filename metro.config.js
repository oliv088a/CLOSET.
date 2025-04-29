const { getDefaultConfig } = require('@expo/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('expo/metro-config').MetroConfig}
 */

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    minifierPath: require.resolve('metro-minify-terser'),
    minifierConfig: {
      ecma: 8,
      keep_classnames: true,
      keep_fnames: true,
      module: true,
    },
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'mjs', 'cjs', 'jsx', 'tsx', 'ts'],
    extraNodeModules: {
      '@env': `${__dirname}/node_modules/react-native-dotenv`,
    },
    nodeModulesPaths: [
      `${__dirname}/node_modules`,
    ],
  };

  config.watchFolders = [
    `${__dirname}/node_modules`,
  ];

  return config;
})();
