import Form from "../form/Form";
import { HeaderInterface } from "./header/headerInterface";





export interface Action {
    title:string
    icon:string
    method?:Function
}

export interface Totals {
    key:string
    value:number
}

export default interface DatatableIntetrface {
    title?: string
    icon?: string
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