<template>
  <div>
    <v-container @click.prevent="getData()">
     <invoice :invoice="$route.query" :items="data"/>
    </v-container>
  </div>
</template>

<script >
import tafqeet from '@/utils/tafqeet.js'
import { EtaInvoicesRecentView } from "@/repositories/invoice";
import invoice from "@/components/utils/invoice.vue"

import {
  currency,
  convertDate,
} from "@/utils/helpers";
export default {
  data() {
    return {
      page: 1,
      data:{},
      itemsPerPage: 15,
      pageCount: 0,
      table: {
        loading: false,
        data: [],
        headers: [
          
          {
            text: this.$t("internal_id"),
            align: "center",
            sortable: true,
            value: "internalId",
          },
          {
            text: this.$t("total_amount"),
            align: "center",
            sortable: true,
            value: "total",
          },
          {
            text: this.$t("tax"),
            align: "center",
            sortable: true,
            value: "totalTax",
          },
          {
            text: this.$t("netAmount"),
            align: "center",
            sortable: true,
            value: "netAmount",
          },
          {
            text: this.$t("issuerName"),
            align: "center",
            sortable: true,
            value: "issuerName",
          },
          {
            text: this.$t("date_time_issued"),
            align: "center",
            sortable: true,
            value: "dateTimeIssued",
          },
          {
            text: this.$t("actions"),
            align: "center",
            sortable: false,
            value: "actions",
          },
        ],
      },
    };
  },

  components:{
    invoice
  },
  
  
  methods: {
    currency,
    convertDate,
    getData() {
      this.table.loading = true;
      EtaInvoicesRecentView(this.$route.params.id).then((res) => {
        this.data = res;
        console.log(res)
        console.log(res.invoiceLines)
        this.table.loading = false;
      });
    },
    
    reset() {
      this.table.loading = false;
    },
    
  },
  
  created() {
   
    this.getData();
  },
};
</script>