//общая конфигурация webpack
const path = require('path')
const argv = require('minimist')(process.argv.slice(2));
const mode = argv.mode || 'development';
const config = argv.config || 'main';
const isDevelopment = mode == 'development';
const isProduction = !isDevelopment;
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
    devtool: isDevelopment ? 'eval-sourcemap' : false
};

module.exports = baseConfig;