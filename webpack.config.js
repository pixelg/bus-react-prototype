const path = require("path");
const webpack = require("webpack");
const bundlePath = path.resolve(__dirname, "dist/");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.js",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { 
                    presets: [
                        'env', 
                        "react"
                    ],
                    plugins: [
                        "transform-object-rest-spread",
                        "transform-class-properties"
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
         ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        publicPath: bundlePath,
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        publicPath: "http://localhost:3000/dist"
    },
    plugins: [ 
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv()
    ]
};