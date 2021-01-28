<template>
  <div class="material-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑部分 start -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑部分 end -->
      </div>

      <!-- 图片筛选按钮、添加素材部分 start -->
      <div class="filter-wrap">
        <el-radio-group v-model="imagesParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small">添加素材</el-button>
      </div>
      <!-- 图片筛选按钮、添加素材部分 end -->
      <!-- 素材列表部分 start -->
      <div class="images-wrap">
        <el-image
          style="width: 180px; height: 180px; padding: 30px"
          class="image-item"
          :src="item.url"
          fit=""
          v-for="(item, index) in imagesList"
          :key="index"
        ></el-image>
      </div>
      <!-- 素材列表部分 end -->

      <!-- 分页部分 start -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="imagesParams.page"
        :page-size="imagesParams.per_page"
        :page-sizes="[10, 20, 30, 40, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        background
      >
      </el-pagination>
      <!-- 分页部分 end -->
    </el-card>
  </div>
</template>

<script>
import { getUserImages } from '@/api/material'
export default {
  name: 'MaterialIndex',
  components: {},
  props: {},
  data () {
    return {
      imagesList: [], // 图片素材列表
      totalCount: 0, // 分页总数
      imagesParams: {
        collect: false, // 是否是收藏图片
        page: 1, // 页数
        per_page: 20 // 每页记录数量
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserImages()
  },
  mounted () {},
  methods: {
    // 加载用户图片素材
    loadUserImages (value) {
      getUserImages(this.imagesParams)
        .then(({ data: res }) => {
          this.imagesList = res.data.results
          this.totalCount = res.data.total_count
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 每页显示记录数量变化触发的函数
    handleSizeChange (val) {
      this.imagesParams.per_page = val
      this.loadUserImages()
    },

    // 页码改变时触发的函数
    handleCurrentChange (val) {
      this.imagesParams.page = val
      this.loadUserImages()
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .image-item > img {
  border-radius: 4%;
  border: 1px dashed #282a36;
}

.filter-wrap {
  display: flex;
  justify-content: space-between;
}
</style>
