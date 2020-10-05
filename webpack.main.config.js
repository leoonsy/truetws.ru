//конфигурация webpack
const { isProd, isDev, filename } = require('./webpack.helpers');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');
const baseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');

const plugins = () => {
  const config = [
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
    main: './src/scripts/main.js',
    policy: './src/scripts/policy.js',
  },
  output: {
    filename: `scripts/${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: plugins(),
  externals: {
    ym: {
      root: 'ym',
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    hot: isDev,
  },
});

module.exports = mainConfig;
