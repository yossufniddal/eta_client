import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import en from "vuetify/src/locale/en";
import ar from "vuetify/src/locale/ar";
Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
  },
  rtl: true,
  theme: {
    dark: true,
    default: "dark",
    themes: {
      light: {
        primary: "#1e90ff",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
      dark: {
        primary: "#1e90ff",
        bg: "#161717",
        bgdarker: "#000",
        secondary: "#424242",
        accent: "#FF4081",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
    },
  },

  lang: {
    locales: { en, ar },
    current: "en",
  },
});
