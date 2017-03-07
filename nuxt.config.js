const webpack = require('webpack')
module.exports = {
  router: {
    // middleware: 'check-auth'
    base: '/weiying/'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/main.css',
    'element-ui/lib/theme-default/index.css',
    'bootstrap/dist/css/bootstrap.min.css',
    'toastr/build/toastr.min.css'
  ],
  plugins: [
    '~plugins/firebase',
    '~plugins/vuex-router-sync',
    '~plugins/element-ui',
    '~plugins/bootstrap',
    '~plugins/toastr',
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['jquery', 'bootstrap', 'toastr', 'moment', 'lodash', 'firebase', 'axios', 'bluebird', 'element-ui'],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      })
    ]
  }
}
