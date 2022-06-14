<template>
  <v-select
    @change="change"
    @click:clear="change"
    :item-text="input.text"
    :item-value="input.value"
    :items="input.items"
    :clearable="input.clearable"
    :loading="loading"
    :append-icon="input.required ? 'mdi-asterisk' : ''"
    :prepend-icon="input.icon"
    hide-details
    :rules="input.rules ? input.rules : []"
    :label="$t(input.label)"
    outlined
    single-line
    :value="initial"

  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Api from '@/utils/axios/Api';
const Http = Api.getInstance();
export default Vue.extend({
  data(){
    return{
      loading:true,
    }
  },  
  props:['input' , 'initial'],
  methods:{
      change(val:any){
        const value = typeof val == 'undefined'? null :val
        this.$emit('input' , value)
      },
      getData(){
        this.loading = true
        Http.get(this.input.url)
        .then((d) => {
          console.log(d)
          this.loading = false
          console.log(this.input.loading)
          this.input.items = d
        })
      }
  },
  created(){
    this.input.initialFetch ?  this.getData() : this.loading = false
  }
});
</script>