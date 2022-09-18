import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { resolve } from "path";
// import STL from "style-resources-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./examples/mock/", // 解析，路径可根据实际变动
      localEnabled: true, // 此处可以手动设置为true，也可以根据官方文档格式
    }),
    vueJsx(),
    VueSetupExtend(),
    // new STL({
    //   preProcessor: "less",
    //   patterns: [
    //     // 存放less变量文件的路径
    //     resolve(__dirname, "./src/assets/less/parameter.less")
    //   ]
    // })
  ],
  resolve: {
    alias: {
      "@": "/src/",
      pkg: "/packages",
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // additionalData: `@import "${resolve(__dirname, 'src/styles/common.less')}"`
      }
    }
  },
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "packages/index.js"), //指定组件编译入口文件
      name: "vue-element-components",
      fileName: "vue-element-components",
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "axios", "element-plus"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          axios: "axios",
          "element-plus": "element-plus",
        },
      },
    }, // rollup打包配置
  },
});
