<template>
    <div class="invoice" id="print" ref="invoice">
      <v-card  flat>
        <div>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th style="text-align: center" colspan="8">
                      <h2 class="mb-4">فاتورة رقم : {{ invoice.InternalId }}</h2>
                    </th>
                  </tr>
                   <tr>
                    <th colspan="3">
                      <p class="block">تاريخ الاصدار : {{ convertDate(invoice.DateTimeIssued) }}</p>
                      <p class="block">تاريخ الاستلام : {{ convertDate(invoice.DateTimeReceived) }}</p>
                      
                    </th>
                    <th colspan="5">
                      <p class="block">
                        المورد :{{ invoice.IssuerName }} 
                      </p>
                      <p class="block">بطاقة ضريبية :{{ invoice.IssuerRin }}</p>
                    </th>
                  </tr>
                  <tr>
                    <th class="text-right">المسلسل</th>
                    <th class="text-right" >كود الصنف</th>
                    <th class="text-right" style="min-width: 250px">اسم الصنف</th>
                    <th class="text-right">السعر</th>
                    <th class="text-right">الكمية</th>
                    <th class="text-right">الاجمالي</th>
                    <th class="text-right">الضريبة</th>
                    <th class="text-right">الاجمالي الكلي</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="item.Name">
                    <td class="text-right">{{ index + 1 }}</td>
                    <td class="text-right">{{ item.ItemType }} : {{ item.ItemCode }}</td>
                    <td class="text-right" style="min-width: 300px">
                      <span v-if="item.ItemName">{{ item.ItemName  }}</span>
                    </td>
                    <td class="text-right">{{ currency(item.ItemPrice) }}</td>
                    <td class="text-right">{{ item.Quantity }}</td>
                    <td class="text-right">{{ currency(item.SubTotal) }}</td>
                    <td class="text-right">{{ currency(item.TotalTax) }}</td>
                    <td class="text-right">{{ currency(item.TotalAmount) }}</td>
                  </tr>
                  <tr >
                    <!-- <td colspan="4"></td> -->
                    <td colspan="8" class="totlas w-full" style="border: 1px solid;padding 20px;width:100%">
                      <div class="d-flex w-full justify-space-between">
                        <span class="text-right">الاجمالي: </span>
                        <span class="text-left">{{currency(invoice.TotalAmount)}}</span>
                      </div>
                      <div class="d-flex w-full justify-space-between">
                        <span class="text-right">ضريبة القيمة المضافة(14%) :</span>
                        <span class="text-left"> {{currency(invoice.TotalTax)}}</span>
                      </div>
                      <div class="d-flex w-full justify-space-between">
                        <span class="text-right">الاجمالي الكلي: </span>
                        <span class="text-left">{{currency(invoice.TotalAmount + invoice.TotalTax)}}</span>
                      </div>
                    </td>
                  </tr>
                  <!-- <tr>
                    <td colspan="8">
                       <p
                          class="text-center"
                          style="border: 1px solid;padding 10px; margin-top:20px"
                        >{{convertTotalToWords}} </p>
                    </td>
                  </tr> -->
                </tbody>
                <!-- <tfoot>
                  <tr>
                    <td colspan="5" style="padding 20px;margin-top:20px">
                       
                      <p
                        class="text-center"
                        style="border: 1px solid;padding 10px; margin-top:20px"
                      >
                        {{ options.BonMsg5 }}
                      </p>
                    </td>
                  </tr>
                </tfoot> -->
              </template>
            </v-simple-table>
          </v-card-text>
        </div>
      </v-card>
    </div>
  </template>
  
  
  <script>
  import {
  currency,
  convertDate,
} from "@/utils/helpers";
import tafqeet from '@/utils/tafqeet.js'
  export default {
    methods: {
      tafqeet
    },
   methods:{
    currency,
    convertDate

   },
    props: ['invoice' , 'items' ]
  }
  </script>
  <style scoped>
  p {
    margin: 0;
  }
  .block{
    font-size: 18px;
  }
  </style>