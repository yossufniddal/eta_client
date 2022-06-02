import ActionsHeader  from '@/utils/datatable/header/actionsHeader';
import { ConvertToEInvoice } from '@/repositories/order';
import  i18n  from '@/i18n';
import { Action } from '@/utils/datatable/datatableInterface';
import Vue from "vue";
import { HeaderInterface } from "@/utils/datatable/header/headerInterface"
import ActionsComponent from "@/utils/datatable/components/actions.vue"
import { ExtendedVue } from 'vue/types/vue';
export default class InvoicesActions extends ActionsHeader implements HeaderInterface {
  actions:Action[] 
  total?: number = 0
  
  public constructor(){
    super()
    this.actions = [
      {
        title:"string",
        color:"string",
        icon:"string",
        method:() => {}
      }
    ]
 }




  private _convert = (item:any) => {
    ConvertToEInvoice(item.serial).then((res) => {
      console.log(res)
    })
  }
  public  generateColumnHtml(item : any , key :string) {
    const compClone = {...ActionsComponent}
    let c  = Vue.extend(ActionsComponent)
    var instance = new c({
      data: { actions : "asdasdasdasd" }
    })
    instance.$mount()
    const componentInstance = new Vue({ 
      propsData: { actions : 'sad'  },
      ...ActionsComponent, // stage-2 rest spread operator
    })

    
    return componentInstance

  }
}