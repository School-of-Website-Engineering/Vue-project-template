//引入mock模块
import Mock from "mockjs";

//引入json数据
//webpack默认对外暴露的:图片、JSON数据格式
import banner from "./banner.json";
import floor from "./floor.json";
import floorBanner from "./floorBanner.json";
import goodsList from "./goodsList.json";

Mock.mock("/mock/banner", { code: 200, data: banner }); //模拟首页大的轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor });
Mock.mock("/mock/floorBanner", { code: 200, data: floorBanner }); //模拟floor模块轮播图数据
Mock.mock("/mock/goodsList", { code: 200, data: goodsList }); //模拟热门商品数据
