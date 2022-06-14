import { ActionsParamInterface } from './actionsInterface';
import { Action } from '@/utils/datatable/datatableInterface';
import i18n from '@/i18n';
import Vue from 'vue';
import { Delete } from "@/repositories/global"
import router from "@/router"

import ActionsComponent  from '@/utils/datatable/components/actions.vue';
export default class ActionsHeader{ 
  table:string
  text: string = i18n.t('actions').toString()
  key: string = ''
  isImage?: boolean = false
  total?: number = 0
  actions: Action[] = []
  item : any

  public constructor(tale:string , actions:ActionsParamInterface){
    this.table = tale
    if (actions.edit) this.actions.push(this._editAction())
    if (actions.view) this.actions.push(this._viewAction())
    if (actions.delete) this.actions.push(this._deleteAction())
  }
  
  private _editAction :() => Action = () => {
    let action : Action = {
      title : 'edit',
      icon : 'mdi-file-edit-outline',
      method : this.edit,
    }
    return action
  }

  private _viewAction :() => Action = () => {
    let action : Action = {
      title : 'view',
      icon : 'mdi-eye-outline',
      method : this.edit,
    }
    return action
  }
  private _deleteAction :() => Action = () => {
    let action : Action = {
      title : 'delete',
      icon : 'mdi-delete-outline',
      method : this.edit,
    }
    return action
  }

  public delete = (item : any) => {
    Delete({actions : this.table ,id : item.Id}).then((res:any) => {
      console.log(res)
    })
  }

  public edit = (item : any) => {
    router.push({name : `${router.currentRoute.name}-edit` , params:{id : item.Id}})
  }

  public view = (item : any) => {
    router.push({name : `${router.currentRoute.name}-view` , params:{id : item.Id}})
  }
  public  generateColumnHtml(item : any) {
    let c  = Vue.extend(ActionsComponent)
    return c
  }
}