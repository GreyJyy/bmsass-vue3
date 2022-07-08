import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx']
  }
})
