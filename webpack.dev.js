const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new BrowserSyncPlugin({
		files:['./src/components/**/*.scss','./src/components/**/*.hbs','./src/helpersHandleBar/*.js'],
		proxy: 'http://localhost:8080/'
		},
		{
				reload:false
		}
		
)],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		writeToDisk: true
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
	watch: true,
});
