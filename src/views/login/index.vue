<template>
  <div class="login-container">
    <el-form ref="form" class="login-form" :model="user">
      <el-form-item>
        <div class="login-form-logo"></div>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.mobile" prefix-icon="el-icon-search" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>

      <el-form-item>
        <el-button class="login-btn" :loading=isLoading type="primary" @click="onLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 用户手机号
        code: '246810' // 用户手机号验证码
      },
      agree: false, // 用户是否勾选同意协议
      isLoading: false // 是否显示加载状态
    }
  },
  methods: {
    onLogin () {
      this.isLoading = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: this.user
      }).then(({ data }) => {
        this.isLoading = false
        console.log(data)
        this.$message.success('登录成功!')
      }).catch(error => {
        this.isLoading = false
        console.log(error)
        this.$message.error('用户名或密码错误!')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-logo {
    width: 259px;
    height: 57px;
    background: url("./logo_index.png") no-repeat center;
    background-size: 70%;
  }
  .login-form {
    min-width: 400px;
    background-color: #ffffff;
    padding: 20px 60px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
