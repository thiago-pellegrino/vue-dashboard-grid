<template>
    <div v-for="element in elements" v-bind:key="element.id">
        <div v-bind:style="element.css">
            {{element.id}}
            <ItemGrid :id="element.id" :componentPath="element.componentPath" />
        </div>
    </div>
</template>
<script>
import ItemGrid from './components/Item.vue';

export default {
    name: "DashboardGrid",
    components:{
        ItemGrid
    }, 
    props: [
        'cols',
        'rows',
        'margin',
        'backgroundColor',
        'placeHolderBackground',
        'showGridItens'
    ],
    data: () => ({
            colWidth:'',
            rowHeight:'',                  
            elements: []                
    }),
    mounted() {               
        this.colWidth = this.calculateColWidth();
        this.rowHeight = this.calculateRowHeight();  
    
        this.showGrid(this.showGridItens);
    },
    methods:{
        addNewElement(index, x, y, w, h, componentPath) {
            this.addElement(index, this.setPosition(x, y, w, h), componentPath);
        },
        addElement(index, css, componentPath) {
            this.elements.push({id: index, type: 'dashboard-item', css: css, componentPath: componentPath});
        },
        setPosition(x, y, w, h) {
            let css = {
                    position: 'absolute',
                    backgroundColor: this.backgroundColor,
                    marginTop: this.margin[1] + 'px',
                    marginLeft: this.margin[0] + 'px',
                    left: Math.round(this.colWidth * x + (x + 1) * this.margin[0]) + 'px',
                    top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]) + 'px',
                    width: w === Infinity ? w : Math.round(this.colWidth * w + Math.max(0, w - 1) * this.margin[0]) + 'px',
                    height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1]) + 'px'
                };            
            return css;
        },                  
        calculateColWidth() {
            var documentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || document.body.offsetWidth;                
            documentWidth -= 10;
            const colWidth = (documentWidth - (this.margin[0] * (this.cols + 1))) / this.cols;            
            return Math.round(colWidth);
        },        
        calculateRowHeight() {
            var body = document.body;
            var html = document.documentElement; 
            var documentHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ); 
            documentHeight -= 10;
            const rowHeight = (documentHeight - (this.margin[0] * (this.rows + 1))) / this.rows;            
            return Math.round(rowHeight);
        },
        showGrid(display){
            if(display){
                let count = 0;
                for(var i = 0;i < parseInt(this.cols);i++){
                    for(var j = 0;j < parseInt(this.rows);j++){
                        let css = this.setPosition(i, j, 1, 1);                
                        css.backgroundColor = this.placeHolderBackground;
                        css.opacity = 0.4;
                        this.addElement(++count, css , '');
                    }
                }
            }
        }
    }
}
</script>
<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
