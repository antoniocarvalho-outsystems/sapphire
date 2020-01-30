const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: 'dev.scripts.js',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: 'dev.styles.css',
		}),
		new BrowserSyncPlugin(
			{
				files: ['./src/components/**/*.scss', './src/components/**/*.hbs'],
				proxy: 'https://localhost:8080/',
			},
			{
				reload: false,
			}
		),
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		https: true,
		writeToDisk: true,
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					enforce: true,
				},
			},
		},
	},
});
