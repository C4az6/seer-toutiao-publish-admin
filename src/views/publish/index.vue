<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.channel_id" placeholder="请选择频道">
            <el-option
             :label="item.name"
             :value="item.id"
             v-for="(item, index) of channels"
             :key="index"
             ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publishArticleRequest()">发布文章</el-button>
          <el-button @click="publishArticleRequest(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { articleChannel, publishArticle } from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [] // 频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleChannel()
  },
  mounted () {},
  methods: {
    // 获取频道数据函数
    loadArticleChannel () {
      articleChannel().then(({ data: { data: { channels: res } } }) => {
        console.log('频道数据', res)
        this.channels = res
      }).catch(error => {
        console.log(error)
      })
    },
    // 发布文章函数
    publishArticleRequest (draft = false) {
      publishArticle(this.form, draft).then(({ data: res }) => {
        this.$message({
          type: 'success',
          message: draft ? '存入草稿成功' : '发布文章成功'
        })
        this.$router.push({ name: 'article' })
      }).catch(error => {
        console.log(error)
        this.$message.error('服务器异常,请重试')
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
