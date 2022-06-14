<template>
    <v-file-input
      truncate-length="15"
      v-model="file"
      @change="upload"
      :rules="input.rules ? input.rules : []"
      :append-icon="input.required ? 'mdi-asterisk' : ''"
      :label="$t(input.label)"
      outlined
    ></v-file-input>

</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/utils/axios/Api";
import { Upload , DeleteFile} from "@/repositories/global";
import { removeBasePathFromImage } from "@/utils/helpers";
const Http = Api.getInstance();
export default Vue.extend({
  name : 'file-input',
  data() {
    return {
      loading: true,
      removeImage:false,
      path : '',
      file: null as Blob | null,
    };
  },
  props: {
    input: Object,
    initial : String
  },
  created(){
    this.path =process.env.VUE_APP_IMG_URL + this.initial
  },
  methods:{
     remove(){
      // this variable simply remove the base url from the imageto send the actual path
      const path = removeBasePathFromImage(this.path)
      DeleteFile(path).then(() => {
        this.file = null
        this.$emit("change", {key: this.input.key , value:null});
        this.removeImage =  !this.removeImage
      });
    },
    upload(){
       let formData = new FormData();
        formData.append("file", this.file as Blob);
        Upload(formData).then((d) => {
          this.path = d as string
          this.removeImage = false
          const value = removeBasePathFromImage(d as string)
          this.$emit('input'  ,value)

        });
    }
  },
  
});
</script>