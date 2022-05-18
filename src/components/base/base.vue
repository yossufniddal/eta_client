<template>
  <v-app>
    <drawer/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Drawer from "@/components/layouts/Drawer.vue";
import { Validate } from "@/repositories/user";

export default Vue.extend({
  name: "App",
  components: {
    Drawer,
  },
  created(){
    if(!localStorage.getItem('token')) {
      this.$router.push('/login')
      return 
    }
     Validate().catch(() => {
        this.$router.push('/login')
      })
  }
});
</script>