<template>
  <div>
    home
    <br>
    <router-view />
  </div>
</template>

<script>
export default {
 created(){
  console.log(1,this.$route)
 }
}
</script>

<style>

</style>