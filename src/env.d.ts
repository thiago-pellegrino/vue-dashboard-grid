/// <reference types="vite/client" />

import Vue, { VNode } from 'vue';

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component;
}

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    //interface ElementClass extends Vue {}
    //interface IntrinsicElements {
    //  [elem: string]: any;
    //}
  }
}