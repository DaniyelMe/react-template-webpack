const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// CSS minification
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// Takes care of loading the CSS assets automatically
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',

	devtool: 'inline-source-map',

	devServer: {
		historyApiFallback: true
	},

	plugins: [
		// Minify CSS
		new OptimizeCSSAssetsPlugin(),

		new ExtractCssChunks({
			filename: 'styles/[name].css'
		})
	]
});
