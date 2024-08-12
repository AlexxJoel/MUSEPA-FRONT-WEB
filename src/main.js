import Vue from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2';
import Loading from 'vue-loading-overlay';

import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-loading-overlay/dist/vue-loading.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Vue-sweetalert2
Vue.use(VueSweetalert2);
Vue.component('loading-overlay', Loading);


new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
