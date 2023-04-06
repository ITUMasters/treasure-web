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

export const apiGetLocation = (locationId: number) => {
  return axios({
    url: "/locationInfo/" + locationId.toString(),
    method: "get",
  });
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

export const apiGetTreasureByTreasureId = (treasureId: number) => {
  return axios({ url: "/treasure/" + treasureId.toString(), method: "get" });
};

export const apiGetHintByTreasureId = (treasureId: number) => {
  return axios({
    url: "/hint",
    params: { treasureId: treasureId },
    method: "get",
  });
};

export const apiUpdateLocation = (data: LocationInfo) => {
  return axios({
    url: "/locationInfo/" + (data.locationId as number).toString(),
    method: "put",
    data,
  });
};

export const apiUpdateTreasure = (data: Treasure) => {
  return axios({
    url: "/treasure/" + (data.treasureId as number).toString(),
    method: "put",
    data,
  });
};

export const apiUpdateHint = (data: Hint) => {
  return axios({
    url: "/hint/" + (data.id as number).toString(),
    method: "put",
    data,
  });
};
