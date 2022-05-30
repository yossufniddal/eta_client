
<template>
  <div>

    <v-container>
      <v-row>
        <v-col cols="12" v-if="table.title">
          <v-card>
            <v-card-text>
              <h2 class="primary-text mb-4 text-center">{{$t(table.title)}}</h2>
              <p class="text-center"  v-if="table.description">>{{$t(table.description)}}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="table.hasFilters">
          <v-card>
            <v-card-text>
          <app-form
            :form="table.filters"
            @change="filter"
          >
            <slot name="title">
              <h2 class="text-center mt-4 mb-4">{{$t('select_data')}}</h2>
            </slot>
          </app-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :headers="table.headers"
            :items="table.data"
            :loading="table.loading"
            dense
            :search="table.search"
            class="elevation-4"
            fixed-header
            height="400px"
          >
            <template v-slot:top>
              <div class="datatable-header">
                <v-text-field
                  v-model="table.search"
                  prepend-icon="mdi-magnify"
                  :label="$t('search')"
                  single-line
                  hide-details
                  v-if="table.searchable"
                ></v-text-field>
                <v-btn
                  @click.prevent="$router.push({name:`${$route.name}-create`})"
                  color="primary"
                  class="mr-4"
                  v-if="table.hasCreate"
                >
                  <v-icon small>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </div>
            </template>
            <template
              v-slot:body
              v-if="table.error"
            >
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
              <tr>
                  <component  v-for="(head , index) in table.headers" :key="index" :is="head.generateColumnHtml(item , head.key)"></component>
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
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card>
        <v-card-title class="text-h5 primary">
          {{$t('totals')}}
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    {{$t('key')}}
                  </th>
                  <th class="text-left">
                    {{$t('total')}}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(header , index) in totalsHeaders"
                  :key="index"
                >
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
import { Header } from "@/utils/datatable/datatableInterface";
import { addParamsToLocation, currency , getParamsFromLocation} from "@/utils/helpers";
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
      msgModal: false,
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
        return header.isTotal ? header : "";
      });
    },
  },
  watch:{
     "table.filters.state": {
      handler(newValue) {
        addParamsToLocation(newValue , this.$route.path)
      console.log(newValue)
      },
      deep: true
    }
  },
  methods: {
    currency: (x: number) => currency(x),
    filter(val: any) {
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
  created(){
    if (this.table.hasFilters && this.table.filters){
      getParamsFromLocation(this.$route.query , this.table.filters?.state)
    } 

  }
});
</script>