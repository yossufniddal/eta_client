import { HeaderInterface } from '@/utils/datatable/header/headerInterface';
import DatatableIntetrface from '@/utils/datatable/datatableInterface'
import Datatable  from '@/utils/datatable/datatable'
import filters from './filter';
import TextHeader from '@/utils/datatable/header/textHeader';
import PriceHeader from '@/utils/datatable/header/priceHeader';
import DateHeader from '@/utils/datatable/header/dateHeader';

import { Action } from '@/utils/datatable/datatableInterface';
import ActionsHeader from '@/utils/datatable/header/actions/actionsHeader';

import {ConvertToEInvoice} from '@/repositories/order'


const convertAction :() => Action = () => {
  let action : Action = {
    title : 'convert',
    icon : 'mdi-eye-outline',
    method : convert,
  }
  return action
}
const convert = (item : any) => {
  ConvertToEInvoice(item.serial).then((res:any) => {
    console.log(res)
  })
  // router.push({name : `${router.currentRoute.name}-edit` , params:{id : item.Id}})
}
  let actions = new ActionsHeader('invoices'  , {edit : false , view : true , delete : false})
  actions.actions.push(convertAction())
const headers:HeaderInterface[] = [
  new TextHeader("serial"),
  new TextHeader("docNo"),
  new DateHeader("docDate"),
  new PriceHeader("discount"),
  new PriceHeader("totalTax"),
  new PriceHeader("totalCash"),
  actions
]
const url = "orders"

const params:DatatableIntetrface = {
    title : "sidebar.orders",
    headers ,
    description:"orders_desc",
    searchable:true,
    url,
    filters,
    hasFooter:true,
    hasEdit:false,
    hasCreate:false
}
const datatable = new Datatable(params)
export default datatable