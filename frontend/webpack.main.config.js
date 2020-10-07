//конфигурация webpack
const {
  isProd,
  nodeEnv,
  isDev,
  filename,
  apiURL,
} = require('./webpack.helpers');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');
const baseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');

const plugins = () => {
  const config = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv || 'development'),
      API_URL: JSON.stringify(apiURL),
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: isProd,
      chunks: ['main'],
    }),
    new HTMLWebpackPlugin({
      template: './src/policy.html',
      filename: 'policy.html',
      minify: isProd,
      chunks: ['policy'],
    }),
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ];

  return config;
};

//главная конфигурация (в данном случае для взаимодействия с сервером)
const mainConfig = merge(baseConfig, {
  entry: {
    main: './src/scripts/main.ts',
    policy: './src/scripts/policy.ts',
  },
  output: {
    filename: `scripts/${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: plugins(),
  externals: {
    ym: 'ym',
  },
  devServer: {
    contentBase: './dist',
    watchContentBase: true,
    hot: isDev,
    proxy: {
      '/api': 'http://twsrussia/',
    },
  },
});

module.exports = mainConfig;
