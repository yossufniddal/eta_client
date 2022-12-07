<template>
  <div class="printme">
    <v-card class="relative ma-5">
      <div class="no-edit" v-if="isDisabled"></div>
      <v-card-title class="invoice-header flex justify-space-between">
        <div class="w-full text-center">
          <h2 class="block mb-4">{{ $t('table.internlID') }} :{{ $route.query.no }} </h2>
        </div>
        <!-- <div class="right">
          <p class="block">{{ $t('columns.customer') }} :{{ $route.query.customer_name }} / {{
              this.$route.query.customer_code
          }} </p>
          <p class="block">{{ $t('columns.employee') }} : {{ user.emp_code }} / {{ user.emp_name }}</p>
        </div> -->
        <div class="middle">
          <p class="block">{{ $t('store') }} : {{ $route.query.store_name }}</p>
          <p class="block">{{ $t('columns.date') }} : {{ docDate }}</p>
        </div>
        <div
          class="left"
        >
          <v-card>
            <v-card-title class="block">
              <p class="block text-whitte">{{$t('subtotal')}} : {{currency(120)}} </p>
            </v-card-title>
          </v-card>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form class="pt-5" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <div v-if="error" class="danger w-full mt-4">
              <span>{{ $t(`form.errors.${error}`) }}</span>
            </div>
            <v-col class="text-center" :cols="6">
              <div class="combobox">
                <v-combobox prepend-icon="mdi-food-steak" outlined dense v-model="form.item" ref="item" :items="items"
                  :rules="rules" :disabled="isDisabled" :loading="itemsLoading" clearable item-text="Name"
                  @change="itemChanged" return-object :label="$t(`inputs.item`)"></v-combobox>

              </div>

            </v-col>
            <v-col class="text-center" :cols="6">
              <v-text-field ref="qnt" outlined dense prepend-icon="mdi-numeric" v-model="form.qnt"
                :disabled="isDisabled" type="number" :rules="qntRules" @keyup.enter="submit" :label="$t(`inputs.qnt`)">
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-btn :loading="insertLoading" :disabled="!valid && errors.length == 0" @click="submit" class="app-btn">
                <v-icon small class="mr-2">
                  mdi-content-save-all-outline
                </v-icon>
                {{ $t('form.submit') }}
              </v-btn>

            </v-col>
            <v-col cols="8">
              <v-btn :loading="insertLoading" :disabled="!valid && errors.length == 0" @click="editItem(item)"
                class="app-btn success">
                <v-icon small class="mr-2">
                  mdi-check-all
                </v-icon>
                {{ $t('form.save') }}
              </v-btn>

            </v-col>
            <v-col cols="4">
              <v-btn :loading="insertLoading" :disabled="!valid && errors.length == 0" @click="editItem(item)"
                class="app-btn danger">
                <v-icon small class="mr-2">
                  mdi-close-box-outline
                </v-icon>
                {{ $t('form.discard') }}
              </v-btn>

            </v-col>

          </v-row>
        </v-form>
        <v-data-table :headers="table.headers" :items="table.data" :loading="table.loading" :items-per-page="100"
          :search="table.search" fixed-header height="400px" sort-by="Name" class="elevation-1 mt-5">
          <!-- <template v-slot:top>
            <div class="spacing-playground px-6">
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    :label="$t('inputs.search')"
                    dens
                    rounded
                    hide-details
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>

          </template> -->


          <template v-slot:[`item.ItemPrice`]="{ item }">
            {{ currency(item.ItemPrice) }}
          </template>
          <template v-slot:[`item.ItemTotal`]="{ item }">
            {{ currency(item.ItemTotal) }}
          </template>
          <template v-slot:[`item.Qnt`]="{ item }">
            <v-edit-dialog @save="updateQnt(item)">
              <span>{{ item.Qnt }}</span>
              <template v-slot:input>
                <v-text-field prepend-icon="mdi-cash-multiple" v-model="newQnt" :label="$t('inputs.edit')" single-line>
                </v-text-field>
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:[`item.delete`]="{ item }">
            <v-btn :loading="deleteLoading" @click="deleteItem(item.Serial)" class="app-btn danger">
              <v-icon small class="mr-2">
                mdi-delete-outline
              </v-icon>
              {{ $t('form.delete') }}
            </v-btn>
          </template>

          <template v-slot:no-data>
            <span>{{ $t('table.no_data') }}</span>
          </template>

        </v-data-table>
      </v-card-text>
    </v-card>





  </div>
</template>

<script>
import { print } from '@/utils/print.js'
import { ItemsList, LocalInvoiceCreate, LocalInvoiceItemCreate, LocalInvoiceItemsList, LocalInvoiceUpdate, LocalInvoiceDelete } from '@/repositories/localInvoice.ts';
import { addParamsToLocation, currency } from '@/utils/helpers.ts'
import Vue from 'vue'
import invoice from '@/components/invoice'
import { mapGetters } from 'vuex'

export default {
  data() {
    let docDate = new Date().toLocaleString()
    return {
      snack: false,
      items: [],
      itemsLoading: false,
      search: '',
      docNo: "",
      docDate,
      newQnt: '',
      serial: 0,
      deleteLoading: false,
      newPrice: '',
      editItem: null,
      newName: null,
      printLoading: false,
      currentUserIsCreator: false,
      insertLoading: false,
      valid: false,
      error: '',
      errors: [],
      selectProduct: false,
      isDisabled: false,
      rules: [(v) => !!v || this.$t('validations.required')],
      qntRules: [
        (v) => {
          if (!v || isNaN(v) || v < 1) return this.$t('validations.min1')
          return true
        }
      ],
      priceHint: '',
      form: {
        item: '',
        qnt: '',
        price: ''
      },
      table: {
        loading: false,
        data: [],
        headers: [
          { text: this.$t('columns.code'), value: 'BarCode', align: 'center' },
          { text: this.$t('columns.name'), value: 'ItemName', align: 'center' },
          { text: this.$t('columns.qnt'), value: 'Qnt', align: 'center' },
          { text: this.$t('columns.price'), value: 'ItemPrice', align: 'center' },
          { text: this.$t('columns.total'), value: 'ItemTotal', align: 'center' },
          { text: this.$t('columns.delete'), value: 'delete', align: 'center' }
        ],
      },
    }
  },
  computed: {
    ...mapGetters({
      // totals: 'order/totals',
      user: "user/user"
    }),
    headers() {

      return [
        { text: this.$t('columns.code'), value: 'BarCode', align: 'center' },
        { text: this.$t('columns.name'), value: 'ItemName', align: 'center' },
        { text: this.$t('columns.qnt'), value: 'Qnt', align: 'center' },
        { text: this.$t('columns.price'), value: 'ItemPrice', align: 'center' },
        { text: this.$t('columns.total'), value: 'ItemTotal', align: 'center' },
        { text: this.$t('columns.delete'), value: 'delete', align: 'center' }

      ]
    }
  },
  methods: {
    currency,
    cancel() {
      this.form = {
        item: '',
        qnt: '',
        price: ''
      }
      this.$refs.form.reset()
      setTimeout(() => {
        this.goTo('item')
      }, 300)
    },
    updateQnt(item) {
      const payload = {
        Qnt: parseFloat(this.newQnt),
        Serial: this.serial
      }
      LocalInvoiceUpdate(payload).then((res) => {
        this.getInvoiceItems()
        this.newQnt = null
      })
    },
    deleteItem(item) {
      LocalInvoiceDelete(item).then((res) => {
        this.getInvoiceItems()
        this.newQnt = null
      })
    },
    save() {
      const Serial = parseInt(this.$route.query.serial) || this.serial
      const DocNo = parseInt(this.$route.query.no) || parseInt(this.docNo)
    },
    async discard() {
      const unreservePayload = {
        Serial: this.serial,
        Reserved: false
      }

    },
    itemChanged() {
      if (typeof this.form.item == 'string') return
      this.goTo('qnt')
    },
    goTo(input) {
      this.$refs[input].focus()
    },
    async insertOrder() {
      const query = this.$route.query
      let payload = {
        DocNo: parseInt(query.no),
        StoreCode: parseInt(query.store_code),
        AccountSerial: parseInt(query.customer_code),
        EmpCode: parseInt(this.user.emp_code),
      }
      await LocalInvoiceCreate(payload).then(res => {
        let query = { ...this.$route.query }
        query.serial = res
        console.log(query)
        addParamsToLocation(query, this.$route.path)
        this.serial = res
        console.log(res)
      })
    },
    insertOrderItem(form) {
      LocalInvoiceItemCreate(form).then(res => {
        this.getInvoiceItems()
        this.reset()
        console.log(res)
      })
    },
    reset() {
      this.$refs.form.reset()
      this.goTo('item')
      this.priceHint = ''
      this.insertLoading = false
    },
    init() {
      this.itemsLoading = true
      ItemsList(this.$route.query.store_code).then(res => {
        this.items = res
        this.itemsLoading = false
        console.log(res)
      })
      if (this.$route.query.serial) {
        this.serial = parseInt(this.$route.query.serial)
        this.getInvoiceItems()
      }
    },
    getInvoiceItems() {
      this.table.loading = true
      LocalInvoiceItemsList(this.serial).then(res => {
        this.table.data = res
        this.table.loading = false
      })
    },
    
    async submit() {
      await this.$refs.form.validate()
      if (!this.valid) {
        return
      }

      this.insertLoading = true

      // validate there is no items inserted
      if (typeof this.form.item == 'string') {
        this.selectProduct = true
        this.insertLoading = false
        return
      }
      // create order
      if (this.table.data.length === 0) {

        await this.insertOrder()
      }
      // //get serial neither from url or from store
      // // should be equals
      // // if we just opened the page then we depend on url [means we are editing order]
      // // if we are just created the order then we depend  on store [means we are creating order]
      // const serial = parseInt(this.$route.query.serial) || this.serial
      let itemForm = {
        HeadSerial: this.serial,
        ItemSerial: this.form.item.Serial,
        ItemName: this.form.item.Name,
        ItemPrice: this.form.item.Price,
        BarCode: this.form.item.Code,
        ItemTotal: currency(this.form.item.Price * parseFloat(this.form.qnt)),
        MinorPerMajor: this.form.item.MinorPerMajor,
        Qnt: parseFloat(this.form.qnt),
        Store: parseInt(this.$route.query.store_code),
      }
      this.insertOrderItem(itemForm)
    }
  },
  async beforeDestroy() {
    this.discard()
  },
  created() {
    this.init()
  }
}
</script>
<style>
.relative {
  position: relative
}

.no-edit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  cursor: not-allowed;
}

.print-btn {
  z-index: 101;
}

.invoice-header {
  background: var(--bgdarker3) !important;
}
</style>
