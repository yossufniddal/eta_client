import Vue from "vue";
import { HeaderInterface } from "./headerInterface"

export default class ImgHeader implements HeaderInterface{ 
    text: string;
    key: string;
    isPrice?: boolean = false;
    isImage?: boolean = true;
    isTotal?: boolean = false;
    total?: number = 0;
    public constructor(text:string = '', key:string = '' ){
      text = text == '' ? 'Image' : ''
      this.text = text
      this.key = key  == '' ? text : key
    }
    public generateColumnHtml(item : any , key :string){
        let value = item[key]
        value = value == '' ? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' : value
        return Vue.component('img-td', {
          template: `<td><img class="table-img" src="${value}" /></td>`
        })
    }
}