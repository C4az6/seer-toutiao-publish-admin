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
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="开发者资讯" value="shanghai"></el-option>
            <el-option label="ios" value="beijing"></el-option>
            <el-option label="c++" value="beijing"></el-option>
            <el-option label="android" value="beijing"></el-option>
            <el-option label="css" value="beijing"></el-option>
            <el-option label="数据库" value="beijing"></el-option>
            <el-option label="区块链" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- form表单部分 end -->
    </el-card>

    <!-- 数据列表部分 start -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 {{articleTotal}} 条结果：</span>
      </div>
      <el-table
        :data="articleList"
        style="width: 100%"
        stripe
        border
        size="medium"
        type=index
        >
      <el-table-column
        align="center"
        label="#"
        type="index">
      </el-table-column>
        <el-table-column
        align="center"
          prop="date"
          label="封面"
          width="180">
        </el-table-column>
        <el-table-column
        align="center"
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          align="center"
          width="120px"
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatusList[scope.row.status].type">{{ articleStatusList[scope.row.status].name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="pubdate"
          width="300px"
          label="发布时间">
        </el-table-column>
        <el-table-column
          align="center"
          width="300px"
          label="操作">
           <template>
            <el-button
              type="primary"
              plain
              circle
              icon="el-icon-edit"
              @click="handleEdit"></el-button>
            <el-button
              type="danger"
              plain
              circle
              icon="el-icon-delete"
              @click="handleDelete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="article-pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-card>
    <!-- 数据列表部分 end -->
  </div>
</template>

<script>
import { articleList } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '全部',
        desc: ''
      },
      value1: '',
      articleList: [], // article dataset
      articleTotal: 0, // article dataset total count
      currentPage4: 4,
      articleStatusList: [ // 文章状态列表
        { status: 0, name: '草稿', type: 'info' },
        { status: 1, name: '待审核', type: 'primary' },
        { status: 2, name: '审核通过', type: 'success' },
        { status: 3, name: '审核失败', type: 'warning' },
        { status: 4, name: '已删除', type: 'danger' }
      ]
    }
  },
  filters: {
    // 文章审核状态过滤器
    /*     auditStatus: value => {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
        default:
          return '未知'
      }
    } */
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleList()
  },
  mounted () {},
  methods: {
    // 编辑文章
    handleEdit () {
      console.log('edit button click...')
    },

    handleDelete () {
      console.log('delete button click...')
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 获取文章列表数据
    getArticleList () {
      articleList().then(({ data: res }) => {
        this.articleList = res.data.results
        this.articleTotal = res.data.total_count
      }).catch(error => {
        console.log(error)
      })
    },

    // 筛选按钮事件处理函数
    onSubmit () {
      console.log('submit')
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
    text-align: right;
  }
</style>
