import { MutationTree } from 'vuex';
import { UiState } from './types';

export const mutations: MutationTree<UiState> = {
    appLoaded(state) {
        state.loading = false;
    }
};