import { ConvertToEInvoice } from './../../../repositories/order';
import { Action } from './../../../utils/datatable/datatableInterface';
import { HeaderInterface } from './../../../utils/datatable/header/headerInterface';
import DatatableIntetrface from '@/utils/datatable/datatableInterface'
import Datatable  from '@/utils/datatable/datatable'
import filters from './filter';
import TextHeader from '@/utils/datatable/header/textHeader';
import PriceHeader from '@/utils/datatable/header/priceHeader';
import DateHeader from '@/utils/datatable/header/dateHeader';
import ActionsHeader from '@/utils/datatable/header/actionsHeader';
import SalesActions from './actions';



const headers:HeaderInterface[] = [
  new TextHeader("serial"),
  new TextHeader("docNo"),
  new DateHeader("docDate"),
  new PriceHeader("discount"),
  new PriceHeader("totalTax"),
  new PriceHeader("totalCash"),
  new SalesActions()
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