import store from '@/store'
import { snackBarModel } from './snackbar.model';
export const openSnack = (Title: string, Msg: string , ClassName : string) => {
  if (ClassName == null ){
    ClassName = Title
  }
  store.commit("ui/stopSnack")
  let snack: snackBarModel = {
    Active: true,
    Title,
    ClassName,
    Msg
  }
  store.commit("ui/setSnack" , snack)
}

export const closeSnack = () => {
  store.commit("ui/stopSnack")
}