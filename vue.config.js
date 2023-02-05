const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies: true, // 设置依赖文件是否被转译
	publicPath: "/Vue-project-template/",
	lintOnSave: false,
});