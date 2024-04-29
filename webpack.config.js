const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');  // Import webpack to use the ProvidePlugin

module.exports = {
    mode: 'development',
    entry: './src/renderer/renderer.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // This will apply the loader to all .css files
                use: ['style-loader', 'css-loader'] // The order is important (css-loader first, then style-loader)
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // Add this to make React available automatically without importing it everywhere
        new webpack.ProvidePlugin({
            React: 'react', // This tells webpack to use the react module and assign it to the React variable where it's used
        }),
    ],
    output: {
        filename: 'renderer/renderer.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
