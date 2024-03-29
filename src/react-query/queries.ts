import { axios } from "../react-query";
import { GeneralRegion, Hint, LocationInfo, Treasure } from "./types";

export const apiLogin = (data: { email: string; password: string }) => {
  return axios({ url: "/user/login/admin", method: "post", data });
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

export const apiDeleteHint = (hintId: number) => {
  return axios({
    url: "/hint/" + hintId.toString(),
    method: "delete",
  });
};

export const apiGetTreasureByOwnerId = (ownerId: number) => {
  return axios({
    url: "/treasure",
    method: "get",
    params: { ownerId: ownerId },
  });
};

export const apiCreateRegion = (data: GeneralRegion) => {
  return axios({
    url: "/region",
    method: "post",
    data,
  });
};

export const apiGetAllRegions = () => {
  return axios({
    url: "/region",
    method: "get",
  });
};

export const apiUploadImage = (formData: FormData) => {
  return axios({
    url: "/image/upload",
    data: formData,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiGetLeaderboardByTreasureId = (treasureId: number) => {
  return axios({
    url: "/treasure/" + treasureId.toString() + "/leaderboard",
    method: "get",
  });
};

export const apiDownloadImage = (imageName: string) => {
  return axios({
    url: "/image/download/" + imageName,
    method: "get",
    responseType: "blob",
  });
};
