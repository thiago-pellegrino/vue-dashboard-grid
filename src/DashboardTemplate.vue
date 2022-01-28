<template>
    <Dashboard :id="'layout'" @currentBreakpointUpdated="updateCurrentBreakpoint">
      <DashLayout v-for="layout in layouts" :key="layout.breakpoint" v-bind="layout" :compact="false">
        <Dash-Item v-for="item in layout.items" 
            :id.sync="item.id" 
            :x.sync="item.x"
            :y.sync="item.y" 
            :width.sync="item.width" 
            :height.sync="item.height" 
            :locked="item.locked" 
            :key="item.id" 
            :resizable="resizable" 
            :numberOfRows="numberOfRows"
            :draggable="draggable"             
            :moveHold="moveHold"
            :debug="true">
          <div class="content">
            <!-- JSON.stringify(item, null, 2) --> 
            {{item.id}}
          </div>
        </Dash-Item>
        <template v-slot:placeholder>
          <div class="placeholderTest"></div>
        </template>
      </DashLayout>
    </Dashboard>   

</template>

<script>
import DashItem from "./components/DashItem.vue"
import DashLayout from "./components/DashLayout.vue";
import Dashboard from "./components/Dashboard.vue";

var nc = 12;
var nr = 8;

export default {
  components: {
    DashItem,
    DashLayout,
    Dashboard,
  },
  data() {
    return {
      compact: false,
      draggable: true,
      resizable: true,
      moveHold: 0,
      margin: { x: 8, y: 8 },
      numberOfCols: nc,
      numberOfRows: nr,
      layouts: [
        {         
          breakpoint:"",
          numberOfCols: nc,
          numberOfRows: nr,
          items: [
            { id: "1", x: 0, y: 0, width: 1, height: 1 },       
            { id: "2", x: 1, y: 0, width: 1, height: 1 },        
            { id: "3", x: 2, y: 0, width: 1, height: 1 },       
            { id: "4", x: 3, y: 0, width: 1, height: 1 },      
            { id: "5", x: 4, y: 0, width: 1, height: 1 },     
            { id: "6", x: 5, y: 0, width: 1, height: 1 },        
            { id: "7", x: 6, y: 0, width: 1, height: 1 },        
            { id: "8", x: 7, y: 0, width: 1, height: 1 }        
          ]
        }    
      ], 
      currentBreakpoint: ""
    };
  },  
  methods: { 
    addItem() {
      for (let layout of this.layouts) {
        layout.items.push({
          id: (layout.items.length + 1).toString(),
          x: 0,
          y: 0,
          width: 2,
          height: 1,
        });
      }
    },
    removeItem() {
      for (let layout of this.layouts) {
        layout.items.splice(0, 1);
      }
    },
    updateCurrentBreakpoint(val) {
      this.currentBreakpoint = val;
    }
  }
};
</script>

<style>
.content {
  height: 100%;
  width: 100%;
  border: 1px solid #42b983;
  border-radius: 5px;
  background-color: #42b9833d;
}
</style>
