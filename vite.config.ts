import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  resolve: {
    alias: {
      "@" : path.resolve(__dirname, './src')
    }
  },
  plugins: [vue(), vueJsx()]
})
