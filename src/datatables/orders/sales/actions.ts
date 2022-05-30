import { ConvertToEInvoice } from './../../../repositories/order';
import  i18n  from '@/i18n';
import router from '@/router';
import { Action } from '@/utils/datatable/datatableInterface';
import Vue from "vue";
import { HeaderInterface } from "@/utils/datatable/header/headerInterface"

export default class SalesActions implements HeaderInterface {
  text: string = 'actions'
  key: string = ''
  isImage?: boolean = false
  isPrice?: boolean = false
  isTotal?: boolean = false
  actions:Action[] 
  total?: number = 0
  
  public constructor(a:Action[]){
    this.actions = [
      {
        title : "convert",
        color : "red",
        icon : "mdi-keyboard-return",
        method :this._convert
       
      }
    ]
 }



  private _convert = (item:any) => {
    ConvertToEInvoice(item.serial).then((res) => {
      console.log(res)
    })
  }
  public generateColumnHtml(item : any , key :string){
    console.log(item.etaConverted)
   if(!item.etaConverted){
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
    return Vue.component('date-td', {
      template : `<td>${i18n.t('no_action')}</td>`
    })
  }
}