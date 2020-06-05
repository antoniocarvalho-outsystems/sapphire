const merge = require('webpack-merge');
const webpack = require('webpack');
const package = require('./package.json');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: 'prod.[name].js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'prod.[name].css',
		}),
		new webpack.BannerPlugin({
			banner: `Generated: ${new Date()} || Version: ${package.version}`,
		}),
	],
});