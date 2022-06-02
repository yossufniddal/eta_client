import { HeaderInterface } from '@/utils/datatable/header/headerInterface';
import DatatableIntetrface from '@/utils/datatable/datatableInterface'
import Datatable  from '@/utils/datatable/datatable'
import filters from './filter';
import TextHeader from '@/utils/datatable/header/textHeader';
import PriceHeader from '@/utils/datatable/header/priceHeader';
import InvoicesActions from './actions';

const headers:HeaderInterface[] = [
  new TextHeader("serial"),
  new TextHeader("internlID"),
  new PriceHeader("totalDiscountAmount"),
  new PriceHeader("totalTax"),
  new PriceHeader("totalAmount"),
  new PriceHeader("totalCash"),
  new InvoicesActions()
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