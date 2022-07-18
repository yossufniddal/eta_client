import { MutationTree } from 'vuex';
import { UiState } from './types';
import { snackBarModel } from '@/utils/snack/snackbar.model'


export const mutations: MutationTree<UiState> = {
    appLoaded(state) {
        state.loading = false;
    },
    setSnack: (state, val : snackBarModel) =>  {
        state.snackBar = val
    },
    stopSnack: state => {
        state.snackBar.Active = false
    }
};