var webpack = require('webpack');

module.exports = {
  entry: [
  './app/app.jsx'
],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Main: 'app/components/Main.jsx',
      Capa: 'app/components/Capa.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.json$/, loader: "json-loader"},
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
