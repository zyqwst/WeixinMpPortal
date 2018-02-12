<template>
  <div id="app">
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
  width: 100%;
  margin-bottom: 50px;
  overflow: hidden;
  z-index:1;
  position:relative
}

</style>
