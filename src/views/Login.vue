<template>
  <div class="wrapper">
    <div class="h-full full-flex-center">
      <v-row justify="center">
        <v-col
          cols="12"
          lg="4"
          md="6"
          sm="8"
        >
          <app-form
            class="w1/2"
            :form="data"
          >

          </app-form>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

 <script lang="ts">
import AppForm from "@/utils/form/components/Form.vue";
import data from "@/forms/auth";
// import {snackBar} from '@/utils/Helpers'
export default {
  data() {
    return {
      data,
    };
  },
  components: {
    "app-form": AppForm,
  },
};
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>