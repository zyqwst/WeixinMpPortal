<template>
  <div id="app">
      <loading v-model="isLoading"></loading>
      <toast v-model="toast.show" type="text">{{toast.text}}</toast>
    <router-view/>
  </div>
</template>

<script>
import {Loading,Toast} from 'vux'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components: {
      Loading,Toast
    },
    computed: {
      ...mapState({
        isLoading: state => state.global.isLoading,
        toast: state => state.global.toast
      })
    }
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
  position:relative;
  background:#fff;
}

</style>
