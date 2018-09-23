const path = require('path');

module.exports = {
    entry: './src/public/entry.js',
    output: {
        path: path.resolve(__dirname, "./src/public/"),
        filename: 'bundle.js'
    },
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