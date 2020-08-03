//общая конфигурация webpack
const path = require('path')
const argv = require('minimist')(process.argv.slice(2));
const mode = argv.mode || 'development';
const config = argv.config || 'main';
const isDevelopment = mode == 'development';
const isProduction = !isDevelopment;
const webpack = require('webpack');

console.log(`Режим: ${mode}`);
console.log(`Конфиг: ${config}`);

const baseConfig = {
    mode,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/\/node_modules\//, /.min/],
                loader: 'babel-loader'
            },
        ]
    },
    devtool: isDevelopment ? 'eval-sourcemap' : false,
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/
        })
    ]
};

module.exports = baseConfig;