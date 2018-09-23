const path = require('path');

module.exports = {
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
}