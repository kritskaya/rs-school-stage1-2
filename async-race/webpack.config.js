const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const CopyPlugin = require("copy-webpack-plugin");

module.exports = ( {mode} ) => {
	return {	
		entry: path.resolve(__dirname, './src/index.ts'),
		devtool: 'inline-source-map',
		mode: mode === 'prod' ? 'production' : 'development',
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								url: false, 
							}
						}
					],
				},
				{
					test: /\.ts$/i,
					use: 'ts-loader',
					include: [path.resolve(__dirname, 'src')]
				}
			],
		},
		resolve: {
			extensions: ['.ts', '.js'],
		},
		output: {
			filename: 'index.js',
			path: path.resolve(__dirname, './dist'),
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
					template: path.resolve(__dirname, './src/index.html'),
				}
			),
			new CopyPlugin({
            patterns: [
              { from: "./src/assets", to: "./assets" },
            ],
        	}), 
		],
	}
};