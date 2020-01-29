const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/components/index.js'),
	output: {
		filename: 'sapphire.scripts.js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist/',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'sapphire.styles.css',
		}),
	],
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
