import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

//全局样式表
import "./assets/scss/global.scss";
//引入MockServer.js----mock数据
import "@/mock/mockServe";
//引入Toast插件
import Toast from "@/components/Toast";
// eslint-disable-next-line vue/multi-word-component-names
Vue.component("Toast", Toast);

new Vue({
	//全局事件总线$bus配置
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
	store,
	router,
	render: (h) => h(App)
}).$mount("#app");
