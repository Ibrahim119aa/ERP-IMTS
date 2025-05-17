import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const allStudentsAtom = atom({
  key: "allStudents",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
