<template>
<div>
  <!-- {{resp}}
  <a @click.prevent="resp = {}">clear</a> -->
    <datatable :table="data">
      <!-- <template v-slot:[`item`]="{ item }">
        {{item}}
      </template> -->
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
import data from "@/datatables/invoices";
import datatable from "@/utils/datatable/components/datatable.vue";
import { PostEtaInvoice } from "@/repositories/invoice";
export default Vue.extend({
  name: "invoices-list",
  components:{
    datatable
  },
  data(){
    return {
      resp : {},
      data
    }
  },
  methods:{
    convert(serial:number){
      PostEtaInvoice(serial).then((res) => {
        this.resp = res
      })
    },
  },
});
</script>
