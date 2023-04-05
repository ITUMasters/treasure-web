import { axios } from "../react-query";

export const apiLogin = (data: { email: string; password: string }) => {
  return axios({ url: "/user/login", method: "post", data });
};

export const apiGetUser = (userId: number) => {
  return axios({ url: "/user/" + userId.toString(), method: "get" });
};
