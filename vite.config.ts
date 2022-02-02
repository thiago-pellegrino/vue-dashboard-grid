/*
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
*/

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript';

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      ...typescript({ tsconfig: './tsconfig.json' }),
      apply: 'build',
      //declaration: true,
      //declarationDir: 'types/',
      //rootDir: '/'
    },
    vue()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/dist'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'vue-ts-dashboard-grid',
      fileName: (format) => `vue-ts-dashboard-grid.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        sourcemap: false,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})