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
// 获取所有场馆
export const getAllVenue = (params) => {
  return http("/auth/venue/all", params, "GET");
};
// 获取所有场馆
export const getDetailsVenue = (id) => {
  return http(`/auth/venue/detail/${id}`, {}, "GET");
};
// 我去过的场馆
export const getVisitedVenue = () => {
  return http(`/auth/venue/frequently_visited`, {}, "GET");
};
// 本月签到记录
export const getSignInDate = () => {
  return http(`/auth/venue/monthly_sign_in`, {}, "GET");
};
// 打卡
export const signIn = (params) => {
  return http(`/auth/venue/sign_in`, params, "POST");
};
