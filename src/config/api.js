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
// 获取场馆详情
export const getDetailsVenue = (id) => {
  return http(`/auth/venue/detail/${id}`, {}, "GET");
};
// 获取场馆详情下桌子列表
export const getDetailsTableVenue = (id) => {
  return http(`/auth/venue/tables`, { venue_id: id }, "GET");
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
// 搜索用户
export const searchUser = (params) => {
  return http(`/auth/user/search`, params, "GET");
};
// 添加合作伙伴
export const addPartner = (params) => {
  return http(`/auth/venue/partner/add`, params, "POST");
};
// 删除合作伙伴
export const delPartner = (params) => {
  return http(`/auth/venue/partner/delete`, params, "POST");
};
// 合作伙伴列表
// export const getPartnerList = (params) => {
//   return http(`/auth/venue/partner/all/${params.id}`, params, "GET");
// };
// 日签到记录
export const dailySignIn = (params) => {
  return http(`/auth/venue/daily_sign_in`, params, "GET");
};
// 发布公告
export const publishNotice = (params) => {
  return http(`/auth/venue/notice`, params, "POST");
};
// 删除公告
export const delNotice = (params) => {
  return http(`/auth/venue/notice`, params, "DELETE");
};
// 增加桌子
export const addTable = (params) => {
  return http(`/auth/table/add`, params, "POST");
};
// 删除桌子
export const delTable = (params) => {
  return http(`/auth/table/del`, params, "POST");
};
// 查询时间范围内访问当前场馆的用户列表
export const visitedByDateRange = (params) => {
  return http(`/auth/venue/visited_users_by_date_range`, params, "GET");
};
