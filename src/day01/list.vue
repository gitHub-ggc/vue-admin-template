<template>
  <div>
    <div v-for="item in list" :key="item.id">
        <header><H1>
            <slot :qq="item" name="head"></slot>
        </H1></header>
        <div>{{ item.name }}</div>
        <footer>
            <slot :qq="item" name="footer"></slot>   
        </footer>
    </div>
  </div>
</template>

<script>
export default {
    name:"List",
    props:{
        list:{
            type:Array,
            default:[]
        }
    }
}
</script>

<style>

</style>