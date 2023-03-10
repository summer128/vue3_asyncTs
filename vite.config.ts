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
    server: {
        port: 4000, // 设置服务启动端口号
        open: true, // 设置服务启动时是否自动打开浏览器
        cors: true, // 允许跨域

        // 设置代理，根据我们项目实际情况配置
        proxy: {
            '/api': { //apiTest是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
                target: 'http://47.93.114.103:6688/manage',
                changeOrigin: true, //是否跨域
                // rewrite: (path) => path.replace('/api', '')
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import '@/styles/common.scss';` // 引入全局变量文件
            }
        }
    }
})

