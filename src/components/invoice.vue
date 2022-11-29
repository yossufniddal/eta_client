<template>
  <div class="invoice" id="print" ref="invoice">
    <v-card :light="true" flat>
      <div>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th style="text-align: center" colspan="5">
                    <!-- <img
                      style="height: 80px"
                      src="~/assets/img/dental.png"
                      alt=""
                    /> -->
                    <h2 class="mb-4">{{ options.ReportTitle }}</h2>
                    <p class="invoice__no" v-if="isInvoice">
                      فاتورة رقم : #{{ query.no }}
                    </p>
                    <p class="invoice__no" v-else>طلب رقم : #{{ query.no }}</p>
                  </th>
                </tr>
                <tr>
                  <th colspan="2">
                    <p class="block">التاريخ : {{ query.date }}</p>
                    <p class="block">
                      العميل :{{ query.customer_name }} /
                      {{ query.customer_code }}
                    </p>
                  </th>
                  <th colspan="3">
                    <p class="block">بطاقة ضريبية :{{ options.BonMsg4 }}</p>
                    <p class="block">سجل تجاري :{{ options.BonMsg3 }}</p>
                    
                  </th>
                </tr>
                <tr>
                  <th class="text-right">المسلسل</th>
                  <th class="text-right" style="min-width: 300px">اسم الصنف</th>
                  <th class="text-right">السعر</th>
                  <th class="text-right">الكمية</th>
                  <th class="text-right" v-if="!isInvoice">الكمية بالكرتونة</th>
                  <th class="text-right">الاجمالي</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="item.Name">
                  <td class="text-right">{{ index + 1 }}</td>
                  <td class="text-right" style="min-width: 300px">
                    {{ item.ItemName }}
                  </td>
                  <td class="text-right">{{ item.Price.toFixed(2) }}</td>
                  <td class="text-right">{{ item.Qnt }}</td>
                  <td class="text-right" v-if="!isInvoice">
                    {{ item.QntAntherUnit }}
                  </td>
                  <td class="text-right">{{ item.Total.toFixed(2) }}</td>
                </tr>
                <tr >
                  <td colspan="5" class="totlas w-full" style="border: 1px solid;padding 20px;width:100%">
                    <div class="d-flex w-full justify-space-between">
                      <span class="text-right">الاجمالي: </span>
                      <span class="text-left">{{TotalCash | price}}</span>
                    </div>
                    <div class="d-flex w-full justify-space-between">
                      <span class="text-right">ضريبة القيمة المضافة(14%) :</span>
                      <span class="text-left"> {{TotalCash * .14 | price}}</span>
                    </div>
                    <div class="d-flex w-full justify-space-between">
                      <span class="text-right">الاجمالي الكلي: </span>
                      <span class="text-left">{{TotalCash + (TotalCash * .14) | price}}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="5">
                     <p
                        class="text-center"
                        style="border: 1px solid;padding 10px; margin-top:20px"
                      >{{convertTotalToWords}} </p>
                  </td>
                </tr>
              </tbody>
              <tfoot>
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
              </tfoot>
            </template>
          </v-simple-table>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>


<script>
import tafqeet from '@/utils/Tafqeet.js'
export default {
  methods: {
    tafqeet
  },
  computed: {
    convertTotalToWords: {
      get: function () {
        let total = (this.TotalCash + this.TotalCash * 0.14).toFixed(2)
        let fractions = total.toString().split('.')
        let pounds = `${tafqeet(fractions[0])} جنيها`
        let cents =
          typeof fractions[1] == 'undefined' || fractions[1] == '00'
            ? ''
            : `و ${tafqeet(fractions[1])} قرشا`
        let val = `${pounds} ${cents} فقط لا غير`
        return val
      }
    }
  },
  props: ['items', 'query', 'store', 'isInvoice', 'TotalCash', 'options']
}
</script>
<style scoped>
p {
  margin: 0;
}
</style>