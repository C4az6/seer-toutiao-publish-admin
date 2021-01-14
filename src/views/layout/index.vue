<template>
  <div class="layout-container">
    <el-container class="layout-wrap">
      <el-aside class="layout-aside" width="200px">
        <div class="aside-logo"></div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="iconfont icontupian"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="iconfont iconfabu"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="iconfont icontubiaozhizuo-"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="iconfont iconfans"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="layout-header">Header</el-header>
        <el-main class="layout-main"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  .layout-wrap {
    height: 100%;
  }
}
.layout-aside {
  background-color: #002033;
  .el-menu {
    border-right: none;
  }
}
.layout-header,
.layout-main {
  background-color: #fff;
}

.layout-header {
  border-bottom: 1px solid #dddddd;
}

.aside-logo {
  width: 199px;
  height: 60px;
  background: url('./aside/logo_admin.png') no-repeat center/70%;
}

.iconfont {
  margin-right: 10px;
  margin-left: 10px;
}

.el-menu-item [class^=el-icon-] {
  margin-left: 5px;
}
</style>
