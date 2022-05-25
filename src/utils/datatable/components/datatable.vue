
<template>
  <div>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text>

              <h2 class="primary-text mb-4 text-center">{{$t(table.title)}}</h2>
              <p class="text-center">{{$t(table.description)}}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <app-form
            :form="table.filters"
            @change="filter"
            v-if="table.hasFilters"
          >
            <slot name="title">
              <h2>{{$t('select_data')}}</h2>
            </slot>
          </app-form>

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

            <!-- <template v-slot:[`item`]="{ item }">
                <slot
                  :name="`item`"
                  :item="item"
                />
            </template> -->
             <template v-slot:[`item`]="{ item }">
              <!-- <v-img :src="item.image"></v-img> -->
              <td v-for="(head , index) in table.headers" :key="index">
                <!-- <v-img v-if="head.isImage" :src="item.image"></v-img> -->
                <slot :name="`col.${head}`" :item="item[head]"></slot>
              </td>
            </template>
            <template v-slot:[`item.image`]="{ item }">
              <v-img :src="item.image"></v-img>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <slot
                name="actions"
                :item="item"
              ></slot>
              <!-- <v-btn
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
          </v-btn> -->
            </template>
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
import { currency } from "@/utils/helpers";
import AppForm from "@/utils/form/components/Form.vue";
import Vue from "vue";
import { ConvertToEInvoice } from "@/repositories/order";
import { PostEtaInvoice } from "@/repositories/invoice";
export default Vue.extend({
  props: {
    table: Datatable,
  },
  // render(){
  //   return new h('div' , 'test')
  // },
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
      return this.table.headers.filter((header: Header) => {
        return header.isTotal ? header : "";
      });
    },
  },
  methods: {
    convert(serial: number) {
      if (this.$route.path.split("/")[1] == "orders") {
        ConvertToEInvoice(serial).then(() => {
          this.table.removeRow(serial);
        });
      } else {
        PostEtaInvoice(serial).then((res) => {
          // this.table.removeRow(serial)
          this.resp = res;
        });
      }
    },
    currency: (x: number) => currency(x),
    filter(val: any) {
      // reset headers totals to avoid sum bug
      // if we dont do this the class will add the totals to thee preevios data totals
      this.table.headers.forEach((header: Header) => {
        header.total = 0;
      });
      this.table.getData();
    },
    showTotals() {
      this.dialog = true;
    },
  },
});
</script>