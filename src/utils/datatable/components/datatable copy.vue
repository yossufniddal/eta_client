<template>
  <div>
   
      <v-container>
        <v-row>
          <!-- <v-col cols="12">
            <v-card>
              <v-card-text>
                <h2 class="primary-text text-center mb-4">{{$t(table.title)}}</h2>
                <p class="text-center">{{$t(table.description)}}</p>
              </v-card-text>
            </v-card>
          </v-col> -->
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
            <template v-slot:top >
               
               <app-form :form="table.filters" @change="filter" v-if="table.hasFilters"/>
               <div class="pa-4">
                <v-btn v-if="!table.error && table.hasFooter && (!table.hasFilters || table.filters.valid)" color="primary" class="w-full my-4" @click.prevent="showTotals">{{$t('show_totals')}}</v-btn>
               </div>
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
                  <v-icon
                    small
                  >
                    mdi-plus
                  </v-icon>
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
             <template v-slot:no-data  v-if="table.hasFilters && !table.filters.valid">
                  {{ $t("select_data") }}
            </template>
            <template slot="body.append" v-if="table.hasFooter && table.data.length > 0">
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
            <template v-slot:[`item.Img`]="{ item }">
              <v-img :src="item.Img"></v-img>
            </template>
            <template v-slot:[`item.Image`]="{ item }">
              <v-img :src="item.Image"></v-img>
            </template>
            <template v-slot:[`item.Actions`]="{ item }" >
              <div class="actions">

                  <v-btn
                    v-if="table.hasEdit"
                    @click.prevent="$router.push({name:`${$route.name}-edit` , params:{id:item.Id}})"
                    color="primary"
                    class="mr-4"
                  >
                  <v-icon
                    small
                  >
                    mdi-pencil
                  </v-icon>
                  تعديل
                  <!-- {{$t('table.edit')}} -->

                </v-btn>
                <v-btn
                    v-if="table.hasView"
                    @click.prevent="$router.push({name:`${$route.name}-view` , params:{id:item.Id}})"
                    color="warning"
                    class="mr-4"
                  >
                  <v-icon
                    small
                  >
                    mdi-eye
                  </v-icon>
                  عرض
                </v-btn>
                    
                <div v-if="$route.path.split('/')[1] == 'requests'"> 
                  <v-btn
                      @click.prevent="approve(item.Id)"
                      color="green"
                      class="mr-4"
                    >
                    <v-icon
                      small
                    >
                      mdi-thumb-up-outline
                    </v-icon>
                    تفعيل
                  </v-btn>
                     <v-btn
                     v-if="$route.name == 'users-pending'"
                      
                      color="red"
                      class="mr-4"
                    >
                    <v-icon
                      small
                    >
                      mdi-cash-multiple
                    </v-icon>
                    انتظار سداد
                  </v-btn>

                </div>
              </div>
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
    <v-dialog v-model="msgModal" width="600">
      <v-card>
        <v-card-title text-center>
                 <!-- <h2> ارسل رسالة الي العميل في صندوقه الخاص</h2> -->
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-textarea
                    label="ارسل رسالة الي العميل في صندوقه الخاص"
                    counter="400"
                    v-model="msg"
                    outlined
                    ></v-textarea>
            </v-col>
            <v-col cols="12">
            <v-btn class="app-btn" @click.prevent="approveReq(approvedServiceId)">قبول</v-btn>
            </v-col>
          </v-row>

        </v-card-text>

      </v-card>
    </v-dialog>
    <!-- <v-btn @click.prevent="table.getData()">reload</v-btn> -->
  </div>
</template>

<script lang="ts">
import Datatable from "@/utils/datatable/datatable";
import { Header } from "@/utils/datatable/datatableInterface";
import { currency } from "@/utils/helpers";
import AppForm from '@/utils/form/components/Form.vue'
import {Approve} from '@/repositories/user'
import Vue from "vue";
export default Vue.extend({
  props: {
    table: Datatable,
  },
  data() {
    return {
      approvedServiceId: 0,
      msgModal : false,
      dialog : false,
      msg : ""
    }
  },
  components:{
    AppForm
  },
  computed:{
    totalsHeaders(){
      return this.table.headers.filter((header:Header) => {
        return header.isTotal ? header : ''
      })
    },
  },
  methods: {
    approve(id:number){
      if(this.$route.path.split('/')[2] == 'services') {
        this.approvedServiceId = id
        this.msgModal = true
        return
      }
      this.approveReq(id)
    },
    approveReq(id:number){
      Approve( this.$route.path.split('/')[2], id).then((res) => {
        this.approvedServiceId = 0
        this.msgModal = false
        this.table.getData()
      })
    },
    currency: (x: number) => currency(x),
    filter(val:any){
      // reset headers totals to avoid sum bug
      // if we dont do this the class will add the totals to thee preevios data totals
      this.table.headers.forEach((header:Header) => {
        header.total = 0
      })
        this.table.getData()
    },
    showTotals(){
      this.dialog=true
    }
  },
});
</script>