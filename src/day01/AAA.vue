<template>
  <div>
    姓名：<input type="text" v-model="userName">
  </div>
</template>

<script>
export default {
  props:['userName'],
    name:'AAA',
  data(){
    return{
        // userName:'zhangsan'
    }
  },
  created(){
    console.log(this)
  }
}
</script>

<style>

</style>