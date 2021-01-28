<template>
  <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑部分 start -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑部分 end -->
      </div>

      <!-- form表单部分 stat -->
      <el-form ref="form" :model="form" label-width="40px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.channelId" placeholder="请选择">
            <el-option label="全部" :value="null"
            ></el-option>
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in channelList"
            :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.dateList"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="isLoading">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- form表单部分 end -->
    </el-card>

    <!-- 数据列表部分 start -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 {{ articleTotal }} 条结果：</span>
      </div>
      <el-table
        :data="articleList"
        style="width: 100%"
        stripe
        border
        size="medium"
        type="index"
        v-loading="isLoading"
      >
        <el-table-column align="center" label="#" type="index">
        </el-table-column>
        <el-table-column align="center" label="封面" width="180">
          <template slot-scope="scope">
            <el-image
              style="width: 150px; height: 100px"
              :src="scope.row.cover.images[0]"
              lazy
              :preview-src-list="scope.row.cover.images"
              fit="cover"
            >
              <!-- 占位内容 -->
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
              <!-- 加载失败内容 -->
              <div slot="error" class="image-slot">
                <img
                  class="article-error-cover"
                  src="./error.3f7b1f94.gif"
                  alt="error"
                />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="title" label="标题">
        </el-table-column>
        <el-table-column align="center" width="120px" label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatusList[scope.row.status].type">{{
              articleStatusList[scope.row.status].name
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="pubdate"
          width="300px"
          label="发布时间"
        >
        </el-table-column>
        <el-table-column align="center" width="300px" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              circle
              icon="el-icon-edit"
              @click="$router.push(`/publish?id=${scope.row.id}`)"
            ></el-button>
            <el-button
              type="danger"
              plain
              circle
              icon="el-icon-delete"
              @click="handleDelete(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="article-pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articleTotal"
        :disabled="isLoading"
      >
      </el-pagination>
    </el-card>
    <!-- 数据列表部分 end -->
  </div>
</template>

<script>
import { articleList, articleChannel, deleteArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        dateList: null, // 日期
        status: null, // 文章状态
        channelId: null // 文章频道ID
      },
      articleList: [], // article dataset
      articleTotal: 0, // article dataset total count
      currentPage: 1,
      articleStatusList: [ // 文章状态列表
        { status: 0, name: '草稿', type: 'info' },
        { status: 1, name: '待审核', type: 'primary' },
        { status: 2, name: '审核通过', type: 'success' },
        { status: 3, name: '审核失败', type: 'warning' },
        { status: 4, name: '已删除', type: 'danger' }
      ],
      isLoading: false,
      pages: { // 分页参数对象
        page: 1, // 页码，默认值1
        per_page: 10 // 默认每页显示的纪录数
      },
      channelList: [] // 文章频道列表数据
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleList()
    this.getArticleChannel()
  },
  mounted () {},
  methods: {
    // 获取文章频道数据函数
    getArticleChannel () {
      articleChannel().then(({ data: res }) => {
        this.channelList = res.data.channels
      }).catch(error => { console.log(error) })
    },
    // 删除文章事件函数
    handleDelete (id) {
      console.log(`删除的文章ID: ${id}`)
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(id).then(({ data: res }) => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getArticleList()
        }).catch(error => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '删除失败,服务器异常!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 每页显示记录数变化的事件函数
    handleSizeChange (val) {
      this.pages.per_page = val
      this.getArticleList()
    },
    // 页码变化的事件函数
    handleCurrentChange (val) {
      this.pages.page = val
      this.getArticleList()
    },
    // 获取文章列表数据函数
    getArticleList () {
      this.isLoading = true
      articleList(this.pages)
        .then(({ data: res }) => {
          console.log(res)
          this.isLoading = false
          this.articleList = res.data.results
          this.articleTotal = res.data.total_count
        })
        .catch((error) => {
          this.isLoading = false
          console.log(error)
        })
    },

    // 筛选按钮事件函数
    onSubmit () {
      this.pages.status = this.form.status
      this.pages.channel_id = this.form.channelId
      this.pages.begin_pubdate = this.form.dateList ? this.form.dateList[0] : null
      this.pages.end_pubdate = this.form.dateList ? this.form.dateList[1] : null
      this.getArticleList()
    }
  }
}
</script>

<style scoped lang="less">
.article-container .box-card:nth-child(1) {
  margin-bottom: 20px;
}

.article-pagination {
  margin-top: 20px;
}

.article-error-cover {
  width: 100%;
}
/* deep 穿透修改element-ui的组件样式 */
/deep/ .el-icon-circle-close {
  color: lightblue;
}
</style>
