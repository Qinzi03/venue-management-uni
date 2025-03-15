import { http } from "./http.js";
// 登录
export const login = (params) => {
  return http("/login", params, "POST");
};
// 我的场馆
export const myVenue = (params) => {
  return http("/auth/venue/my", params, "GET");
};
// 保存场馆
export const saveVenue = (params) => {
  return http("/auth/venue/save", params, "POST");
};
