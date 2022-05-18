import { GetterTree } from "vuex";
import { UiState } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<UiState, RootState> = {
  loading(state): boolean {
    return state.loading;
  },
};
