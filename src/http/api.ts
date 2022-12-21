import http from './request';
// 注册
export const registerApi = (params: any) => http.post("/register", params);
// 登录
export const loginApi = (params: any) => http.post("/login", params);
// 添加文章
export const addArticle = (params: any) => http.post("/article/add", params);
// 文章列表
export const articlelist = (params: any) => http.get("/article", { params });
// 修改文章
export const updateArticle = (params: any) => http.put("/article/update", params);
// 删除文章列表
export const deleteArticleApi = (params: any) =>
    http.post("/article/remove", params);