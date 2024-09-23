const path = require('path');

module.exports = {
	mode: 'development',
    entry: './client/index.js',
    output: {
        path: path.resolve('./public/dist'),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /.(js|jsx|mjs)$/,
				exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                sideEffects: true,


            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [],
}

