//allows relative paths
const path = require('path');
// Inject  CSS, JS files into the template html file
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Style-loader plugin got HMR
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
// Copy files
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		main: [
			'./src/main.js', // Javascript
			'./src/styles/main.less' // Style
		]
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		chunkFilename: 'scripts/[id].js',
		filename: 'scripts/[name].js',
		publicPath: '/'
	},

	plugins: [
		// Inject  CSS, JS files into the template html file
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
		//Copies files which already exist, to the build directory.
		// new CopyWebpackPlugin([{ from: './src/assets' }])
	],

	resolve: {
		// a list of module name aliases
		alias: {
			'react-native$': 'react-native-web'
		},
		// extensions that are used
		extensions: ['.js', '.ts', '.svg']
	},

	module: {
		rules: [
			{
				// Transpiles new js features into old standard
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.less$/,
				use: [
					ExtractCssChunks.loader, //(3) // Inject CSS to Html
					'css-loader', //(2) // Translates CSS into CommonJS modules
					'less-loader' //(1) Compiles Less to CSS
				]
			},
			{
				test: /\.jsx?$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								{
									plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]]
								}
							]
						}
					}
				]
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			}
		]
	}
};
