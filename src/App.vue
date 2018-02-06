<template>
  <div id="app">
    <router-link :to="{path:'/'}">首页</router-link>
    <router-link :to="{path:'/bind'}">绑定</router-link>
    <router-link :to="{path:'/test'}">测试</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import '~vux/src/styles/close.less';
@import '~vux/src/styles/1px.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
