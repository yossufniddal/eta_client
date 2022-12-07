<template>
  <v-container class="mt-12">
    <div class="container-tiny">
      <v-row justify="center">
        <v-col class="scale-hover pointer" cols="12">
          <h2>اجمالي السنة</h2>
        </v-col>
        <v-col class="scale-hover pointer" cols="12" md="3" sm="6">
          <count :count="counts[3].totalAmount" :title="'اجمالي مبيعات'" icon="mdi-cash-multiple" :color="'red'" />
        </v-col>
        <v-col class="scale-hover pointer" cols="12" md="3" sm="6">
          <count :count="counts[3].totalTax" :title="'اجمالي الضريبة'" icon="mdi-cash-multiple" :color="'red'" />
        </v-col>
        <v-col class="scale-hover pointer" cols="12" md="3" sm="6">
          <count :count="counts[1].totalAmount" :title="'اجمالي مشتريات'" icon="mdi-cash-multiple" :color="'red'" />
        </v-col>
        <v-col class="scale-hover pointer" cols="12" md="3" sm="6">
          <count :count="counts[1].totalTax" :title="'اجمالي ضريبة مشتريات'" icon="mdi-cash-multiple" :color="'red'" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="scale-hover pointer" cols="12">
          <h2>اجمالي الشهر</h2>
        </v-col>
        <v-col class="scale-hover pointer" cols="12" md="3" sm="6">
          <count :count="counts[2].totalAmount" :title="'اجمالي مبيعات'" icon="mdi-cash-multiple" :color="'red'" />
        </v-col>
        <v-col class="scale-hover pointer" cols="12" md="3" sm="6">
          <count :count="counts[2].totalTax" :title="'اجمالي الضريبة'" icon="mdi-cash-multiple" :color="'red'" />
        </v-col>
        <v-col class="scale-hover pointer" cols="12" md="3" sm="6">
          <count :count="counts[0].totalAmount" :title="'اجمالي مشتريات'" icon="mdi-cash-multiple" :color="'red'" />
        </v-col>
        <v-col class="scale-hover pointer" cols="12" md="3" sm="6">
          <count :count="counts[0].totalTax" :title="'اجمالي ضريبة مشتريات'" icon="mdi-cash-multiple" :color="'red'" />
        </v-col>
      </v-row>
      <v-row justify="center">
        
        <v-col class="scale-hover pointer" cols="12">
          <v-data-table
          :headers="table.headers"
          :items="table.data"
          :loading="table.loading"
          dense
          hid
          :page.sync="page"
          hide-default-footer
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
          item-key="serial"
          fixed-header
          height="400px"
          class="elevation-4"
        >
          <template v-slot:top>
            <div class="datatable-header w-full">
              <div class="w-full  flex-space  pa-4">
                <span>
                  <v-icon>mdi-checkbook</v-icon>
                  اجمالي الفروع
                </span>
                
              </div>
              <div class="pa-4">
                <v-expansion-panels
                  class="gr-bg "
                  v-model="filtersOpened"
                >
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <span>
                        <v-icon>mdi-filter-multiple-outline</v-icon>
                        {{$t('select_optional_data')}}
                      </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <app-form :form="filters">
                      </app-form>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
              
            </div>
          </template>
          <template v-slot:[`item.totalTax`]="{ item }">
            <span>{{currency(item.totalTax)}}</span>
          </template>
          <template v-slot:[`item.netAmount`]="{ item }">
            <td>{{currency(item.netAmount)}}</td>
          </template>
          <template v-slot:[`item.totalAmount`]="{ item }">
            <td>{{currency(item.totalAmount)}}</td>
          </template>
          <template v-slot:[`item.dateTimeIssued`]="{ item }">
            <td>{{convertDate(item.dateTimeIssued)}}</td>
          </template>

          <template slot="body.append">
            <tr class="text-center text-white md-hidden bg-gredient">
              <th
                class="text-center"
                v-for="(header, index) in table.headers"
                :key="index"
              >
                <span v-if="index == 0 && !header.total">
                  {{ $t("totals") }}
                </span>
                <span v-else-if="header.value == 'orders'">
                  {{ table.totals[header.value] }}
                 </span>
                <span v-else>
                 {{ currency(table.totals[header.value]) }}
                </span>
              </th>
            </tr>
          </template>
          
        </v-data-table>
        </v-col>
        
      </v-row>
    </div>
  </v-container>
</template>
<script >
import filters from "@/datatables/invoices/dashboard_filters";
import AppForm from "@/utils/form/components/Form.vue";
import { DashboardStats , DashboardStoreStats} from "@/repositories/invoice";
import Vue from 'vue'
import count from '@/components/partials/count.vue'
import {
  addParamsToLocation,
  clearNullValues,
  currency,
  convertDate,
  getParamsFromLocation,
} from "@/utils/helpers";
export default Vue.extend({
  components: {
    count,
    AppForm,

  },
  watch: {
    "filters.state": {
      handler(newValue) {
        addParamsToLocation(clearNullValues(newValue), this.$route.path);
        this.getTableData();
        
      
      },
      deep: true,
    },
  },
  data() {
    return {
      filters,
      filtersOpened: true,
      page: 1,
      itemsPerPage: 15,
      pageCount: 0,
      table: {
        loading: false,
        data: [],
        totals:null,
        headers: [
          {
            text: this.$t("store"),
            align: "center",
            sortable: true,
            value: "storeName",
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
            text: this.$t("total_amount"),
            align: "center",
            sortable: true,
            value: "totalAmount",
          },
          {
            text: this.$t("orders"),
            align: "center",
            sortable: true,
            value: "orders",
          }
        ],
      },
      error: null,
      loading: false,
      meta: {
        Visitors: {
          icon: "mdi-bank-check",
          color: "#9951b0",
        },
        Projects: {
          icon: "mdi-bank-check",
          color: "#268bd2",
        },
        Events: {
          icon: "mdi-calendar-multiselect",
          color: "#28968c",
        },
        Users: {
          icon: "mdi-account-group-outline",
          color: "#a03f3e",
        },
        PendingUsers: {
          icon: "mdi-account-alert-outline",
          color: "#ffb97f",
        },
        Ryadeen: {
          icon: "mdi-crown-outline",
          color: "#fcbf49",
        },
        Tamooheen: {
          icon: "mdi-account-tie-hat",
          color: "#d62828",
        },
        Mobadreen: {
          icon: "mdi-account-star-outline",
          color: "#003049",
        },
      },
      counts: {},
    };
  },
  methods: {
    currency,
    convertDate,
    getData() {
      this.loading = true;

      DashboardStats().then((res) => {
        this.counts = res;
        this.loading = false;
      });
    },
    getTableData() {
      this.table.loading = true;

      DashboardStoreStats(this.filters.state).then((res) => {
        this.table.data = res.data;
        this.table.totals = res.totals;
        this.table.loading = false;
      });
    },
  },
  created() {
    this.getData();
    getParamsFromLocation(this.$route.query, this.filters.state);
    let state = this.filters.state
    this.getTableData()
  }
})
</script>