import Vue from 'vue';
import App from './test.vue'
import store from './store/index'
const vm = new Vue({
    store,
    render(h){
        return h(App)
    }
}).$mount('#app')