// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jump from "jump.js";
import moment from "moment";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import routes from "./routes";

window.jump = jump;
window.moment = moment;

Vue.use(VueRouter);

let router = new VueRouter({
    routes,
    linkActiveClass: 'is-active',
});
router.afterEach((to, from) => {
    // Smoothly scroll to top after any route is changed.
    setTimeout(() => {
        window.jump('body', {
            duration: 200,
        });
    }, 100);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',

    template: '<App/>',

    components: { App },

    router
});
