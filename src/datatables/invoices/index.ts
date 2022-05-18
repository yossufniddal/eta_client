import { Header } from '@/utils/datatable/datatableInterface';
import DatatableIntetrface from '@/utils/datatable/datatableInterface'
import Datatable  from '@/utils/datatable/datatable'
import i18n from '@/i18n'
import filters from './filter';

const headers:Header[] = [
  {value:'serial', text: i18n.t('table.serial').toString() , isPrice : false , isTotal:false , total:0},
  {value:'internlID', text: i18n.t('table.internlID').toString() , isPrice : false , isTotal:false , total:0},
  {value:'totalDiscountAmount', text: i18n.t('table.totalDiscountAmount').toString() , isPrice : true , isTotal:true , total:0},
  {value:'totalTax', text: i18n.t('table.totalTax').toString() , isPrice : true , isTotal:true , total:0},
  {value:'totalAmount', text: i18n.t('table.totalAmount').toString() , isPrice : true , isTotal:true , total:0},
  {value:'actions', text: i18n.t('table.actions').toString() , isPrice : false , isTotal:false , total:0},
]
const url = "invoices"

const params:DatatableIntetrface = {
    title : "sidebar.orders_converted",
    headers ,
    description:"orders_converted_desc",
    searchable:true,
    url,
    filters,
    hasFooter:true,
    hasEdit:false,
    hasCreate:false
}
const datatable = new Datatable(params)
export default datatable