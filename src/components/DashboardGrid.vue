<template>
    <Dashboard :id="'layout'" @currentBreakpointUpdated="updateCurrentBreakpoint">
      <DashLayout v-for="layout in layouts" :key="layout.breakpoint" v-bind="layout" :compact="false">
        <DashItem v-for="item in layout.items" 
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
            <!-- {{item.id}} -->
          </div>
        </DashItem>
        <template v-slot:placeholder>
          <div class="placeholderTest"></div>
        </template>
      </DashLayout>
    </Dashboard>   
</template>

<script>
import DashItem from "../components/DashItem.vue"
import DashLayout from "../components/DashLayout.vue";
import Dashboard from "../components/Dashboard.vue";

export default {
  components: {
    DashItem,
    DashLayout,
    Dashboard,
  },  
  props: ['_numberOfCols','_numberOfRows'], 
  data: () => ({
    compact: false,
    draggable: true,
    resizable: true,
    moveHold: 0,
    margin: { x: 8, y: 8 },
    numberOfCols: 0,
    numberOfRows: 0,
    layouts: [
      {         
        breakpoint:"",
        numberOfCols: 0,
        numberOfRows: 0,
        items: []
      }    
    ], 
    currentBreakpoint: ""
  }),
  beforeMount (){
    this.numberOfCols = this._numberOfCols;
    this.numberOfRows = this._numberOfRows;    
    this.layouts[0].numberOfCols = this._numberOfCols;
    this.layouts[0].numberOfRows = this._numberOfRows;
  },
  methods: { 
    addItem(_x,_y,_w,_h) {
      for (let layout of this.layouts) {
        layout.items.push({
          id: (layout.items.length + 1).toString(),
          x: _x,
          y: _y,
          width: _w,
          height: _h,
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