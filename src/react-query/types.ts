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
  regionId: number;
  altitude: number;
  longitude: number;
  latitude: number;
};

export type Treasure = {
  locationId: number;
  timeLimit?: number;
  hardness: Hardness;
  name: string;
  ownerId: number;
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
  treasureId: number;
  content: string;
  isDefault: boolean;
  cost: number;
};

export type Hardness = "easy" | "medium" | "hard" | "insane";
