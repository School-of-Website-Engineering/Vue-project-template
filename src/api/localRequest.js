//对axios进行二次封装
import axios from "axios";
//引入进度条插件
import nprogress from "nprogress";
//引入进度条样式
import "/node_modules/nprogress/nprogress.css";

// const requests = axios.request({
//     //配置对象
//     baseUrl: "/api",
//     timeout: 5000,
// });
//使用create方法创建axios实例
export const requests = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: "/ipa",
  headers: { "Content-Type": "application/json;charset=UTF-8" },
});

//请求拦截器
requests.interceptors.request.use((config) => {
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
  },
);

export default requests;
