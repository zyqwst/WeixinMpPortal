<template>
  <div>
    <div class="content" v-html="content">

    </div>
    
  </div>
</template>
<script>
  
export default {
  components:{
  },
  data () {
    return {
      
    }
  },
  props:{id:Number,content:String},
}
</script>

<style scoped>
  .content{
    text-align: "center"
  }
</style>
