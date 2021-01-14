<template>
  <div class="aside-container">
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
  </div>
</template>

<script>
export default {
  name: 'AppAside',
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
.aside-logo {
  width: 199px;
  height: 60px;
  background: url("./logo_admin.png") no-repeat center/70%;
}

.iconfont {
  margin-right: 10px;
  margin-left: 10px;
}

.el-menu-item [class^="el-icon-"] {
  margin-left: 5px;
}

.el-menu {
  border-right: none;
}
</style>
