import i18n  from '@/i18n';
import Vue from "vue";
import { HeaderInterface } from "./headerInterface"

export default class ImgHeader implements HeaderInterface{ 
    text: string;
    key: string;
    isPrice?: boolean = false;
    isImage?: boolean = true;
    total?: number = 0;
    public constructor(text:string = '', key:string = '' ){
      text = text == '' ? 'Img' : text
      this.text = i18n.t(text).toString()
      this.key = key  == '' ? text : key
    }
    public generateColumnHtml(item : any){
        let value = `${process.env.VUE_APP_IMG_URL}${item[this.key]}`
        value = value == process.env.VUE_APP_IMG_URL ? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' : value
        return Vue.component('img-td', {
          template: `<td><img class="table-img" src="${value}" /></td>`
        })
    }
}