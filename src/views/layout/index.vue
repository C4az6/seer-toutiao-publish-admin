<template>
  <div class="layout-container">
    <el-container class="layout-wrap">
      <el-aside class="layout-aside" width="auto">
        <app-aside />
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <AppHeader />
        </el-header>
        <el-main class="layout-main"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppHeader from './components/header'
import AppAside from './components/aside'
export default {
  name: 'LayoutIndex',
  components: { AppAside, AppHeader },
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
/* scoped限制当前组件内的样式是否会影响其他组件的样式 */
.layout-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  .layout-wrap {
    width: 100%;
    height: 100%;
  }
}
.layout-aside {
  background-color: #002033;
}
.layout-header,
.layout-main {
  background-color: #fff;
}

.layout-header {
  border-bottom: 1px solid #ddd;
}

</style>
