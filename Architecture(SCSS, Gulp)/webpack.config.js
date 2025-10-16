const config = {
	mode: 'production',
	//mode: 'development',
	entry: {
		main: './src/js/main.js',
		// main2: './src/js/main2.js',
	},
	output: {
		filename: '[name].min.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

module.exports = config;
