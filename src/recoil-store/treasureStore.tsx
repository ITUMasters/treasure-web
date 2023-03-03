import { atom } from "recoil";
export const treasureAtom = atom<treasureAtomType>({
  default: {
    name: "",
    regionName: "",
    difficulty: "easy",
    coordinate: {
      lat: 0,
      lng: 0,
    },
    hint1: "",
    hint2: "",
    hint3: "",
    images: [],
  },

  key: "treasure.Atom",
});

export type treasureAtomType = {
  name: string;
  regionName: string;
  difficulty: string;
  coordinate: coordinateType;
  hint1: string;
  hint2: string;
  hint3: string;
  images: any[];
};

type coordinateType = {
  lat: number;
  lng: number;
};
