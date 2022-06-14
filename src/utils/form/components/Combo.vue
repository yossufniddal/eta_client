<template>
  <v-combobox
    @change="change"
    @click:clear="change"
    :cache-items="input.cache"
    :item-text="input.text"
    :item-value="input.valueKey"
    :items="input.items"
    :rules="input.rules ? input.rules : []"
    :loading="loading"
    :prepend-icon="input.icon"
    :append-icon="input.required ? 'mdi-asterisk' : ''"
    return-object
    hide-details
    v-model="model"
    outlined
    :clearable="input.clearable || false"
    :label="$t(input.label)"
    single-line
  ></v-combobox>
</template>

<script lang="ts">
import Vue from "vue";
import Api from '@/utils/axios/Api';
import { serializeQuery } from "@/utils/helpers";
const Http = Api.getInstance();
export default Vue.extend({
  data(){
    return{
      loading:false,
      model:null as Object | null
    }
  },
  props: {
    input: Object,
  },
  methods:{
      change(val:any){
        const value = typeof val == 'undefined' || val == null ? null :val[this.input.valueKey]
        this.$emit('input' , value)
      },
       getData(){
        this.loading = true
        Http.get(`${this.input.url}?${serializeQuery(this.input.payload)}`)
        .then((d) => {
          this.loading = false
          this.input.items = d
          let m = this.input.items.filter((item:any)=>{
            console.log("asdasd")
            console.log(item[`${this.input.valueKey}`])
            return item[`${this.input.valueKey}`] == this.input.value
          })[0]
         this.model = m
        })
      }
  },
  created(){
    if (this.input.initialFetch) this.getData()
  }
});
</script>