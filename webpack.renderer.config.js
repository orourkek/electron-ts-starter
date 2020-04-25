const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const env = process.env.NODE_ENV || 'production';
const isProduction = env === 'production';

const CSS_LOADER = {
  loader: 'css-loader',
  options: { sourceMap: !isProduction, importLoaders: 1, },
};
const LESS_LOADER = {
  loader: 'less-loader',
  options: { sourceMap: !isProduction },
};
const SASS_LOADER = {
  loader: 'sass-loader',
  options: { sourceMap: !isProduction },
};
const STYLE_LOADER = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const baseConfig = {
  mode: env,
  target: 'electron-renderer',
  entry: {
    renderer: './src/renderer/index.tsx'
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
    extensions: ['.tsx', '.ts', '.js', '.json', '.css', '.scss']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        }
      },
      {
        test: /\.css?$/,
        loader: [
          STYLE_LOADER,
          CSS_LOADER,
          SASS_LOADER,
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        loader: [
          STYLE_LOADER,
          CSS_LOADER,
          SASS_LOADER,
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html'
    }),
  ]
};

const developmentConfig = {
  output: {
    publicPath: 'http://localhost:2003/',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/renderer/**/*']
    }),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 2003,
    compress: true,
    noInfo: true,
    hot: true,
    historyApiFallback: true,
  },
};

const productionConfig = {};

module.exports = merge.smart(
  baseConfig,
  env === 'production' ? productionConfig : developmentConfig
);
