<template>
<div>
    <datatable :table="data"/>
</div>
</template>
<script lang="ts">
import Vue from "vue";
import data from "@/datatables/orders/unconverted";
import datatable from "@/utils/datatable/components/datatable.vue";
export default Vue.extend({
  name: "consultutns-list",
  components:{
    datatable
  },
  data(){
    return {
        data
    }
  },
});
</script>
