<template>
<div>
    <datatable :table="data">
       <template v-slot:[`actions`]="{ item }" >
          <v-btn
              @click.prevent="convert(item.serial)"
              color="green"
              class="mr-4"
            >
            {{$t('convert')}}
            <v-icon
              small
            >
              mdi-keyboard-return
            </v-icon>
          </v-btn>
        </template>
    </datatable>
</div>
</template>
<script lang="ts">
import Vue from "vue";
import data from "@/datatables/orders/sales";
import datatable from "@/utils/datatable/components/datatable.vue";
import { ConvertToEInvoice } from "@/repositories/order";
export default Vue.extend({
  name: "consultutns-list",
  components:{
    datatable
  },
  methods:{
    convert(serial:number){
      ConvertToEInvoice(serial).then((res) => {
          this.data.removeRow(serial)
      })
    },
  },
  data(){
    return {
        data
    }
  },
});
</script>
