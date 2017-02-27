// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import jump from 'jump.js';
import moment from 'moment';

window.jump = jump;
window.moment = moment;

import Vue from 'vue';

import App from './App';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
});
