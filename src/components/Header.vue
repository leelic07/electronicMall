<template>
  <header class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1"
            d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2"
            d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3"
            d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4"
            d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="../../static/logo1.png">
        </a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span class="navbar-link"></span>
          <a href="javascript:void(0)" class="navbar-link" v-if="userName">{{userName}}</a>
          <a href="javascript:void(0)" class="navbar-link" @click="dialogFormVisible = true" v-else>Login</a>
          <a href="javascript:void(0)" class="navbar-link" @click="confirmLogout">Logout</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-if="cartCount">{{cartCount}}</span>
            <a href="/#/cart">
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" label-width="80px" prop="userName">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="userPwd">
          <el-input type="password" v-model="form.userPwd" auto-complete="off" @keyup.enter="login"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import qs from 'qs'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        dialogFormVisible: false,
//        userName: '', //登录的用户名
        form: {
          userName: '',
          userPwd: ''
        },
        rules: {
          userName: {required: true, message: '用户名不能为空', trigger: 'blur'},
          userPwd: {required: true, message: '用户密码不能为空', trigger: 'blur'}
        }
      }
    },
    computed: {
      ...mapGetters({
        userName: 'userName',
        cartCount: 'cartCount'
      })
    },
    methods: {
      ...mapMutations({
        updateUserNameInfo: 'updateUserNameInfo',
        updateCartCountInfo: 'updateCartCountInfo',
        initCartCountInfo: 'initCartCountInfo'
      }),
      login(){
        this.$refs.loginForm.validate(valid => {
          if (valid) axios.post('/mall/users/login', qs.stringify({
            userName: this.form.userName,
            userPwd: this.form.userPwd
          })).then(response => {
            let res = response.data;
            if (res.status === '0') {
              this.dialogFormVisible = false;
              this.updateUserNameInfo(res.result.userName);
              this.$message({
                type: 'success',
                message: '登录成功！'
              });

            } else this.$message.error(res.msg);
          }).catch(err => console.log(err));
        });
      },
      confirmLogout(){
        this.$confirm('确定退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/mall/users/logout').then(response => {
            let res = response.data;
            if (res.status === '0') {
              this.$message({
                type: 'success',
                message: res.msg
              });
              this.updateUserNameInfo('');
            }
          }).catch(err => console.log(err));
        });
      },
      checkLogin(){
        axios.get('/mall/users/checkLogin').then(response => {
          let res = response.data;
          if (res.status === '0') this.updateUserNameInfo(res.result.userName);
        }).catch(err => console.log(err));
      },
      getCartCount(){
        axios.get('/mall/users/cartCount').then(response => {
          let res = response.data;
          if (res.status === '0') {
            this.initCartCountInfo();
            this.updateCartCountInfo(res.result.cartCount);
          }
        }).catch(err => console.log(err));
      }
    },
    mounted(){
      this.checkLogin();
      this.getCartCount();
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .navbar-cart-container
    display: inline-block
    a
      display: inline-block
</style>
