<template>
  <div>
    <v-container>
      <v-data-table :headers="table.headers" :items="table.data" :loading="table.loading" dense :page.sync="page"
        :items-per-page="itemsPerPage" @page-count="pageCount = $event" item-key="serial" fixed-header height="600px"
        class="elevation-4">
        <template v-slot:top>
          <div class="datatable-header w-full">
            <div class="w-full  flex-space bgdarker pa-4">
              <span>
                <v-icon>mdi-checkbook</v-icon>
                {{ $t("recent_invoices") }}
              </span>
            </div>
            <div class="w-full mb-4 pa-4 flex-space" v-if="table.data.length > 0">
              <span>{{ $tc("table_page", from) }} {{ to }}
                {{ $tc("table_count", table.data.length) }}</span>

              <v-pagination v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
            </div>
          </div>
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
        </template>
        <template v-slot:[`item.TotalTax`]="{ item }">
          <span>{{ currency(item.TotalTax) }}</span>
        </template>
        <template v-slot:[`item.netAmount`]="{ item }">
          <td>{{ currency(item.TotalTax + item.TotalAmount) }}</td>
        </template>
        <template v-slot:[`item.TotalAmount`]="{ item }">
          <td>{{ currency(item.TotalAmount) }}</td>
        </template>
        <template v-slot:[`item.DateTimeIssued`]="{ item }">
          <td>{{ convertDate(item.DateTimeIssued) }}</td>
        </template>
        <template v-slot:[`item.DateTimeReceived`]="{ item }">
          <td>{{ convertDate(item.DateTimeReceived) }}</td>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <td class="pa-4">
            <v-menu bottom origin="center center" transition="scale-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn :loading="table.loading" class="gr-bg" v-bind="attrs" v-on="on">
                  <v-icon class="mx-2">mdi-dots-horizontal-circle-outline</v-icon>
                  {{ $t('actions') }}
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title class="pointer"
                    @click.prevent="$router.push({ name: 'recents-view', params: { id: item.Id }, query: item })">
                    <v-icon class="mx-2">mdi-eye-outline</v-icon>
                    {{ $t('view') }}

                  </v-list-item-title>
                  <!-- <v-list-item-title class="pointer" @click.prevent="upload(selected)">
                      <v-icon class="mx-2">mdi-upload-outline</v-icon>
                      {{$t('upload')}}
                      
                    </v-list-item-title> -->
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="pointer" @click.prevent="reject(item)">
                    <v-icon class="mx-2">mdi-cancle-outline</v-icon>
                    {{ $t('reject') }}

                  </v-list-item-title>
                </v-list-item>

              </v-list>
            </v-menu>
          </td>

          <!-- <td class="pa-4"> -->
          <!-- <v-btn
              :loading="table.loading"
              @click.prevent="$router.push({name : 'recents-view' , params : {id : item.Id} , query: item })"
              dark
            >
              <v-icon class="mr-3 ml-3">mdi-eye-outline</v-icon>
              {{$t('view')}}
            </v-btn> -->

          <!-- </td> -->
        </template>
      </v-data-table>
    </v-container>
    <v-dialog v-model="dialog" width="500">


      <v-card>
        <v-card-title class="text-h5 black">
          رفض فاتورة مشتريات

        </v-card-title>

        <v-card-text>
          <v-textarea label="سبب الرفض" v-model="rejectReason"></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="app-btn" @click="rejectAction()">
            رفض
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script >
import filters from "@/datatables/invoices/recent_filters";
import AppForm from "@/utils/form/components/Form.vue";
import { EtaInvoicesRecentList, EtaInvoicesRecentReject } from "@/repositories/invoice";
import {
  addParamsToLocation,
  clearNullValues,
  currency,
  convertDate,
  getParamsFromLocation,
} from "@/utils/helpers"
export default {
  watch: {
    "filters.state": {
      handler(newValue) {
        addParamsToLocation(clearNullValues(newValue), this.$route.path);
        this.table.loading = true;
      EtaInvoicesRecentList(this.filters.state).then((res) => {
        this.table.data = res;
        this.table.loading = false;
      });
      },
      deep: true,
    },
  },
  data() {
    return {
      page: 1,
      updateUUID: "",
      filters,
      rejectReason: "",
      dialog: false,
      itemsPerPage: 15,
      pageCount: 0,
      filtersOpened: false,
      table: {
        loading: false,
        data: [],
        //     "Id": 1,
        // "UUID": "DP22EBD63Q327HZQNM2Y68GG10",
        // "InternalId": "Y-2113-202200017451-2022102578000061264",
        // "TotalAmount": 1356.3,
        // "TotalTax": 189.88,
        // "IssuerName": "Al-Futtaim for Commercial and Administrative Centres S.A.E.",
        // "IssuerRin": "339745703",
        // "DateTimeIssued": "2022-10-25T00:00:00Z",
        // "DateTimeReceived": "2022-10-25T18:37:03Z"
        headers: [
          {
            text: this.$t("internal_id"),
            align: "center",
            sortable: true,
            value: "InternalId",
          },
          {
            text: this.$t("rin"),
            align: "center",
            sortable: true,
            value: "IssuerRin",
          },
          {
            text: this.$t("total_amount"),
            align: "center",
            sortable: true,
            value: "TotalAmount",
          },
          {
            text: this.$t("tax"),
            align: "center",
            sortable: true,
            value: "TotalTax",
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
            value: "IssuerName",
          },
          {
            text: this.$t("date_time_issued"),
            align: "center",
            sortable: true,
            value: "DateTimeIssued",
          },
          {
            text: this.$t("date_time_received"),
            align: "center",
            sortable: true,
            value: "DateTimeReceived",
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
  methods: {
    currency,
    convertDate,
    reject(item) {
      this.updateUUID = item.UUID
      this.dialog = true
      // this.table.loading = true;
      // EtaInvoicesRecentList(item).then((res: any) => {
      //   this.table.data = res;
      //   this.table.loading = false;
      // });
    },
    rejectAction() {
      this.table.loading = true;
      let body: object = {
        status: "rejected",
        reason: this.rejectReason
      }
      EtaInvoicesRecentReject(this.updateUUID, body).then((res) => {
        this.table.loading = false;
        this.updateUUID = ""
        this.rejectReason = ""
        this.dialog = false

      });
    },
    getData() {
      this.table.loading = true;
      EtaInvoicesRecentList(this.filters.state).then((res) => {
        this.table.data = res;
        this.table.loading = false;
      });
    },

    reset() {
      this.table.loading = false;
    },

  },
  components: {
    AppForm,
  },
  created() {

    this.getData();
  },
};
</script>