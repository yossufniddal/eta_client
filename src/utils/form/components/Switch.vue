
<template>
<v-switch @change="change" :label="$t(input.label)">
</v-switch>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    input: Object,
  },

  methods:{
      change(val:any){
        this.input.val = val ? 1 : 0
          this.$emit('change')
      }
  }
});
</script>
