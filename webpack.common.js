<<<<<<< HEAD
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
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader'],
			},
		],
	},
};
=======
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
			dangerouslyAllowCleanPatternsOutsideProject: true,
		}),
		new KssWebpackPlugin(KssConfig),
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
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							prependData: () => {
								const path =
									process.env.NODE_ENV === 'production'
										? '/Sapphirev2_Th/fonts/'
										: 'https://atc-dev.outsystemsenterprise.com/Sapphirev2_Th/fonts/';

								return `$font-url: '${path}';`;
							},
						},
					},
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
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader'],
			},
		],
	},
};
>>>>>>> 02d169136102b96d6986d077caadcc56488520f5
