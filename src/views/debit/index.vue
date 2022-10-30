<template>
  <div>
    <v-container>
      <v-data-table
        v-model="selected"
        :headers="table.headers"
        :items="table.data"
        :loading="table.loading"
        dense
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
        item-key="serial"
        show-select
        fixed-header
        height="600px"
        class="elevation-4"
      >
        <template v-slot:top>
          <div class="datatable-header w-full">
            <div class="w-full  flex-space bgdarker pa-4">
              <span>
                <v-icon>mdi-checkbook</v-icon>
                {{$t("invoices")}}
              </span>
              <v-menu
                v-if="filters.state.posted != 1"
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :loading="table.loading"
                    class="gr-bg"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon class="mx-2">mdi-dots-horizontal-circle-outline</v-icon>
                    {{$t('actions')}}
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-title class="pointer" @click.prevent="upload(selected)">
                      <v-icon class="mx-2">mdi-upload-outline</v-icon>
                      {{$t('upload')}}
                      
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
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
                      {{$t('select_data')}}
                    </span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <app-form :form="filters">
                    </app-form>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <div
              class="w-full mb-4 pa-4 flex-space"
              v-if="table.data.length > 0"
            >
              <span>{{ $tc("table_page", from) }} {{ to }}
                {{ $tc("table_count", table.data.length) }}</span>

              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="7"
              ></v-pagination>
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
        <template v-slot:[`item.actions`]="{ item }" v-if="filters.state.posted != 1">
          <td class="pa-4">
            <v-btn
              :loading="table.loading"
              @click.prevent="upload([item])"
              dark
            >
              <v-icon class="mr-3 ml-3">mdi-upload-outline</v-icon>
              {{$t('upload')}}
            </v-btn>

          </td>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import filters from "@/datatables/invoices/filter";
import AppForm from "@/utils/form/components/Form.vue";
import { EtaInvoicesList } from "@/repositories/invoice";
import { PostEtaInvoice } from "@/repositories/invoice"
import {openSnack} from '@/utils/snack/snack'
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
      singleSelect: false,
      selected: [],
      filtersOpened: true,
      page: 1,
      itemsPerPage: 15,
      pageCount: 0,
      table: {
        loading: false,
        data: [],
        headers: [
          {
            text: this.$t("serial"),
            align: "center",
            sortable: true,
            value: "serial",
          },
          {
            text: this.$t("internal_id"),
            align: "center",
            sortable: true,
            value: "internlID",
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
        this.filters.valid = this.filters.validate();
        let isStoreValid = !(typeof newValue.store == 'undefined' ||  newValue.store == null ||  newValue.store == '')
        let isPostedValid = !(typeof newValue.posted == 'undefined' ||  newValue.posted == null ||  newValue.posted == '')
        if(isStoreValid && isPostedValid){
          this.getData();
        }
      
      },
      deep: true,
    },
  },
  methods: {
    currency,
    convertDate,
    getData() {
      if (typeof this.filters != "undefined" && !this.filters?.valid) {
        this.reset();
        return;
      }
      this.table.loading = true;
      EtaInvoicesList(this.filters.state).then((res) => {
        this.table.data = res;
        this.table.loading = false;
      });
    },
    reset() {
      this.table.loading = false;
    },
    upload(items) {
      let serials = ""
      items.forEach((item) => {
        serials += `${item.serial},`
      });
      let state = this.filters?.state 
      const request = {
        serials,
        type:"C",
        store : parseInt(state.store)
      }
      this.table.loading = true
      PostEtaInvoice(request).then((res) => {
        serials = ""
        this.selected =[]
        var parsed = JSON.parse(res)
        const sucessMessage = `${parsed.acceptedDocuments.length} document uploaded successfully `
        const errorMessage =  `${parsed.rejectedDocuments.length} failed to upload`
        let title = "" 
        let msg = "" 
        if (parsed.acceptedDocuments.length > 0) {
          title = "success"
          msg += sucessMessage
        }
        if (parsed.rejectedDocuments.length > 0) {
          title = "failed"
          msg += errorMessage
        }
        openSnack(title ,msg)

        this.getData()
      }).catch(e => {
          openSnack("failed" , `failed to upload the whole request`)

        this.getData()
      })
    },
  },
  components: {
    AppForm,
  },
  created() {
    getParamsFromLocation(this.$route.query, this.filters.state);
    let state = this.filters.state 
    let isStoreValid = !(typeof state.store == 'undefined' ||  state.store == null ||  state.store == '')
    let isPostedValid = !(typeof state.posted == 'undefined' ||  state.posted == null ||  state.posted == '')
    if(isStoreValid && isPostedValid){
      this.getData();
    }
  },
};
</script>