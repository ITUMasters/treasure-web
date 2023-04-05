import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export const IdAtom = atom<number>({
  default: 0,
  key: "Id.Atom",
  effects_UNSTABLE: [persistAtom],
});
