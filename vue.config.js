const { defineConfig } = require("@vue/cli-service");
// 使用 moment-locales-webpack-plugin 插件，剔除掉无用的语言包
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HappyPack = require("happypack");
const os = require("os");
// 开辟一个线程池，拿到系统CPU的核数，happypack 将编译工作利用所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = defineConfig({
	transpileDependencies: true, // 设置依赖文件是否被转译
	publicPath           : "/Vue-project-template/",
	lintOnSave           : false,
	configureWebpack     : {
		plugins: [
			new MomentLocalesPlugin({ localesToKeep: ["zh-cn"] }),
			new CompressionPlugin({
				test                : /\.(js|css)(\?.*)?$/i, //需要压缩的文件正则
				threshold           : 1024, //文件大小大于这个值时启用压缩
				deleteOriginalAssets: false //压缩后保留原文件
			}),
			new HappyPack({
				id        : "happybabel",
				loaders   : ["babel-loader"],
				threadPool: happyThreadPool
			})
		]
	},
	// 代理服务器
	devServer: {
		proxy: {
			"/api": {
				target      : "http://localhost:3000",
				changeOrigin: true,
				pathRewrite : {"^/api": ""},
				changeOrigin: true
			}
		}
	}
});
