<template>
<div>
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
        <template v-slot:[`item.serial`]="{ item }">
              {{item}}
        </template>


    </datatable>
</div>
</template>
<script lang="ts">
import Vue from "vue";
import data from "@/datatables/invoices";
import datatable from "@/utils/datatable/components/datatable.vue";
export default Vue.extend({
  name: "consultutns-list",
  components:{
    datatable
  },
  methods:{
    convert(){
      console.log("this.convert")
    }
  },
  data(){
    return {
        data
    }
  },
});
</script>
