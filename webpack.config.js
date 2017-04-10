var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, "./src/main.js"), //已多次提及的唯一入口文件
	output: {
		path: path.resolve(__dirname, "/dist"), //打包后的文件存放的地方
		filename: "[name].[hash].js" //打包后输出文件的文件名
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: 'css-loader'
		}]
	}
}