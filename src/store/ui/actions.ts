import { ActionTree } from "vuex";
// import axios from 'axios';
import { UiState } from "./types";
import { RootState } from "../types";

export const actions: ActionTree<UiState, RootState> = {
  fetchData(): any {
    console.log("asdasd");
  },
};
