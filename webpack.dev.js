const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: 'dev.[name].js',
	},
	watch: false,
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: 'dev.[name].css',
		}),
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		https: true,
		watchContentBase: true,
		writeToDisk: true,
		disableHostCheck: true,
		hot: false,
		inline: false,
		liveReload: false,
		port: 3000,
	},
});
