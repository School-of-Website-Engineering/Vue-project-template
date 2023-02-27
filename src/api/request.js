// 1.引入axios，nprogress，toast组件
import axios from "axios";
import NProgress from "nprogress";
import Toast from "@/components/Toast";

// 2.定义 axios 实例
const apiAxios = axios.create({
	timeout          : 15000,
	headers          : { "Content-Type": "application/json;charset=UTF-8" },
	responseType     : "json",
	// q:为什么这里的baseURL要加上/api？因为在vue.config.js中设置了代理服务器，所以这里的baseURL要加上/api
	baseURL          : "/api",
	transformResponse: [
		function(data) {
			try {
				data = JSON.parse(data);
			}
			catch (e) {
				console.log(e);
			}
			return data;
		}
	]
});

// 3.添加请求拦截器
apiAxios.interceptors.request.use(
	(config) => {
		NProgress.start();
		return config;
	},
	(error) => {
		NProgress.done();
		return Promise.reject(error);
	}
);

// 4.添加响应拦截器
apiAxios.interceptors.response.use(
	(response) => {
		NProgress.done();
		return response;
	},
	(error) => {
		// 对响应的常见错误码提示进行封装,使用策略模式优化
		const errorHandle = {
			400: "请求错误",
			401: "未授权，请登录",
			403: "拒绝访问",
			404: `请求地址出错: ${error.response.config.url}`,
			408: "请求超时",
			500: "服务器内部错误",
			501: "服务未实现",
			502: "网关错误",
			503: "服务不可用",
			504: "网关超时",
			505: "HTTP版本不受支持"
		};
		error.message = errorHandle[error.response.status] || "未知错误";

		NProgress.done();
		// q:在这里使用Toast组件，为什么会报错？
		// a:因为Toast组件是在main.js中注册的，而这里是在request.js中使用的，所以会报错
		// 解决办法：将Toast组件封装成一个插件，然后在main.js中注册插件
		Toast.methods.show("error", `${error.message}`);
		return Promise.reject(error);
	}
);
// 5.导出axios实例
export default apiAxios;
