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
      <AAA v-if="flag" />
      <BBB v-else />
    </keep-alive>
    <!-- keep-alive的原理就是：用一个对象把当前的组件缓存起来，等下次再进来时，先查看对象之前有没有缓存该组件，如果有就可以直接使用 -->
  </div>
</template>
<script>
import vList from './list.vue'
import AAA from './AAA.vue'
import BBB from './BBB.vue'
export default{
  name:'Test',
  components:{
    vList,
    AAA,
    BBB
  },
  data(){
    return{
      names:"dfssssssssss",
      listArr:[],
      flag:false
    }
  },
  methods:{
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

