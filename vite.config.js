
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
/*
// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'vue-dashboard-grid',
      fileName: (format) => `vue-dashboard-grid.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
*/
/*
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
      declaration: true,
      declarationDir: 'types/',
      rootDir: '/'
    },
    vue()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'vue-dashboard-grid',
      fileName: (format) => `vue-dashboard-grid.${format}.js`
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
*/