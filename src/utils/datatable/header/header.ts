import { HeaderInterface } from "./headerInterface"

export default class TableHeader implements HeaderInterface{ 
    text: string
    key: string
    generateColumnHtml: Function
    isPrice?: boolean
    isImage?: boolean
    total?: number
    public constructor(details:HeaderInterface){
       this.text = details.text
       this.key = details.key
       this.generateColumnHtml = details.generateColumnHtml
       this.isPrice = details.isPrice
       this.isImage = details.isImage
       this.total = details.total
    }

}