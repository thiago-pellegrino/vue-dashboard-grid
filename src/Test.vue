<template>
  <DashboardGrid  
    ref="grid"
    :cols=this.cols
    :rows=this.rows
    :margin=this.margin 
    :backgroundColor=this.backgroundColor
    :placeHolderBackground=this.placeHolderBackground
    :showGridItens="true"
  />
</template>
<script>
import DashboardGrid from './App.vue'

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
        try{ 
          this.$refs.grid.addNewElement(1, 0, 0, 1, 1 ,'');
          this.$refs.grid.addNewElement(2, 1, 0, 2, 1 ,'');        
          this.$refs.grid.addNewElement(3, 3, 0, 1, 1 ,''); 

          this.$refs.grid.addNewElement(4, 0, 3, 3, 3 ,'');
          this.$refs.grid.addNewElement(5, 4, 3, 1, 1 ,'');
        }catch(e){
          alert(e);
        }
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
 