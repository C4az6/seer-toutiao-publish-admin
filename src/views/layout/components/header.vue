<template>
  <div class="header-container">
    <div class="layout-title">
      <i class="el-icon-s-operation" @click="showCollapse"></i>
      <span>先知内容发布后台管理系统</span>
    </div>
    <div class="layout-user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img
            class="user-avatar"
            :src="userInfo.photo"
            onerror="this.src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F13%2F20190113010747_cvejy.thumb.700_0.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613235977&t=4a45438d6134fad3e95c07bc35f287b5'"
            alt="user avatar"
          />
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-setting"></i>
            个人设置
          </el-dropdown-item>
          <el-dropdown-item @click.native="handleLogout">
            <i class="el-icon-unlock"></i>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  components: {},
  props: ['userInfo'],
  data () {
    return {
      isCollapse: false // aside是否折叠，true：折叠，false：展开
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
  },
  methods: {
    // 展开或折叠左侧菜单栏
    showCollapse () {
      this.isCollapse = !this.isCollapse
      // 利用事件总线实现兄弟组件传参
      this.$bus.$emit('handleChangeCollapse', this.isCollapse)
    },

    // 退出登录
    handleLogout () {
      /*
        注意：这个点击事件是在el-dropdown-item组件上绑定的，该组件默认不支持click，我们需要通过@click.native修饰符来解决
        1. 清除localStorage中的user_token数据
        2. 重定向到登录页面
      */
      window.localStorage.removeItem('user_token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .layout-title {
    font-size: 24px;
    i {
      color: #002033;
      margin-right: 20px;
    }
  }
  .layout-user-info {
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      transition: all 1s;
      &:hover {
        // 头像360翻转
        transform: rotate(360deg);
      }
    }

    .el-dropdown-link {
      display: flex;
      // justify-content: center;
      align-items: center;
    }
  }
  .el-icon-s-operation:hover {
    cursor: pointer;
  }
}
</style>
