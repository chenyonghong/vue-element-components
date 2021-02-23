const path = require("path");
module.exports = {
  runtimeCompiler: true,
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/vue-element-components/'
  //   : '/',
  publicPath: '/',
    configureWebpack: {
      resolve: {
          alias: {
              "@": path.resolve("src"),
              "pkgs": path.resolve("packages"),
          }
      },
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
  }
}