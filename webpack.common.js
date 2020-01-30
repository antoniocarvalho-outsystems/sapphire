const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const KssWebpackPlugin = require('kss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const KssConfig = {
	title: 'Sapphire StyleGuide',
	css: '../dev.styles.css',
	source: path.resolve(__dirname, './src/components'),
	destination: path.resolve(__dirname, 'dist/styleguide'),
	extend: path.resolve(__dirname, './src/helpersHandleBar'),
};

module.exports = {
	entry: path.resolve(__dirname, './src/components/index.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist/',
	},
	plugins: [new CleanWebpackPlugin(), new KssWebpackPlugin(KssConfig)],
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
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
					},
				},
			},
		],
	},
};
