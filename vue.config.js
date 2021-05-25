const path = require("path");
module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-element-components/'
    : '/',
  // publicPath: '/',
    configureWebpack: {
      // entry: './packages/index.js',
      resolve: {
          alias: {
              "@": path.resolve("src"),
              "pkgs": path.resolve("packages"),
          }
      },
      devtool: 'none',
      output: {
        library: 'vue-element-components',
      },
      // optimization: {
      //   splitChunks: {
      //     chunks: 'all',
      //   },
      // },
      externals: [
          'sortablejs',
          'vue',
          'vuex',
          'vue-router',
          'element-ui',
          'core-js'
      ]
  },
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  },
  
}