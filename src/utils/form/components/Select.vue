<template>
  <v-select
    @change="change"
    
    :item-text="input.text"
    :item-value="input.value"
    :value="input.initial || null"
    :items="input.items"
    :clearable="input.clearable"
    :loading="loading"
    :append-icon="input.required ? 'mdi-asterisk' : ''"
    :prepend-icon="input.icon"
    hide-details
    :rules="input.rules ? input.rules : []"
    :label="$t(input.label)"
    single-line
    outlined
  ></v-select>
</template>

<script lang="ts">
import Vue from "vue";
import Api from '@/utils/axios/Api';
const Http = Api.getInstance();
export default Vue.extend({
  data(){
    return{
      loading:false,
    }
  },  
  props: {
    input: Object,
  },
  methods:{
      change(val:any){
        if(typeof this.input.change != 'undefined'){
          this.input.change(val)
        }
        this.input.val = val
        this.$emit('change')
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
    // this.loading = false
    if (this.input.initialFetch){
      // this.getData()
    } else {
    }
  }
});
</script>