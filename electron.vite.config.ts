import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
          additionalData: `@use './src/renderer/src/styles/_main.scss' as *;`
        }
      }
    }
  }
})
