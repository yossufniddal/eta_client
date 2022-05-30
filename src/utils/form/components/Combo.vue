<template>
  <v-combobox
    @change="change"
    :cache-items="input.cache"
    :item-text="input.text"
    :item-value="input.value"
    :items="input.items"
    :rules="input.rules ? input.rules : []"
    :loading="loading"
    :prepend-icon="input.icon"
    :append-icon="input.required ? 'mdi-asterisk' : ''"
    return-object
    hide-details
    outlined
    :clearable="input.clearable || false"
    :label="$t(input.label)"
    single-line
  ></v-combobox>
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
  props: {
    input: Object,
  },
  methods:{
      change(val:any){
        console.log(val)
        console.log(this.input.value)
        this.input.val = val[this.input.value]
        this.$emit('change' , val)
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
    if (this.input.initialFetch) this.getData()
  }
});
</script>