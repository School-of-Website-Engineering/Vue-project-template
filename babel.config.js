const prodPlugins =
	process.env.NODE_ENV === "production" ? ["transform-remove-console"] : []; // 判断当前环境是否为生产环境，如果是，则将transform-remove-console加入prodPlugins数组中
module.exports = {
	// 导出配置，使用@vue/cli-plugin-babel/preset作为预设，并将prodPlugins数组中的插件作为插件
	presets: ["@vue/cli-plugin-babel/preset"],
	plugins: [...prodPlugins],
};
