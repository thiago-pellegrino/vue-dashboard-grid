<script setup lang="ts">
import DashboardGrid from './DashboardGrid.vue'
</script>
<template> 
  <DashboardGrid :_numberOfCols="4" :_numberOfRows="4"/>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
