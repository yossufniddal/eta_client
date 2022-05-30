import { currency } from "@/utils/helpers";
import Vue from "vue";
import { HeaderInterface } from "./headerInterface"

export default class TextHeader implements HeaderInterface{ 
    text: string;
    key: string;
    isImage?: boolean = false;
    isPrice?: boolean = false;
    isTotal?: boolean = false;
    total?: number = 0;
    public constructor(text:string , key:string = '' ){
       this.text = text
       this.key = key  == '' ? text : key
    }
    public generateColumnHtml(item : any , key :string){
        let value = item[key]
        return Vue.component('text-td', {
          template: `<td>${value}</td>`
        })
    }
}