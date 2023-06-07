import Vue from 'vue';
import App from './test.vue'
console.log(8888)
const vm = new Vue({
    render(h){
        return h(App)
    }
}).$mount('#app')