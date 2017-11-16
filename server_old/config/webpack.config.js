console.log(__dirname + '/../src');

module.exports = {
  entry: [
    __dirname + '/../serve.js'
  ],
  output: {
    path: __dirname + '/../build',
    filename: 'server.js'
  },
  /*
  resolve: {
    modules: ['node_modules', paths.nodeModules].concat(
      // This enable use paths in src like 'components/Application'
      // and also if components are in node_modules, it will prefer
      // components from node_modules
      paths.src.application.split(path.delimiter).filter(Boolean)
    ),
    /* alias: {
      // These alias are for mock window and document
      window: paths.mock.window,
      document: paths.mock.document
    }, */
   /* extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
},*/
  module: {
    strictExportPresence: true,
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        /*include: [
          __dirname + '/../src', // server src
          __dirname + '/../../src' //apollo src
        ],*/
        loader: require.resolve('babel-loader'),
        query: {
          /*plugins: ['transform-class-properties',
            [require('babel-plugin-transform-imports'), {
              /* lodash: {
                transform: (name) => {
                  return 'lodash/' + name;
                },
                preventFullImport: false
              }, */
              /*antd: {
                transform: (name) => {
                  return 'antd/lib/' + name.toLowerCase();
                },
                preventFullImport: true,
                camelCase: true,
                kebabCase: true
              },
              components: {
                transform: (name) => {
                  return 'components/src/components/' + name;
                },
                preventFullImport: true
              }*/
          /*  }]],*/
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  target: 'node',
  // externals: [nodeExternals()], // This will prevent for packing external libs into build
  node: {
    fs: 'empty',
    net: 'empty',
    __dirname: true
  },
  plugins: [
    // This will minificate build
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),*/
    // This is for moment lib
    //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //new webpack.DefinePlugin(envStringified)
    // This allows us inject mock window and document
    /* new webpack.ProvidePlugin({
      window: 'window',
      document: 'document'
    }) */
  ]
};

