<template>
  <v-file-input
    truncate-length="15"
    v-model="file"
    :rules="input.rules ? input.rules : []"
    :append-icon="input.required ? 'mdi-asterisk' : ''"
    :label="$t(input.label)"
    outlined
  ></v-file-input>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/utils/axios/Api";
import { Upload } from "@/repositories/global";
const Http = Api.getInstance();
export default Vue.extend({
  data() {
    return {
      loading: true,
      file: null,
    };
  },
  props: {
    input: Object,
  },
  watch: {
    file: {
      handler: function (val) {
        let formData = new FormData();
        formData.append("file", val);
        Upload(formData).then((d) => {
          this.$emit("change", {key: this.input.key , value:d});
        });
      },
    },
  },
});
</script>