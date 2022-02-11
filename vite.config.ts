import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend' // setup name 增强 [https://juejin.cn/post/7054317318343491615]
import AutoImport from 'unplugin-auto-import/vite' // API 自动导入 [https://juejin.cn/post/7054317318343491615]
import ViteImages from 'vite-plugin-vue-images' // 自动导入图片 [https://juejin.cn/post/7054317318343491615]
import { resolve } from 'path'
import Visualizer from 'rollup-plugin-visualizer' // 打包分析插件 
import injectExternals from 'vite-plugin-inject-externals'
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({}),
        VueSetupExtend(),
        AutoImport({
            // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
            dts: 'src/auto-imports.d.ts',
            imports: ['vue', 'vue-router'],
            resolvers: [ElementPlusResolver()]
        }),
        ElementPlus({
            // 引入的样式的类型，可以是css、sass、less等，
            useSource: true
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        ViteImages({
            dirs: ['src/assets/images'] // 指明图片存放目录
        }),
        Visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
        injectExternals({
            // The custom injection location will replace the corresponding text in index.html
            modules: [
                {
                    name: 'animate.css',
                    path: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
                }
            ]
        })
    ],
    resolve:{
        alias:{
          '@': resolve(__dirname,'src'),
          '@assets': resolve(__dirname,'src/assets'),
          '@components': resolve(__dirname,'src/components'),
          '@views': resolve(__dirname,'src/views'),
          '@config': resolve(__dirname,'src/config'),
          '@store': resolve(__dirname,'src/store')
        }
    },
    css: {
		preprocessorOptions: {
			scss: {
				charset: true,
				additionalData: ` @use "@/assets/styles/global.scss" as *; `,
			},
		},
	},
    build: {
        outDir: 'admin-app',
        // sourcemap: false, // 输出.map文件
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            // external: ['vue'],
            output: {
                manualChunks (id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    },
    server: {
        // https: false, // 是否开启 https
        // open: true, // 是否自动在浏览器打开
        // port: 8001, // 端口号
        // host: "0.0.0.0",
        // 跨域代理
        proxy: {
            "/api": {
                target: "http://localhost:3000", // 后台接口
                changeOrigin: true,
                // secure: false, // 如果是https接口，需要配置这个参数
                // ws: true, //websocket支持
                // 截取api，并用api代替
                // rewrite: (path) => path.replace(/^\/api/, "/api"),
            },
        }
    }
})


