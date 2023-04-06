import { atom } from "recoil";
export const treasureAtom = atom<treasureAtomType>({
  default: {
    name: "",
    regionName: "",
    difficulty: "easy",
    coordinate: {
      name: "My Treasure",
      lat: 0,
      lng: 0,
      regionId: -1,
    },
    hints: [{ hintId: 0, content: "", cost: "" }],
    images: [],
    deletedHints: [],
  },

  key: "treasure.Atom",
});

export type treasureAtomType = {
  name: string;
  regionName: string;
  difficulty: string;
  coordinate: coordinateType;
  hints: hint[];
  images: any[];
  deletedHints: hint[];
};

export type hint = {
  hintId?: number;
  content: string;
  cost: string;
};

export type coordinateType = {
  name: string;
  lat: number;
  lng: number;
  regionId: number;
};
