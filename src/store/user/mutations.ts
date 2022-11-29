import  user from '@/models/user';
import { MutationTree } from 'vuex';
import { UserState } from './types';
import { snackBarModel } from '@/utils/snack/snackbar.model'


export const mutations: MutationTree<UserState> = {
    loggedIn(state , user : user){
        state.user = user
    }   
};