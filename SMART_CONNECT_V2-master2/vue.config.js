// vue.config.js
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),   // ou false si tu n’utilises pas l’API Options
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      })
    ]
  }
}
