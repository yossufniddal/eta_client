import Form from "../form/Form";
import { HeaderInterface } from "./header/headerInterface";





export interface Action {
    title:string
    color:string
    icon:string
    method:Function
}


export interface Header {
    value:string
    text:string
    isPrice?:boolean
    isImage?:boolean
    isTotal?:boolean
    total?:number
}
export interface Totals {
    key:string
    value:number
}

export default interface DatatableIntetrface {
    title?: string
    description?:string
    url:string
    searchable?:boolean
    headers: HeaderInterface[]
    filters?:Form
    hasFooter?:boolean
    hasEdit?:boolean
    hasPrice?:boolean
    hasView?:boolean
    hasCreate?:boolean
}