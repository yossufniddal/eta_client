import store from '@/store'
import { snackBarModel } from './snackbar.model';
export const openSnack = (Title: string, Msg: string) => {
  store.commit("ui/stopSnack")
  let snack: snackBarModel = {
    Active: true,
    Title,
    Msg
  }
  store.commit("ui/setSnack" , snack)
}

export const closeSnack = (Title: string, Msg: string) => {
  store.commit("ui/stopSnack")
}