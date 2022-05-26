module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true
  },
  chainWebpack: config => { 
    config.plugin('html').tap(args => { 
      args[0].title = 'Nozom E-Invoice | الفاتورة الالكترونية من النطم'
      return args
  })},
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
