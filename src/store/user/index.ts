import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { UserState } from './types';
import { RootState } from '../types';

export const state: UserState = {
    user : {
        emp_code : -1,
        emp_name : "",
        sec_level : 0,
        store_code:0,
        emp_password:""
    }
};


const namespaced: boolean = true;

export const user: Module<UserState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
