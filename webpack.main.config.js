const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const env = process.env.NODE_ENV || 'production';

const baseConfig = {
  mode: 'development',
  target: 'electron-main',
  entry: {
    main: './src/main/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    })
  ]
};

const developmentConfig = {
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/main/**/*']
    }),
    new webpack.NamedModulesPlugin()
  ],
};

const productionConfig = {};

module.exports = merge.smart(
  baseConfig,
  env === 'production' ? productionConfig : developmentConfig
);
