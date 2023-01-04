// @ts-ignore
import { defineConfig } from "vite";
const vue = require('@vitejs/plugin-vue')
const { resolve } = require("path"); // https://vitejs.dev/config/

export default defineConfig({
    plugins: [vue()], //查看 插件 API 获取 Vite 插件的更多细节 https://www.vitejs.net/guide/api-plugin.html
    resolve: {
        alias: {  // 这里就是需要配置resolve里的别名
            "@": resolve(__dirname, "./src"), // path记得引入
            // 'vue': 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import '@/styles/common.scss';` // 引入全局变量文件
            }
        }
    }
})

