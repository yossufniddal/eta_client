import { Header } from '@/utils/datatable/datatableInterface';
import DatatableIntetrface from '@/utils/datatable/datatableInterface'
import Datatable  from '@/utils/datatable/datatable'
import i18n from '@/i18n'
const headers:Header[] = [
  {value:'serial', text: i18n.t('table.serial').toString() , isPrice : false , isTotal:false , total:0},
  {value:'docNo', text: i18n.t('table.docNo').toString() , isPrice : false , isTotal:false , total:0},
  {value:'docDate', text: i18n.t('table.docDate').toString() , isPrice : false , isTotal:false , total:0},
  {value:'discount', text: i18n.t('table.discount').toString() , isPrice : false , isTotal:false , total:0},
  {value:'totalTax', text: i18n.t('table.totalTax').toString() , isPrice : true , isTotal:true , total:0},
  {value:'totalCash', text: i18n.t('table.totalCash').toString() , isPrice : true , isTotal:true , total:0},
  {value:'actions', text: i18n.t('table.actions').toString() , isPrice : false , isTotal:false , total:0},
]
const url = "orders/converted"

const params:DatatableIntetrface = {
    title : "sidebar.orders_converted",
    headers ,
    description:"orders_converted_desc",
    searchable:true,
    url,
    hasFooter:true,
    hasEdit:false,
    hasCreate:false
}
const datatable = new Datatable(params)
export default datatable