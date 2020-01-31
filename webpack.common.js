const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const KssWebpackPlugin = require('kss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const KssConfig = {
	title: 'Sapphire StyleGuide',
	source: path.resolve(__dirname, './src/components'),
	destination: path.resolve(__dirname, 'dist/styleguide'),
	css: '../dev.styles.css',
	extend: path.resolve(__dirname, './src/helpersHandleBar'),
};

const outputPath = path.join(__dirname, 'dist');

module.exports = {
	entry: path.resolve(__dirname, './src/components/index.js'),
	output: {
		path: outputPath,
		publicPath: '/dist/',
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [`${outputPath}/*.hot-update.*`],
    	dry: false,
    	dangerouslyAllowCleanPatternsOutsideProject: true
		}),
		new KssWebpackPlugin(KssConfig)],
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
			{
			  test: /\.(woff|woff2|eot|ttf|otf)$/,
			  use: [
			    'file-loader',
			  ],
			},
		],
	}
};
