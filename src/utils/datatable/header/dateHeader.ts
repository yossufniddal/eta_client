import { convertDate } from '@/utils/helpers';
import Vue from "vue";
import { HeaderInterface } from "./headerInterface"
import i18n from '@/i18n';

export default class DateHeader implements HeaderInterface {
  text: string;
  key: string;
  isImage?: boolean = false;
  isPrice?: boolean = false;
  total?: number = 0;
  public constructor(text:string , key:string = '' ){
    this.text =  i18n.t(text).toString()
    this.key = key  == '' ? text : key
 }
 public generateColumnHtml(item : any){
  let value = item[this.key]
    return Vue.component('date-td', {
      template: `<td>${convertDate(value)}</td>`
    })
  }
}