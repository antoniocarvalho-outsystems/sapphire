const path = require('path');
const KssWebpackPlugin = require('kss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const KssConfig = {
	title: 'Sapphire StyleGuide',
	source: path.resolve(__dirname, './src/components'),
	destination: path.resolve(__dirname, 'dist/styleguide'),
	css: '../dev.styles.css',
	extend: path.resolve(__dirname, './src/helpersHandleBar'),
};

module.exports = {
	entry: path.resolve(__dirname, './src/components/index.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist/',
	},
	plugins: [new KssWebpackPlugin(KssConfig)],
	node: {
		fs: 'empty',
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
			},
			{
				test: /\.s?[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
};
