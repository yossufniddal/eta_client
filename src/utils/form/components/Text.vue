<template>
    <v-text-field
      :label="$t(input.label)"
      :prepend-icon="input.icon"
      :append-icon="input.required ? 'mdi-asterisk' : ''"
      :rules="input.rules ? input.rules : []"
      :value="initial"
      :hint="input.hint"
      :type="input.type"
      outlined
      @input="change"
    ></v-text-field>
</template>



<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props:['input' , 'initial'],
  methods:{
    change(val:any){
      this.input.val = val

      // if (this.type == 'number') {
      //   val = parseInt(val)
      // }
      if(this.input.isNumber) {
        val = parseFloat(val)
      }
      this.$emit('input'  ,val)
    }
  }
});
</script>