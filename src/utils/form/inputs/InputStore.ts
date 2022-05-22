import  i18n  from '@/i18n';
import { InputInterface } from '@/utils/form/interface';
import { TextInputInterface , SwitchInputInterface , DateInputInterface , SelectInputInterface } from '../interface';
import {name , required , email, num} from "@/utils/validations/validations" 
import {currentDate} from '@/utils/helpers.ts'


export const transSerialInput:SelectInputInterface =  {
  name:"transSerial",

  text : 'key',
  cache:true,
  initialFetch:false,
  clearable:false,
  value : 'value',
  type : 'select',
  items :[
    {
      key : i18n.t("pos_order"),
      value : 25
    },
    {
      key :i18n.t("sales_order"),
      value : 30
    }
  ],
  icon : 'mdi-format-list-numbered',
  label : 'order_type'
}

export const statusInput:SelectInputInterface =  {
  name:"status",
  text : 'key',
  cache:true,
  initialFetch:false,
  clearable:true,
  value : 'value',
  type : 'select',
  items :[
    {
      key :i18n.t("posted"),
      value : 1
    },
    {
      key :i18n.t("not_posted"),
      value : 0
    }
  ],
  icon : 'mdi-lock-outline',
  label : 'status'
}

export const storeInput:SelectInputInterface =  {
  name:"store",
  cache : false,
  text : 'store_name',
  initialFetch:true,
  clearable:true,
  value : 'store_code',
  type : 'select',
  url:'stores',
  icon : 'mdi-store-settings-outline',
  label : 'store'
}

export const searchInput:TextInputInterface =  {
    name : 'search',
    label : 'search',
    type: 'text',
    icon : 'mdi-magnify',
    cols : 6,
    value : '',
}

export const featuredInput:SwitchInputInterface =  {
    name:"Featured",
    label : "featured",
    cols : 6,
    type : 'switch',
    val : false
}


export const fromDate:DateInputInterface =  {
    name:"fromDate",
    label : "from_date",
    limit:'date',
    min : "",
    max : currentDate,
    type:'date',
    value : "",
}


export const toDate:DateInputInterface =  {
    name:"toDate",
    label : "to_date",
    min : "",
    limit:'date',
    max : currentDate,
    type:'date',
    value : "",
}
export const convertToRequred = (input:InputInterface) => {
    const req = {...input}
    req.required = true
    return req
}
