import Vuex from 'vuex'
import Vue from 'vue'
import AA from './modules/aa'
import BB from './modules/bb'
import CC from './modules/cc'
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        aa:1,
        bb:2
    },
    mutation:{},
    actived:{},
    getters:{},
    modules:{
        AA,
        BB,
        CC
    }
})
export default store