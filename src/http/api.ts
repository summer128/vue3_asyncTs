import http from './request';
// 注册
export const registerApi = (params: any) => http.post("/users/register", params);
// 登录
export const loginApi = (params: any) => http.post("/users/login", params);
// 添加文章
export const addArticle = (params: any) => http.post("/article/add", params);
// 文章列表
export const articlelist = (params: any) => http.get("/article", { params });
// 修改文章
export const updateArticle = (params: any) => http.put("/article/update", params);
// 删除文章列表
export const deleteArticleApi = (params: any) => http.post("/article/remove", params);

// 获取菜单
export const getMenus = () => http.get('/menus/getMenus', { })
// author 获取权限菜单
export const getRoleMenus = (params: any) => http.post('/roles/roleMenusMatch', params)