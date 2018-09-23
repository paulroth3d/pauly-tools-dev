const path = require('path');

let config = {
    entry: path.resolve(__dirname, './src/public/entry.js'),
    output: {
        path: path.resolve(__dirname, "./src/public/"),
        filename: 'bundle.js'
    },
    context: path.resolve(__dirname, "./src/public/"),
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    }
};

//-- make any tweaks between production and development...
const node_env = process.env.NODE_ENV || 'development';
config.mode = node_env;

module.exports = config;