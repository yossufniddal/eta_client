import { Action } from './../datatableInterface';
import { actions } from './../../../store/ui/actions';
import { convertDate } from "@/utils/helpers";
import Vue from "vue";
import { HeaderInterface } from "./headerInterface"

export default class ActionsHeader implements HeaderInterface {
  text: string = 'actions'
  key: string = ''
  isImage?: boolean = false
  isPrice?: boolean = false
  isTotal?: boolean = false
  actions:Action[]
  total?: number = 0
  public constructor(a:Action[]){
    this.actions = a
 }
  public generateColumnHtml(item : any , key :string){
    let template = `<td>` 
    for (let i = 0; i < this.actions.length; i++) {
      const action = this.actions[i];
      template += ` <button click.prevent="${action.method(item)}" class="${action.color}" >${action.title}</button>`
    }
    template += `</td>`
    return Vue.component('date-td', {
      template
    })
  }
}