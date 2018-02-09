<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      let _this = this;
      _this.error = _this.post = null
      _this.loading = true
     console.log(_this.$router.param);

     _this.$api.post('/html')
    .then(function(data){
        _this.loading = false;
        _this.post = data.data;
    })
    .catch(function(errorHandle){
        _this.loading = false;
        _this.
        _this.$errorHandle(errorHandle);
    });

      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
</script>
