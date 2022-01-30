import DashItem from "./components/DashItem.vue";
import DashLayout from "./components/DashLayout.vue";
import Dashboard from "./components/Dashboard.vue";
import DashboardGrid from "./DashboardGrid.vue";
import DashboardTemplate from "./DashboardTemplate.vue";

const VueDashboardGrid = {
  DashItem,
  DashLayout,
  Dashboard,
  DashboardGrid,
  DashboardTemplate
};

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.keys(VueDashboardGrid).forEach((name) => {
    Vue.component(name, VueDashboardGrid[name]);
  });
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default VueDashboardGrid;
export { DashItem, DashLayout, Dashboard };