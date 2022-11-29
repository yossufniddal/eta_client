import user  from '@/models/user';
import { GetterTree } from "vuex";
import { UserState } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<UserState, RootState> = {
 
  user(state): user {
    return state.user;
  },
};
