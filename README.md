# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

# vue-responsive-dash

A Responsive, Draggable & Resizable Dashboard (grid) made with vue and typescript. 
Inspired by React-Grid-Layout & Vue-Grid-Layout

[Link](https://github.com/bensladden/vue-responsive-dash)

Notice that we are improve that project to have a little bit more functionalites.

# vue-ts-dashboard-grid

A pre determinate grid to build dashboards with any type of contents, like charts, images, web views, SVG, etc...

## Installation
```sh
$ npm install vue-ts-dashboard-grid
```
## Documents
[Link](https://#)

## How to use in Vue

```vue
<template>
    <DashboardGrid ref="grid" :_numberOfCols="this.numberOfCols" :_numberOfRows="this.numberOfRows"/>
</template>
<script>
import DashboardGrid from 'vue-ts-dashboard-grid'

export default {
  components: { DashboardGrid }, 
  data: () => ({
    numberOfCols: 6,
    numberOfRows: 6,
  }),
  methods: {
    initGrid(){
      this.addItem(0,0,1,1);
      this.addItem(1,1,1,1);
      this.addItem(2,1,1,1);
      this.addItem(0,2,1,1);
      this.addItem(0,3,1,1);
      this.addItem(0,4,1,1);
    },
    addItem(_x,_y,_w,_h){
      try{
        this.$refs.grid.addItem(_x,_y,_w,_h);
      }catch(e){
        alert(e);
      }
    }
  },
  mounted() {
    this.$nextTick(function () { 
      this.initGrid();
    })
  }
}
</script>
<style>
.content {
  height: 100%;
  width: 100%;
  border: 1px solid #42b983;
  border-radius: 2px;
  background-color: #42b9833d;
}
</style>
```