import { GetterTree } from "vuex";
import { UiState } from "./types";
import { RootState } from "../types";
import { snackBarModel } from '@/utils/snack/snackbar.model'

export const getters: GetterTree<UiState, RootState> = {
  loading(state): boolean {
    return state.loading;
  },
  snackBar(state): snackBarModel {
    return state.snackBar;
  },
};
