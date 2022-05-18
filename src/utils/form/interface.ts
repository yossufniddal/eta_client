import Input from "./inputs/Input"

export type TextInputInterface = {
    name: string
    label: string
    icon: string
    cols: number
    type:string
    rules?:Array<Function>,
    val?:any
    initial?:any,
    required?:boolean
    value:any
}
export type SwitchInputInterface = {
    name: string
    label: string
    cols: number
    required?:boolean
    initial?:any,
    type:string
    val?:boolean
}
export type DateInputInterface = {
    name: string
    label : string
    min : string
    max : string
    required?:boolean
    val?:any
    value : string
    limit:string
    initial?:any
    type: string
}

export type SelectInputInterface = {
    name: string
    cache: boolean
    clearable?:boolean
    text: string
    val?:any
    value: string
    type:string
    initialFetch:boolean
    initial?:any,
    items?: Object[]
    icon: string
    label: string
    url?:string
    change?:Function
    required?:boolean
    payload?:Object
}

export type InputInterface = SelectInputInterface | TextInputInterface | DateInputInterface | SwitchInputInterface

export interface FormInterface {
    inputs: Input[]
    loading: boolean
    valid:boolean 
    submit: Function
}