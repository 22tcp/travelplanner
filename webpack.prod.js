const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(scss)$/,
                use: [
                  {
                    //loader: 'style-loader'
                    loader: miniCssExtractPlugin.loader
                  },
                  {
                    loader: 'css-loader'
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: {
                        plugins: () => [
                          require('autoprefixer')
                        ]
                      }
                    }
                  },
                  {
                    loader: 'sass-loader'
                  }
                ]
            }        
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'progressive webapp',
            template: './src/client/views/index.html',
            filename: './index.html',
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
        new miniCssExtractPlugin()
    ]
}
