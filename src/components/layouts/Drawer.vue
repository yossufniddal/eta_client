<template>
  <div class="sidebar">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="false"
      :right="$vuetify.rtl"
      :mini-variant="variant"
      color="bgdarker"
      fixed
      app
    >
      <v-list class="pt-0">
        <v-list-item class="h-app-bar justify-between logo">
          <router-link :to="{ name: 'Home' }">
            <svg
            class="logo-svg"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 213"
            >
              <path d="M108 8.3c-2.2 1.2-2.5 1.9-2.2 6.3.2 4-.5 6.5-3.7 13.4-2.2 4.7-6.2 13.3-8.9 19.2-4.1 8.8-4.8 10.9-3.7 11.8 1.1.9 1.7.5 2.8-2.2 2.2-5.2 12.6-27.8 15-32.8 1.5-3 3.2-4.8 5.3-5.7 2.9-1.1 4.6-.6 26.4 8.2 12.8 5.2 24.1 10.2 25.1 11.1 1.1 1 1.9 3 1.9 4.5s.5 3.1 1 3.4c2 1.3.8 4-8.1 17.8-5.1 7.8-9.2 14.7-9.3 15.4-.3 3.7 2.8 0 11.5-13.3l9.6-14.9 4.7-.5c6.4-.8 10.1-4.5 10.1-10.1 0-8.1-9.6-12.8-16-7.7l-2.8 2.2-5.6-2.1c-19.5-7.4-42.8-17.7-44.3-19.6-4.8-6.3-5-6.3-8.8-4.4zm71.4 29.9c1.6 2.6-.4 5.3-4 5.3-2.3 0-3-.5-3.2-2.3-.2-1.3-.1-3 .2-3.8.8-2 5.6-1.4 7 .8zM73.6 26.6c-20.9 8.7-23.2 9.4-25.8 8.3-2.3-.9-3.2-.8-5.4.6-2.4 1.6-2.6 2.1-2 6.4.6 4.4-.1 6.5-8.9 27.7-5.2 12.6-10.3 23.5-11.2 24.1-.9.7-2.8 1.3-4.1 1.3-1.3 0-3.7 1.3-5.3 2.9-6 6.1-2.5 16.1 6.4 17.8l4.2.9 9.8 23.4c7.6 17.9 9.9 24.7 10.1 28.4.1 5.8 2 7.6 6 5.8 3-1.3 3.4-4.6 1-7.7-1.3-1.7-1.4-4.1-.9-15.3.7-11.8.6-13.2-.9-13.2-1.3 0-1.6 1.1-1.6 5.4 0 8.5-1.2 18-2.1 16.4-2.6-4.7-18.8-45.2-18.3-45.9.9-1.5 2.7-1 6.8 2.1 3.6 2.7 5.6 3.1 5.6 1.1 0-.5-1.8-2.1-4-3.6-3.7-2.6-4-3.1-4-7.5 0-3.3-.6-5.5-2.2-7.5-2.7-3.5-2.6-3.8 8.1-29.4C43.5 48.3 45.3 45 47.4 45c.8 0 2.3-1.4 3.3-3.2C52.3 39 55.2 37.5 76 29c21.2-8.7 27.5-12.1 22.3-11.9-1 0-12.1 4.3-24.7 9.5zM22 103c.8 1.4.8 2.6 0 4-1.9 3.5-8 2-8-2s6.1-5.5 8-2z" />
              <path d="M114 24.6c0 .3 5.6 13.7 12.5 29.8s12.5 30 12.5 31c0 2.2-.5 2.1-15.5-1.8-31.1-8.1-29.1-7.3-31-12.3-2.4-6.1-5.2-7.7-12.2-6.9l-5.5.6-10-9.1c-6.9-6.4-10.2-8.9-11-8.1-.7.7 1.3 3.1 6.3 7.8 14.1 13.2 14 13 11.8 19.4-1.1 3-2.8 4.1-19.8 12.3-10.2 4.9-18.8 9.1-19 9.4-.3.2 0 .8.5 1.3.7.7 6.9-1.8 18.8-7.5 10.2-4.9 19-8.5 20.7-8.5 3.5 0 8.9 4.7 8.9 7.7.1 7 2.9 43.6 3.4 44.1 1.9 1.9 2.1-3.7.9-24.2-.8-12.6-1.2-23.5-.9-24.3.3-.7 1.4-1.6 2.3-2 1-.4 2.4-1.5 3.2-2.6 1.6-2.3 1.4-2.3 24.6 3.7 20.4 5.3 22.5 6 22.5 7.9 0 1.2-33.3 37.6-41.4 45.3-3 2.8-3.8 3.1-7.8 2.7-3.2-.4-5.3 0-6.9 1.1-2.9 1.8-2.6 1.9-16.7-6.8-10.4-6.5-12.7-9.1-11.8-13.6.3-1.7 5-9.4 10.3-17.1 5.4-7.7 9.7-14.3 9.6-14.7-.8-2.2-3.4.7-12.6 13.8-8.9 12.6-10.6 14.5-13.6 15.1-6.3 1.3-8.7 6.6-5 11.3 2 2.5 2.5 2.7 6.9 2.1 4.5-.6 5.1-.4 14.6 5.6 12.8 8 13.4 8.5 13.4 12.5 0 3.3-.3 3.5-11 8.9-6 3-11 5.9-11 6.3 0 2.2 2 1.7 11.1-2.8 10.4-5.3 13.2-5.9 16.3-3.5 2.7 2.1 6.5 1.9 10.3-.5 3.7-2.2 4.8-5.4 3.9-11.2-.6-3.9-.5-4.2 6.1-11.2 3.7-3.9 13.3-14.1 21.3-22.6 7.9-8.5 15.1-15.8 16-16.1 8.4-3.6 9.2-3.5 29.9 1.5 10.8 2.7 20.3 5.5 21.1 6.2 2.1 2 .2 3.4-9 6.9-8.3 3.1-9.5 3.8-8.6 5.3.4.7 3.9-.2 9.4-2.4 4.8-1.9 9.1-3.4 9.5-3.4.5 0 2.2 1.1 3.9 2.5 4.4 3.7 9.1 3.4 13.4-.9 4.6-4.6 4.8-10.4.5-14.7-1.7-1.6-4-2.9-5.4-2.9-1.4 0-3.4-.8-4.4-1.8-1.1-.9-5.3-9.9-9.4-19.9-4.1-10.1-8-18.3-8.6-18.3-.7 0-1.3.3-1.3.7 0 1.2 3.4 9.9 9.5 24.4 3 7.2 5.5 13.8 5.5 14.8s-1 2.7-2.2 3.8l-2.3 2-20-4.9c-17.5-4.3-20.3-5.3-22.5-7.7-1.4-1.6-3.4-3.1-4.6-3.5-1.6-.5-5-7.5-14.8-30.6-8.1-18.9-13.3-30-14.2-30-.8 0-1.4.3-1.4.6zm-28.6 47c1.9 1.9 2 3.6.4 5.2-2.4 2.4-7.8.8-7.8-2.4 0-1.7 2.8-4.4 4.5-4.4.7 0 2.1.7 2.9 1.6zm120.8 31.9c.8 1.9.8 2.8-.2 4-3.2 3.8-9.4-.1-7-4.5 1.6-2.9 5.8-2.6 7.2.5zM89.8 146.9c1.8 1.1 1.1 5.1-1 6.5-3.5 2.2-7.4-2.7-4.8-5.9 1.4-1.7 3.8-1.9 5.8-.6zM235.6 35.2c-.7 2.3-1.7 141.5-1 143.2.6 1.4 4.4 1.6 38.9 1.6h38.4l.3-8.6c.2-5.1-.1-8.9-.7-9.4s-13.6-.9-29-.9c-15.3-.1-28.3-.5-28.7-.9-.5-.5-.7-10.5-.6-22.3l.3-21.4 28.5.4c23.4.3 28.7.1 29.5-1 .6-.8.9-5.1.7-9.7l-.4-8.2h-28.1c-15.5 0-28.8-.4-29.5-.8-.9-.7-1.2-5.8-1-22.3l.3-21.4 29.8-.3L313 53V35.3l-27.2-.6c-40.6-1-49.8-.9-50.2.5zM338.7 35.6c-.4.4-.7 33-.7 72.5v71.7l32.3.7c17.7.4 33.3.6 34.7.4 2.4-.4 2.5-.6 2.8-9.6l.3-9.3-21.8-.2c-20-.2-25.9-.3-28.9-.7-.7-.1-1-18.9-1-62.9l.1-62.7-8.5-.3c-4.7-.1-8.9 0-9.3.4zM607 37.1c-24 6.1-44.4 25.3-52.1 49.1-4 12.4-4.2 32.1-.4 44.8 7.8 25.6 32.3 47 58.7 51.1 9.1 1.4 26.4.6 33.8-1.6 9.7-3 20.7-9.4 28.6-16.8 16.7-15.6 24.8-33.9 24.3-55.2-.3-15.7-3.8-27.6-11.8-39.7-10.5-16-27.6-28.1-45.5-32.2-9.3-2.2-26-2-35.6.5zm27.3 17c21 3.3 39.9 20.2 45.2 40.4 1.9 7.5 1.9 20.1 0 28.4-4.2 17.8-19.9 34.1-38.2 39.6-3 .9-9 1.5-15.8 1.5-9 0-12.2-.5-17.8-2.4-9.1-3.2-15.4-7.5-22.6-15.1-6.9-7.5-11.5-16.2-13.6-26-4-19.2 1.1-36.2 15.4-50.4 9.1-9.2 16.1-13 28.6-15.6 7.8-1.7 10.2-1.7 18.8-.4zM430.5 101.2c-.4 35.9-.5 68.4-.3 72.3l.3 7h18l.3-51.3c.1-28.1.6-51.2 1-51.2.5 0 13.4 21.9 28.7 48.7 15.3 26.9 28.7 50 29.7 51.5 1.8 2.7 2.4 2.8 9.7 2.8h7.8l.6-71.7c.5-56 .4-71.9-.6-72.5-.6-.5-4.8-.7-9.2-.6l-8 .3-.3 50c-.1 27.4-.6 50.3-1 50.7-.5.5-13.9-22-29.8-49.9l-29-50.8-8.6-.3-8.6-.3-.7 65.3zM919.5 37.1C897.9 40.4 880.1 52 867.4 71c-8.2 12.3-11.8 26.2-11.1 43 .8 19.7 7.5 35 21.6 49.1 8.8 8.7 18.3 14.7 29.6 18.5 7.2 2.4 9.4 2.7 22.5 2.6 16.4 0 22.9-1.5 35.3-8 7.5-3.8 19.6-14.5 25.1-22.1 16-21.7 18.5-53.4 6.1-76.9-9.7-18.5-27-32.7-46.2-38.1-8.7-2.4-22.6-3.3-30.8-2zm22.8 19.3c10.7 2.6 18.3 7 26.8 15.5 14.8 14.8 19.9 32.6 14.9 52.5-4.7 18.5-18.3 32.9-36.9 39.3-5 1.7-8.9 2.3-16.1 2.3-16.6 0-27-4.2-39-15.6-12.1-11.6-17-23.1-17-40 0-10.2 2.1-18.7 6.7-27 3.4-6.2 14.3-17.2 20.7-20.9 11.4-6.6 27.3-9 39.9-6.1zM730 46.5V56h33.4c33.2 0 36.2.3 33.8 3.3-.8 1-33.3 56.2-40.2 68.2-6.6 11.6-26.6 45.7-28.6 48.8-1.4 2.1-2.4 4.2-2.2 4.7.2.5 21.7 1 49.8 1.1l49.5.2.5-8.4c.3-4.6.4-8.7.2-9.2-.2-.4-15.3-.7-33.7-.7-18.4 0-33.6-.4-33.9-.9-.3-.4 9.8-18.5 22.5-40.2 41.6-70.9 49.1-84 48.8-84.3-.2-.2-22.8-.6-50.1-1L730 37v9.5zM1034.7 39.7c-.4.3-.7 33-.7 72.5V184H1051.7l.6-15.2c.4-8.3.7-31.6.7-51.7 0-27.8.3-36.2 1.2-35.3.6.6 10.5 17.5 21.9 37.4 11.4 20 21.3 36.4 22.1 36.5.8.1 10-14.8 22.7-36.7 11.8-20.4 21.9-37 22.4-37 .7 0 .8 17.8.4 50.9l-.6 51 8.5.3c4.7.2 9.1 0 9.7-.4.9-.5 1.3-18.9 1.6-72.2l.3-71.6H1145.5l-4.5 7.8c-2.4 4.2-6.9 12-10 17.2-3.1 5.2-11.5 19.5-18.6 31.7-7.1 12.3-13.4 22.3-14 22.3-.9 0-16.4-26.2-34.9-59.1-1.1-2-4.2-7.5-6.9-12.2l-5-8.7h-8.1c-4.5 0-8.5.3-8.8.7z" />
              <path d="M148.7 100.7c-.4.3.9 3.4 2.8 6.9 4.1 7.3 4.4 11.2 1.3 14.1-2 1.7-45.3 19.3-47.7 19.3-1.3 0-3.5 2.9-2.7 3.7.3.3 3.6-.6 7.3-2 3.8-1.4 15-5.8 25-9.6 10-3.9 19.1-7.1 20.2-7.1 4.6 0 7 4 11.6 19l4.4 14.5-2.6 2.7c-1.4 1.5-2.9 4.4-3.2 6.5-.7 4.5-1.7 5.1-25.6 14.9-8.8 3.6-16.2 6.8-16.4 7-.3.2 0 .9.5 1.4.7.7 7.4-1.6 20.4-7 10.7-4.4 20.2-8 21.3-8 1 0 3 .9 4.4 2 3.1 2.4 7.5 2.6 11.3.3 5.2-3.1 6.7-10.9 2.9-15.7-2.6-3.3-2.6-3.3 6.1-24.2 3.9-9.2 6.8-17.4 6.5-18.2-.3-.9-.9-1.2-1.4-.6-.8.9-8 17.5-13.6 31.6-4.6 11.5-6.4 10.4-12.1-7.9-2.4-7.6-4.4-14.6-4.4-15.5 0-.9.8-3 1.8-4.7 1.5-2.8 1.6-3.3.2-5.8-.9-1.6-2.8-3-4.7-3.5-3.3-.9-5.6-3.5-9.2-10.6-2.1-4.1-3.1-4.9-4.4-3.5zm29.7 66.9c3.1 3 .8 6.9-3.6 6.2-1.7-.2-2.4-1.1-2.6-3.2-.5-4.3 3.2-6.1 6.2-3z" />
              <path d="M133.1 160.4c-10.4 15.6-19.7 28.6-20.7 29-2.8 1.1-5.4-2.2-11.1-14.2-3-6.1-5.7-11.2-6.2-11.2-2.2 0-1.5 2.2 4 13.1 6.2 12.4 6.9 14.9 4.3 14.9-.8 0-11.3-4.1-23.2-9.1-11.9-5-22.4-9.1-23.2-9.2-.8-.1-1.5.4-1.5 1.1 0 .8 9 5 22 10.3 21.5 8.8 25.5 11.2 25.5 15 0 4.4 8.8 6.5 13 3.1 2.4-1.9 3-5.7 1.6-10.3-.6-2.3 1.6-6.2 17.5-30 10-15.1 18.4-28.2 18.7-29.2 1.4-5.4-3.7 1.2-20.7 26.7z" />
            </svg>
          </router-link>
        </v-list-item>
        <v-list-item
          to="/"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t('dashboard')" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-for="(item, i) in items"
          :key="i"
          exact
          :prepend-icon="item.icon"
        >
          <template v-slot:activator>
            <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.to"
            sub-group
            router
            exact
            class="sub"
          >
            <v-list-item-action>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="$t(child.title)" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      class="gradient"
    >
    
        <router-link to="/"> <img  v-show="!drawer" src="../../assets/img/icon.png"  class="w-40 transition"/></router-link>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
      </div>

      <v-spacer></v-spacer>

      
     
      
      <v-btn
        text
        @click.prevent="switchMode"
      >
        <v-icon class="">mdi-weather-sunny</v-icon>
        <!-- mdi-weather-sunny -->
      </v-btn>
      <v-btn
        text
        @click.prevent="switchLanguage"
      >
        <v-icon class="">mdi-earth</v-icon>
        <!-- mdi-weather-sunny -->
      </v-btn>
       <v-btn
        text
        @click.prevent="logout"
      >
        <v-icon class="">mdi-logout</v-icon>
        <!-- mdi-weather-sunny -->
      </v-btn>
    </v-app-bar>
    <!-- <div class="breadcrumbs"></div> -->
  </div>
</template>

<script>
import items from "@/utils/Sidebar.ts";
import { switchLanguage } from "@/utils/helpers";
import {Validate} from "@/repositories/user.ts"
//s
export default {
  data() {
    return {
      drawer: true,
      variant: false,
      notifications : [],
      items,
    };
  },
  created(){
    Validate().catch(() => {
      this.logout()
    })
  },
  methods: {
    switchMode() {
      this.$vuetify.theme.dark
        ? localStorage.setItem("mode", "light")
        : localStorage.setItem("mode", "dark");

      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout(){
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    switchLanguage() {
      const locale = this.$vuetify.rtl ? "en" : "ar";
      switchLanguage(locale, this);
    },
  },
};
</script>
