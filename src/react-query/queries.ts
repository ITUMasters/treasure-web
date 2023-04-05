import { axios } from "../react-query";
import { Hint, LocationInfo, Treasure } from "./types";

export const apiLogin = (data: { email: string; password: string }) => {
  return axios({ url: "/user/login", method: "post", data });
};

export const apiGetUser = (userId: number) => {
  return axios({ url: "/user/" + userId.toString(), method: "get" });
};

export const apiCreateLocation = (data: LocationInfo) => {
  return axios({ url: "/locationInfo", method: "post", data });
};

export const apiCreateTreasure = (data: Treasure) => {
  return axios({ url: "/treasure", method: "post", data });
};

export const apiCreateHint = (data: Hint) => {
  return axios({
    url: "/hint",
    method: "post",
    data,
  });
};
