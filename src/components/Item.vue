<template>
    <keep-alive>
        <component v-bind:is="componentFile" />
    </keep-alive>
</template>
<script>
import { defineAsyncComponent } from 'vue'

export default {
    name: "ItemGrid",
    props: {        
        componentPath: { type: String, required: true }        
    },
    data: () => ({
        index: '' 
    }),
    computed: { 
        componentFile() {             
            if(!typeof this.componentPath == 'undefined' && this.componentPath != ''){                
                return defineAsyncComponent(() => import(this.componentPath));
            } 
            return false;
        }    
    } 
}
</script>