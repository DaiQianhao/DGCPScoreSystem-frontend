import Vue from 'vue';
import vuetify from './plugins/vuetify';

import store from './store'

import App from './App.vue'

var app = new Vue({
    vuetify,
    store,
    render (h) {
        return h(App);
    }
});
app.$mount("#app")