require("./bootstrap");

window.Vue = require("vue").default;
import Main from "./components/Main.vue";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import axios from "axios";
import { routes } from "./router";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const router = new VueRouter({
    mode: "history",
    routes: routes
});

const app = new Vue({
    el: "#app",
    router: router,
    render: h => h(Main)
});
