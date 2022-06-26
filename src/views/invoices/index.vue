<template>
<div>
  <datatable :table="data" />    
</div>
</template>
<script lang="ts">
import Vue from "vue";
import data from "@/datatables/invoices";
import datatable from "@/utils/datatable/components/datatable.vue";
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

});
</script>
