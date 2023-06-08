<template>
  <div>
    <!-- <input type="text" v-model="names" @keydown.enter="addData"> 
    <v-list :list="listArr">
      <template slot-scope="scope" slot="head">
        <div>{{ scope.qq }} <span>1111</span></div>
      </template>
      <template slot-scope="scope" slot="footer">
        <div>{{ scope.qq }} <span>222</span></div>
      </template>
    </v-list> -->
    <button @click="flag=!flag">点我</button>
    <keep-alive :exclude="['AAA']">
      <AAA v-if="!flag" :userName="userName" />
      <BBB v-else :age="age" />
    </keep-alive>
    <button @click="changeA">AAA</button>
    <button @click="changeA2">AAA2</button>
    <button @click="changeB">BBB</button>
    <button @click="changeB2">BBB2</button>
    <!-- keep-alive的原理就是：用一个对象把当前的组件缓存起来，等下次再进来时，先查看对象之前有没有缓存该组件，如果有就可以直接使用 -->
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import vList from './list.vue'
// import AAA from './AAA.vue'
// import BBB from './BBB.vue'
export default{
  name:'Test',
  components:{
    vList,
    AAA : () => import(/*webpackChunkName:'aaa'*/'./AAA.vue'),
    BBB:() => import(/*webpackChunkName:'bbb'*/'./BBB.vue'),
  },
  data(){
    return{
      names:"dfssssssssss",
      listArr:[],
      flag:false
    }
  },
  computed:{
    userName(){
      // console.log(8888,this.$store)
      return this.$store.state.AA.name;
    },
    age(){
      return this.$store.state.BB.name;
    }
  },
  methods:{
    changeA(){
      this.$store.commit('AA/set_name','下班啦A');
    },
    changeA2(){
      this.$store.dispatch('AA/name_async');
    },
    changeB(){
      this.$store.commit('BB/set_name','下班啦B');
    },
    changeB2(){
      // console.log(8888,this.$store)
      this.$store.dispatch('BB/name_async');
    },
    addData(){
      this.listArr.unshift({
        id:Math.random(),
        name:this.names
      })
      console.log(this.listArr)
      this.names = "";
    }
  }
}
</script>

