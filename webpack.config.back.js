//конфигурация webpack
const path = require('path')
const baseConfig = require('./webpack.config.base');

//конфигурация для взаимодействия с сервером
const backConfig = {
    ...baseConfig,
    context: path.resolve(__dirname, 'public_html_src'),
    entry: {
        main: './scripts/main.js'
    },
    output: {
        filename: 'scripts/[name].min.js',
        path: path.resolve(__dirname, 'public_html'),
        publicPath: '/'
    }
};

module.exports = backConfig;