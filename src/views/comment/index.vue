<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

        <el-table :data="commentList" style="width: 100%" stripe v-loading="isLoading">
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数">
          </el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scoped">
              {{scoped.row.comment_status?'正常':'关闭'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scoped">
              <el-button
              :type="scoped.row.comment_status?'danger':'success'"
              size="mini"
              @click="handleChangeCommentStatus(scoped.row)"
              :loading="scoped.row.isLoading"
              >
                {{scoped.row.comment_status?'关闭评论':'开启评论'}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="params.per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :disabled="isLoading"
          :total="totalCount">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { articleList } from '@/api/article'
import { changeCommentStatus } from '@/api/comment'
export default {
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      commentList: [], // 评论列表数据
      totalCount: 0, // 总评论数
      params: {
        page: 1,
        per_page: 10,
        response_type: 'comment'
      },
      isLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadCommentList()
  },
  mounted () {},
  methods: {
    // 加载评论数据
    loadCommentList () {
      this.isLoading = true
      articleList(this.params).then(({ data: res }) => {
        this.isLoading = false
        this.commentList = res.data.results.map(item => ({ ...item, isLoading: false }))
        this.totalCount = res.data.total_count
      }).catch(error => {
        this.isLoading = false
        console.log(error)
      })
    },

    // 修改评论状态
    handleChangeCommentStatus (row) {
      row.isLoading = true
      const allowComment = !row.comment_status
      const articleId = row.id + ''
      changeCommentStatus({ allow_comment: allowComment }, articleId).then(({ data: res }) => {
        this.$message.success(`${allowComment ? '开启评论' : '关闭评论'}成功`)
        this.loadCommentList()
      }).catch(error => {
        console.log(error)
      })
    },

    // 监听分页每页显示的记录数量变化函数
    handleSizeChange (e) {
      this.params.per_page = e
      this.loadCommentList()
    },
    // 监听分页页码变化的函数
    handleCurrentChange (e) {
      this.params.page = e
      this.loadCommentList()
    }
  }
}
</script>

<style scoped lang="less"></style>
