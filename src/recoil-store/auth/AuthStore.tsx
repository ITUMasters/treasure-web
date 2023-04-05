import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
export const AuthAtom = atom<boolean>({
  default: false,
  key: "Auth.Atom",
  effects_UNSTABLE: [persistAtom],
});
