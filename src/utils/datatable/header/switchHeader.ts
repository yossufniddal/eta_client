import i18n from '@/i18n';
import Vue from "vue";
import { HeaderInterface } from "./headerInterface"

export default class SwitchHeader implements HeaderInterface {
  text: string;
  key: string;
  isImage?: boolean = false;
  isPrice?: boolean = false;
  total?: number = 0;
  public constructor(text:string , key:string = '' ){
    this.text = i18n.t(text).toString()
    this.key = key  == '' ? text : key
 }
 public generateColumnHtml(item : any){
  let value = item[this.key]
    return Vue.component('switch-td', {
      template: `<td class="switch-td"><span>${i18n.t(`${item[this.key]}`).toString()}</span></td>`
    })
  }
}