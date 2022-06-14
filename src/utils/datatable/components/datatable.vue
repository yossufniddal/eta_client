
<template>
  <div>
    <v-container>
      <v-row>
        <!-- <v-col cols="12" v-if="table.title">
          <v-card>
            <v-card-text>
              <h2 class="primary-text mb-4 text-center">
                {{ $t(table.title) }}
              </h2>
              <p class="text-center" v-if="table.description">
                >{{ $t(table.description) }}
              </p>
            </v-card-text>
          </v-card>
        </v-col> -->
        <!-- <v-col cols="12" v-if="table.hasFilters">
          <v-card>
            <v-card-text>
              <app-form :form="table.filters">
                <slot name="title">
                  <h2 class="ma-auto mt-4 mb-4">{{ $t("select_data") }}</h2>
                </slot>
              </app-form>
            </v-card-text>
          </v-card>
        </v-col> -->
        <v-col cols="12">
          <v-data-table
            :headers="table.headers"
            :items="table.data"
            :loading="table.loading"
            dense
            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
            :search="table.search"
            class="elevation-4"
            fixed-header
            height="400px"
          >
            <template v-slot:top>
              <div class="datatable-header w-full">
                <div class="w-full  flex-space bgdarker pa-4">
                  <span
                    ><v-icon>{{table.icon}}</v-icon>
                    {{table.title}}
                    </span
                  >

                  <!-- <v-btn
                    dark
                    class="gr-bg"
                    v-bind="attrs"
                    prepen
                    v-on="on"
                  >
                  <v-icon  class="mr-3 ml-3">mdi-dots-horizontal-circle-outline</v-icon>
                    {{$t('actions')}}
                  </v-btn> -->
                </div>
                <div class="pa-4">
                  <v-expansion-panels class="gr-bg " v-model="filtersOpened">
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <template v-slot:default="{ open }">
                          <span v-if="!open" key="0">
                            <v-icon>mdi-filter-multiple-outline</v-icon>
                            {{$t('advanced_search')}}
                          </span>
                          <span v-else>
                            <v-icon>mdi-filter-multiple-outline</v-icon>
                          {{$t('select_data')}}
                          </span>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <app-form :form="table.filters">
                        </app-form>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                  </v-expansion-panels>
                </div>
                <div class="w-full mb-4 pa-4 flex-space" v-if="table.data.length > 0">
                  <span
                    >{{ $tc("table_page", from) }} {{ to }}
                    {{ $tc("table_count", table.data.length) }}</span
                  >

                  <v-pagination
                    v-model="page"
                    :length="pageCount"
                  ></v-pagination>
                </div>

                <!-- <v-text-field
                  v-model="table.search"
                  prepend-icon="mdi-magnify"
                  :label="$t('search')"
                  single-line
                  hide-details
                  v-if="table.searchable"
                ></v-text-field> -->
                <v-btn
                  @click.prevent="
                    $router.push({ name: `${$route.name}-create` })
                  "
                  color="primary"
                  class="mr-4"
                  v-if="table.hasCreate"
                >
                  <v-icon small> mdi-plus </v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:body v-if="table.error">
              <tr class="text-center py-4">
                <td :colspan="table.headers.length">
                  {{ $t("error_getting_data") }}
                </td>
              </tr>
            </template>
            <template
              v-slot:no-data
              v-if="table.hasFilters && !table.filters.valid"
            >
              {{ $t("select_data") }}
            </template>
            <template
              slot="body.append"
              v-if="table.hasFooter && table.data.length > 0"
            >
              <tr class="text-center md-hidden black--text bg-gredient">
                <th
                  class="text-center text-color"
                  v-for="(header, index) in table.headers"
                  :key="index"
                >
                  <span v-if="index == 0 && !header.total">
                    {{ $t("totals") }}
                  </span>
                  <span v-else-if="!header.isTotal"> </span>
                  <span v-else>
                    {{ currency(header.total) }}
                  </span>
                </th>
              </tr>
            </template>
            <template v-slot:[`item`]="{ item }">
              <tr :class="{ red: item.Active == false }">
                <component
                  v-for="(head, index) in table.headers"
                  :key="index"
                  :actions="head.actions"
                  :item="item"
                  :is="head.generateColumnHtml(item)"
                ></component>
              </tr>
            </template>
            <!-- <template v-slot:[`item.image`]="{ item }">
              <v-img :src="item.image"></v-img>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <slot
                name="actions"
                :item="item"
              ></slot>
            </template> -->
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title class="text-h5 primary">
          {{ $t("totals") }}
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    {{ $t("key") }}
                  </th>
                  <th class="text-left">
                    {{ $t("total") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(header, index) in totalsHeaders" :key="index">
                  <td>{{ header.text }}</td>
                  <td>{{ currency(header.total) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Datatable from "@/utils/datatable/datatable";
import {
  addParamsToLocation,
  currency,
  getParamsFromLocation,
} from "@/utils/helpers";
import AppForm from "@/utils/form/components/Form.vue";
import Vue from "vue";
import { HeaderInterface } from "../header/headerInterface";
export default Vue.extend({
  props: {
    table: Datatable,
  },
  data() {
    return {
      approvedServiceId: 0,
      filtersOpened:true,
      msgModal: false,
      page: 1,
      itemsPerPage: 10,
      pageCount: 0,

      dialog: false,
      resp: {},
      msg: "",
    };
  },
  components: {
    AppForm,
  },
  computed: {
    totalsHeaders() {
      return this.table.headers.filter((header: HeaderInterface) => {
        return header.isPrice ? header : "";
      });
    },

    from() {
      return (this.$data.page - 1) * this.$data.itemsPerPage + 1;
    },
    to() {
      const from = (this.$data.page - 1) * this.$data.itemsPerPage;
      const to = from + this.$data.itemsPerPage;
      return to > this.table.data.length ? this.table.data.length : to;
    },
  },
  watch: {
    "table.filters.state": {
      handler(newValue) {
        addParamsToLocation(newValue, this.$route.path);
        this.filter();
      },
      deep: true,
    },
  },
  methods: {
    currency: (x: number) => currency(x),
    filter() {
      // reset headers totals to avoid sum bug
      // if we dont do this the class will add the totals to thee preevios data totals
      this.table.headers.forEach((header: HeaderInterface) => {
        header.total = 0;
      });
      this.table.getData();
    },
    showTotals() {
      this.dialog = true;
    },
  },
  created() {
    if (this.table.hasFilters && this.table.filters) {
      getParamsFromLocation(this.$route.query, this.table.filters?.state);
    }
  },
});
</script>