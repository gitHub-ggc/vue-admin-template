import Vue from 'vue';
import App from './APP.vue'
import store from './store/index'
import router from './router/router';
const vm = new Vue({
    store,
    router,
    render(h){
        return h(App)
    }
}).$mount('#app')