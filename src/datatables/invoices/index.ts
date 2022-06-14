import ActionsHeader from '@/utils/datatable/header/actions/actionsHeader';
import { HeaderInterface } from '@/utils/datatable/header/headerInterface';
import DatatableIntetrface from '@/utils/datatable/datatableInterface'
import Datatable  from '@/utils/datatable/datatable'
import filters from './filter';
import TextHeader from '@/utils/datatable/header/textHeader';
import PriceHeader from '@/utils/datatable/header/priceHeader';
// import InvoicesActions from './actions';
import {PostEtaInvoice} from '@/repositories/invoice'
import { Action } from '@/utils/datatable/datatableInterface';

const convertAction :() => Action = () => {
  let action : Action = {
    title : 'upload',
    icon : 'mdi-eye-outline',
    method : convert,
  }
  return action
}
const convert = (item : any) => {
  PostEtaInvoice(item.serial).then((res:any) => {
    console.log(res)
  })
  // router.push({name : `${router.currentRoute.name}-edit` , params:{id : item.Id}})
}
  let actions = new ActionsHeader('invoices'  , {edit : false , view : true , delete : false})
  actions.actions.push(convertAction())
const headers:HeaderInterface[] = [
  new TextHeader("serial"),
  new TextHeader("internlID"),
  new PriceHeader("totalDiscountAmount"),
  new PriceHeader("totalTax"),
  new PriceHeader("totalAmount"),
  new PriceHeader("totalCash"),
  actions
]
const url = "invoices"

const params:DatatableIntetrface = {
    title : "sidebar.invoice",
    headers ,
    description:"invoice_desc",
    searchable:true,
    url,
    filters,
    hasFooter:true,
    hasEdit:false,
    hasCreate:false
}
const datatable = new Datatable(params)
export default datatable