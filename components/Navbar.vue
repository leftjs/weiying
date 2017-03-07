<template>
  <!-- Fixed navbar -->
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <nuxt-link to="/" class="navbar-brand">威鹰</nuxt-link>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li :class="{active: path === '/'}"><nuxt-link to="/">首页</nuxt-link></li>
          <li :class="{active: path === '/manufacture-manage'}"><nuxt-link to="/manufacture-manage" >加工管理</nuxt-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><nuxt-link to="/sign-in-up" >登录</nuxt-link></li>
          <li><a @click.prevent="logout" style="cursor: pointer">注销</a></li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>
</template>


<script>
  import {mapState} from 'vuex'

  export default {
    mounted() {
      $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
      });
    },
    computed: {
      ...mapState({
        path: state => state.route.fullPath
      })
    },
    methods: {
      logout() {
        let that = this
        this.$firebase.auth().signOut().then(function() {
          // Sign-out successful.
          console.log('注销成功')
          that.$nuxt.$store.commit('setUser', null)
          that.$router.push('/sign-in-up')
        }, function(error) {
          // An error happened.
          console.log('logout error')
        });

      }
    }
  }
</script>
