<template>
  <div>
    <v-container>
      <v-data-table :headers="table.headers" :items="table.data" :loading="table.loading" dense :page.sync="page"
        :items-per-page="itemsPerPage" @page-count="pageCount = $event" fixed-header height="600px" class="elevation-4">
        <template v-slot:top>
          <div class="datatable-header w-full">
            <div class="w-full  flex-space  pa-4">
              <span>
                <v-icon>mdi-checkbook</v-icon>
                {{ $t("invoices") }}
              </span>

            </div>
            <div class="pa-4">
              <v-expansion-panels class="gr-bg " v-model="filtersOpened">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <span>
                      <v-icon>mdi-filter-multiple-outline</v-icon>
                      {{ $t('select_data') }}
                    </span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <app-form :form="filters">
                    </app-form>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <div class="w-full mb-4 pa-4 flex-space" v-if="table.data.length > 0">
              <span>{{ $tc("table_page", from) }} {{ to }}
                {{ $tc("table_count", table.data.length) }}</span>

              <v-pagination v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
            </div>
            <div class="w-full mb-4 pa-4 flex-space">
              <v-btn :loading="table.loading" class="app-btn" @click.prevent="customerModal = true">
                <v-icon class="mx-2">mdi-upload-outline</v-icon>
                {{ $t('create') }}
              </v-btn>
            </div>

          </div>
        </template>
       
        <template v-slot:[`item.Reserved`]="{ item }">
          <v-chip
            class="ma-2"
            color="red"
            label
            text-color="white"
            v-if="item.Reserved"
          >
            <v-icon left>
              mdi-lock-alert-outline
            </v-icon>
            {{$t('table.reserved')}}
          </v-chip>
          <v-chip
            class="ma-2"
            color="red"
            label
            text-color="white"
            v-else-if="item.StkTr01Serial > 0"
          >
            <v-icon left>
              mdi-lock-alert-outline
            </v-icon>
            {{$t('table.distibuted')}}
          </v-chip>
          <v-chip
            class="ma-2"
            color="purple"
            label
            text-color="white"
            v-else-if="item.Finished == 1"
          >
            <v-icon left>
              mdi-arrow-decision
            </v-icon>
            {{$t('table.under_ditributte')}}
          </v-chip>
          <v-chip
            class="ma-2"
            color="green"
            label
            text-color="white"
            v-else
          >
            <v-icon left>
              mdi-lock-open-variant-outline
            </v-icon>
            {{$t('table.under_edit')}}
          </v-chip>
  
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="editItem(item)" class="app-btn" >
          <v-icon
            small
            class="mr-2"
          >
            mdi-pencil
          </v-icon>
          {{$t('table.edit')}}
        </v-btn>

      </template>

      </v-data-table>
    </v-container>
    <v-dialog v-model="customerModal" max-width="500px">
      <v-card>
        <v-card-title>{{ $t('choose_customer') }}</v-card-title>
        <v-card-text>
          <v-combobox dense :loading="customerLoading" item-text="AccountName" filled outlined v-model="customer"  label="customer" :items="customers"></v-combobox>
          <v-combobox dense :loading="storeLoading" item-text="store_name" filled outlined v-model="store"  label="store" :items="stores"></v-combobox>
        </v-card-text>
        <v-card-actions>
          <div class="w-full mb-4 pa-4 flex-space">
            <v-btn :loading="table.loading" class="app-btn" @click.prevent="create()">
              <v-icon class="mx-2">mdi-upload-outline</v-icon>
              {{ $t('create') }}
            </v-btn>
          </div>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script >
import filters from "@/datatables/localInvoices/filter";
import AppForm from "@/utils/form/components/Form.vue";
import { LocalInvoicesList , LocalInvoiceCreate , CustomersList , StoresList , LocalInvoiceDocNo} from "@/repositories/localInvoice";
import { PostEtaInvoice } from "@/repositories/invoice"
import { openSnack } from '@/utils/snack/snack'
import {
  addParamsToLocation,
  clearNullValues,
  currency,
  convertDate,
  getParamsFromLocation,
} from "@/utils/helpers";
export default {
  data() {
    return {
      filters,
      customerModal: false,
      filtersOpened: true,
      page: 1,
      itemsPerPage: 15,
      customer: null,
      pageCount: 0,
      customers:[],
      customerLoading:false,
      store: null,
      stores:[],
      storeLoading:false,
      table: {
        loading: false,
        data: [],
        headers: [
          {
            text: this.$t("columns.docNo"),
            align: "center",
            sortable: true,
            value: "DocNo",
          },
          {
            text: this.$t("columns.customer"),
            align: "center",
            sortable: true,
            value: "CustomerName",
          },
          {
            text: this.$t("columns.empName"),
            align: "center",
            sortable: true,
            value: "EmpName",
          },
          {
            text: this.$t("columns.empCode"),
            align: "center",
            sortable: true,
            value: "EmpCode",
          },
          {
            text: this.$t("columns.totalCash"),
            align: "center",
            sortable: true,
            value: "TotalCash",
          },
          {
            text: this.$t("columns.docDate"),
            align: "center",
            sortable: true,
            value: "DocDate",
          },
          // {
          //   text: this.$t("columns.reserved"),
          //   align: "center",
          //   sortable: true,
          //   value: "Reserved",
          // },
          {
            text: this.$t("columns.actions"),
            align: "center",
            sortable: false,
            value: "actions",
          },
        ],
      },
    };
  },
  computed: {
    from() {
      return (this.$data.page - 1) * this.$data.itemsPerPage + 1;
    },
    to() {
      const from = (this.$data.page - 1) * this.$data.itemsPerPage;
      const to = from + this.$data.itemsPerPage;
      return to > this.$data.table.data.length
        ? this.$data.table.data.length
        : to;
    },
  },
  watch: {
    "filters.state": {
      handler(newValue) {
        addParamsToLocation(clearNullValues(newValue), this.$route.path);

        this.getData();


      },
      deep: true,
    },
  },
  methods: {
    currency,
    convertDate,
    editItem(item){
      let query = {   
        serial : item.Serial,
        no:item.DocNo,   
        store_code :item.StoreCode,     
        store_name : item.StoreName,     
        customer_code : item.CustomerCode,
        customer_name : item.CustomerName,
      }
      this.$router.push({name: 'invoices-local-edit' ,  query})
    },
    async getData() {
      this.table.loading = true;
      LocalInvoicesList(this.filters.state).then((res) => {
        this.table.data = res;
        this.table.loading = false;
      });
    },
    async getCustomers() {
      this.customerLoading = true;
      CustomersList().then((res) => {
        this.customers = res;
        this.customerLoading = false;
      });
    },
    async getStores() {
      this.storeLoading = true;
      StoresList().then((res) => {
        this.stores = res;
        this.storeLoading = false;
      });
    },
    reset() {
      this.table.loading = false;
    },
    async create()  {
      // this.customerModal = false
      // console.log("ads")
      // this.table.loading = false;
      let query = {       
        store_code : this.store.store_code,     
        store_name : this.store.store_name,     
        customer_code : this.customer.AccountCode,
        customer_name : this.customer.AccountName,
      }
      query.no = await LocalInvoiceDocNo({transSerial : 30})
      this.$router.push({name: 'invoices-local-edit' ,  query})
   
    },


  },
  components: {
    AppForm,
  },
  created() {

    getParamsFromLocation(this.$route.query, this.filters.state);
    let state = this.filters.state
    this.getData();
    this.getCustomers()
    this.getStores()
    

  },
};
</script>