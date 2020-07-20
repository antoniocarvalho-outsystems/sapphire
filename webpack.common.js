const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputPath = path.join(__dirname, 'dist');
const isProduction = process.env.NODE_ENV === 'production ';

module.exports = {
	entry: {
		app: path.resolve(__dirname, './src/app.js'),
		styleguide: path.resolve(__dirname, './src/styleguide/scripts.js'),
		backoffice: path.resolve(__dirname, './src/backoffice/scripts.js'),
	},
	output: {
		path: outputPath,
		publicPath: '/dist/',
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [`${outputPath}/*.hot-update.*`],
			dangerouslyAllowCleanPatternsOutsideProject: true,
			dry: false,
		}),
		new webpack.BannerPlugin({
			banner: `[filebase] || Version: ${package.version} || Generated: ${new Date()}`,
		}),
	],
	node: {
		fs: 'empty',
	},
	module: {
		rules: [{
				test: /\.js?$/,
				exclude: /node_modules/,
			},
			{
				test: /\.s?[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: !isProduction,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: !isProduction,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !isProduction,
							// prependData: () => {
							// 	const path =
							// 		isProduction
							// 			? '/Sapphirev2_Th/fonts/Lato-Regular.ttf'
							// 			: 'https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i,900,900i&display=swap';
							// 	return `$font-url: '${path}';`;
							// },
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