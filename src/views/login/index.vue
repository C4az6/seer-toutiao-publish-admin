<template>
  <div class="login-container">
    <el-form ref="loginRules" :rules="loginRules" class="login-form" :model="user">
      <div class="login-form-logo"></div>
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>

      <el-form-item  prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>

      <el-form-item>
        <el-button
          class="login-btn"
          :loading="isLoading"
          type="primary"
          @click="onLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 用户手机号
        code: '246810', // 用户手机号验证码
        agree: false // 用户是否勾选同意协议
      },
      isLoading: false, // 是否显示加载状态
      // 登录表单验证规则
      loginRules: {
        mobile: [
          { required: true, message: '手机号必填', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入合法的手机号', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '长度在6个数字', trigger: 'change' }
        ],
        agree: [
          // 自定义表单验证
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请勾选用户协议'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    // 登录请求函数
    login () {
      // 开启等待状态
      this.isLoading = true
      userLogin(this.user)
        .then(({ data }) => {
          this.isLoading = false
          console.log(data)
          this.$message.success('登录成功!')
        })
        .catch((error) => {
          this.isLoading = false
          console.log(error)
          this.$message.error('用户名或密码错误!')
        })
    },
    // 用户登录事件处理函数
    onLogin () {
      // 表单验证
      this.$refs.loginRules.validate((valid) => {
        if (valid) {
          // 验证成功
          this.login()
        } else {
          return false
        }
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
    background-size: 60%;
    margin-bottom: 10px;
  }
  .login-form {
    min-width: 300px;
    background-color: #ffffff;
    padding: 20px 60px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
