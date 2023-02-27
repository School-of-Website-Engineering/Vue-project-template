//api统一管理
import request from "./request";
//引入mock
import mockRequest from "./mockRequest";

export const getData = () => request.get("/getData", { params: { id: 1 } });
export const postData = () => request.post("/postData", { params: { id: 1 } });