import { http } from "./http.js";
// 登录
export const login = (params) => {
  return http("/login", params, "POST");
};
// 保存场馆
export const saveVenue = (params) => {
  return http("/auth/venue/save", params, "POST");
};
