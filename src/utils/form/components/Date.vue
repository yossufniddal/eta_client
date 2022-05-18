<template>
  <v-menu
    v-model="active"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :label="$t(input.label)"
        prepend-icon="mdi-calendar-blank-outline"
        :append-icon="input.required ? 'mdi-asterisk' : ''"
        readonly
        v-model="model"
        v-on="on"
      ></v-text-field>
    </template>
    <!-- // Determines the type of the picker - date for date picker, month for month picker -->
    <v-date-picker
      locale="en-in"
      color="primary"
      
      
      :type="input.limit"
      @change="change"
      no-title
    ></v-date-picker>
  </v-menu>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
      let model = this.input.value
    return {
      active: false,
      model,
    };
  },
  props: {
    input: Object,
  },
  methods: {
    change(val: any) {
        this.active = false
        this.model = val
        this.input.val = val
      this.$emit("change", val);
    },
  },
});
</script>