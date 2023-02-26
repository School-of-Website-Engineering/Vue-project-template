//对axios进行二次封装
import axios from "axios";
//引入进度条插件
import nprogress from "nprogress";
//引入进度条样式
import "/node_modules/nprogress/nprogress.css";
//在当前模块中引store
import store from "@/store";
export const requests = axios.create({
	timeout: 7000, // 请求超时时间
	baseURL: "/api",
	headers: {"Content-Type": "application/json;charset=UTF-8"}
});

//请求拦截器
requests.interceptors.request.use((config) => {
	if (store.state.detail.uuid_token) {
		//请求头添加一个字段:和后端商量
		config.headers.userTempId = store.state.detail.uuid_token;
	}
	//需要携带token带给服务器
	if (store.state.user.token) {
		config.headers.token = store.state.user.token;
	}
	//进度条开始
	nprogress.start();
	return config;
});

//响应拦截器
requests.interceptors.response.use(
	(res) => {
		//成功的回调函数
		//进度条结束
		nprogress.done();
		return res.data;
	},
	(Error) => {
		//失败的回调函数
		return Promise.reject(new Error("faile"));
	}
);

export default requests;
