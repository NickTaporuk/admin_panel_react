'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry : {
        app: path.normalize(`${__dirname}/../../src/index.js`)
    },
    output : {
        path : path.normalize(`${__dirname}/../../src/cdn`),
        filename : "[name].bundle.js"
    },
    module : {
        rules : [
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.otf|\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin("Copyright Nickolay Kuropatkin."),
        new HtmlWebpackPlugin({
            template: path.normalize(`${__dirname}/../../src/layouts/basic/index.html`)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    devServer: {
        compress: true,
        port: process.env.PORT || 9999,
        overlay: {
            warnings: true,
            errors: true
        },
        open: true,
        hot: true,
        historyApiFallback: true,
        openPage: ''

    }
};