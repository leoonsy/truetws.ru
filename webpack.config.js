//конфигурация webpack
const path = require('path')

//главная конфигурация для верстки
const mainConfig = (env, argv) => {
    let mode = argv.mode || 'development';
    let isDevelopment = mode == 'development';
    let isProduction = !isDevelopment;
    console.log(mode);

    const conf = {
        name: 'main',
        context: path.resolve(__dirname, 'src_wp'),
        entry: {
            main: './scripts/main.js'
        },
        output: {
            filename: 'scripts/[name].min.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
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
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            watchContentBase: true
        },
        devtool: isDevelopment ? 'eval-sourcemap' : false
    }

    return conf;
};

module.exports = [mainConfig];