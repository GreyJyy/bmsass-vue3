import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite' // 按需加载自定义组件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: true,
      dirs: ['src/components'], // 按需加载的文件夹
      resolvers: [ElementPlusResolver()] // ElementPlus按需加载
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx']
  },
  server: {
    hmr: true
  }
})
