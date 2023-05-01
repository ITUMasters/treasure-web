export type User = {
  id?: number;
  username: string;
  email: string;
  photo_link: string | null;
  name: string;
  surname: string;
  password: string;
  coin: number;
};

export type LocationInfo = {
  locationId?: number;
  regionId: number;
  altitude: number;
  longitude: number;
  latitude: number;
};

export type Treasure = {
  id?: number;
  treasureId?: number;
  locationId?: number;
  timeLimit?: number;
  gift?: number;
  hardness: Hardness;
  name: string;
  ownerId?: number;
  location?: {
    locationId: number;
    region: Region;
  };
};

export type Region = {
  id: number;
  name: string;
};

export type Hint = {
  id?: number;
  treasureId?: number;
  content: string;
  isDefault: boolean;
  cost: number;
};

export type Hardness = "easy" | "medium" | "hard" | "insane";

export type GeneralRegion = {
  id?: number;
  name: string;
  centerId?: number;
  zoomLevel: number;
  center: SimpleCoord;
  paths: SimpleCoord[];
};

export type SimpleCoord = {
  id?: number;
  latitude: number;
  longitude: number;
  regionId?: number;
};
