<template>
  <div>
    年龄: <input type="text" v-model="age">
  </div>
</template>

<script>
export default {
  props:['age'],
    name:'BBB',
    data(){
        return{
            // age:99
        }
    }
}
</script>

<style>

</style>