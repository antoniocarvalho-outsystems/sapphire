const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const KssWebpackPlugin = require('kss-webpack-plugin');

const KssConfig = {
	title:'Sapphire StyleGuide',
	source: path.resolve(__dirname, './src/components'),
	destination:path.resolve(__dirname, 'dist/styleguide'),
	css:'../sapphire.styles.css',
	extend:path.resolve(__dirname, './src/helpersHandleBar' )
	
};

module.exports = {
	entry: path.resolve(__dirname, './src/components/index.js'),
	output: {
		filename: 'sapphire.scripts.js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist/',
	},
	plugins: [
		new CleanWebpackPlugin(),		
		new KssWebpackPlugin(KssConfig),
		new MiniCssExtractPlugin({
			filename: 'sapphire.styles.css',
		})
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
