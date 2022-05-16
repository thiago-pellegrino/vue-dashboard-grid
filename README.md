# Vue 3 +  Vue CLI UI

This template should help get you started developing with Vue 3 in Vue CLI UI. You can also create and manage projects using a graphical interface with the vue ui command:, check out the [script setup docs](https://cli.vuejs.org/guide/creating-a-project.html#using-the-gui) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

# vue-dashboard-grid

A pre determinate grid to build dashboards with any type of contents, like charts, images, web views, SVG, etc...

## Installation
```sh
$ npm install vue-dashboard-grid@latest
```
## Documents
[Link](https://#)

## How to use in Vue

```vue
<template>
  <DashboardGrid  
    :ref="grid"
    :cols=this.cols
    :rows=this.rows
    :margin=this.margin 
    :backgroundColor=this.backgroundColor
    :placeHolderBackground=this.placeHolderBackground
    :showGridItens="true"
  />  
</template>
<script>
import DashboardGrid from 'vue-dashboard-grid'

export default {
    name: "App",
    components:{
        DashboardGrid
    },
    data: () => ({
      cols: 8,
      rows: 6,
      margin:[4, 4],
      backgroundColor: '#E4E4E4',
      placeHolderBackground:'#C6F3DF'
    }),
    methods: {
      initGrid(){
        this.$refs.grid.addNewElement(1, 0, 0, 2, 1 ,'');
        this.$refs.grid.addNewElement(2, 1, 0, 2, 1 ,'');        
        this.$refs.grid.addNewElement(3, 3, 0, 1, 1 ,''); 

        this.$refs.grid.addNewElement(4, 0, 3, 3, 3 ,'');
        this.$refs.grid.addNewElement(5, 4, 3, 1, 1 ,'');
      }
    },
    mounted(){      
      this.$nextTick(function () { 
        this.initGrid();
      })      
    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style> 
```
