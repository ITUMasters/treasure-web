import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { treasureAtom, treasureAtomType } from "./treasureStore";
export const useTreasure = (): treasureAtomType => {
  return useRecoilValue(treasureAtom);
};
export const useSetTreasure = (): SetterOrUpdater<treasureAtomType> => {
  return useSetRecoilState(treasureAtom);
};
