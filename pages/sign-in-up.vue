<template>
  <div class="row">
    <div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
      <h1 class="title">威鹰取长统计登录/注册</h1>
      <div class="formContainer">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">邮箱</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="请输入您的邮箱" v-model="email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">密码</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="请输入您的密码" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary" @click.prevent="login">登录</button>
          <button type="submit" class="btn btn-success" style="margin-left: 20px" @click.prevent="register">注册</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default{
    middleware: 'anonymous',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      login(){
        let that = this
        this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          toastr.error(that.handleError(error))
        });
      },
      register() {
        let that = this
        this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          toastr.error(that.handleError(error))

        });
      },
      handleError(error) {
        let message
        switch (error.code) {
          case 'auth/user-not-found':
            message = '用户名或密码错误'
            break
          case 'auth/invalid-email':
            message = '邮箱格式不正确'
            break
          case 'auth/email-already-in-use':
            message = '邮箱已经被使用'
            break
          default:
            message = error.message
        }
        return message
      }
    },
    watch: {
      isAuthenticated: function(val) {
        if(val) {
          this.$router.push('/')
        }
      }
    }

  }
</script>
<style scoped>
  .title {
    text-align: center;
  }
  .formContainer {
    margin-top: 20px;
  }
</style>
