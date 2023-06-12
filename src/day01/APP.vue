<template>
  <div>
    <button @click="fl"> home ----</button>
    <br>
    <button @click="f2"> use ----</button>

    <button @click="f3"> 动态路由 ----</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    data(){
        return {
            query:{
                a:1,
                b:2,
                c:3
            },
            id:9
        }
    },
    methods:{
        //query传参
        fl(){
            this.$router.push({path:'/home',query:{a:1,b:2,c:3}})
        },
        // params传参
        f2(){
            this.$router.push({path:'/use/' + this.id,params:{a:1,b:2,c:3}})
        },
        f3(){
            
        }
    }
}
</script>

<style>

</style>