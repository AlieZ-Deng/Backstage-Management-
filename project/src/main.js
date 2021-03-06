import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import './assets/common/style.css';


import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios.create({
  baseURL: "http://localhost:3000/api"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");