module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true
  },
  pluginOptions: {
    i18n: {
      locale: "ar",
      fallbackLocale: "ar",
      localeDir: "locales",
      enableInSFC: false,
      enableBridge: false,
    },
  },
};
