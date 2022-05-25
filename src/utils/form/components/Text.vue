<template>
    <v-text-field
      :label="$t(input.label)"
      :prepend-icon="input.icon"
      :type="type"
      :append-icon="input.required ? 'mdi-asterisk' : ''"
      :rules="input.rules ? input.rules : []"
      @input="change"
    ></v-text-field>
</template>



<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    input: Object,
    type:{
      default: "select"
    }
  },
  methods:{
    change(val:any){
      this.input.val = val
      this.$emit('input')
    }
  }
});
</script>