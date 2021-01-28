<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            $route.query.id ? "编辑文章" : "发布文章"
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-form label-width="80px" :model="article" ref="articleForm" :rules="articleRules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap
           v-model="article.content"
           lang="zh"
           :extensions="extensions"
           height="500px"
           placeholder='写点什么...'
           ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) of channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            @click="publishArticleRequest()"
            >{{ $route.query.id ? "编辑文章" : "发布文章" }}</el-button
          >
          <el-button size="small" @click="publishArticleRequest(true)"
            >存入草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  articleChannel,
  publishArticle,
  getArticleInfo,
  editArticle
} from '@/api/article'
import { uploadImage } from '@/api/material'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock
} from 'element-tiptap'

import 'element-tiptap/lib/index.css'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: false }), // 在气泡菜单中渲染菜单按钮
        new Image({
          // 自定义图片上传函数 返回Promise
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            // 这里 return 是返回 Promise 对象
            return uploadImage(fd).then(({ data: res }) => {
              // 这个 return 是返回最后的结果
              return res.data.url
            })
          }
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock()
      ],
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [], // 频道列表
      articleRules: { // 表单校验规则
        title: [
          { required: true, message: '标题必填', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'change' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleChannel()
    const {
      query: { id }
    } = this.$route
    if (id) {
      console.log('编辑文章')
      getArticleInfo(id)
        .then(({ data: res }) => {
          console.log(res)
          this.article = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {},
  methods: {
    // 获取频道数据函数
    loadArticleChannel () {
      articleChannel()
        .then(
          ({
            data: {
              data: { channels: res }
            }
          }) => {
            this.channels = res
          }
        )
        .catch((error) => {
          console.log(error)
        })
    },
    // 发布文章函数
    publishArticleRequest (draft = false) {
      // 表单验证
      this.$refs.articleForm.validate(callback => {
        if (!callback) {
          return false
        }
        if (this.$route.query.id) {
        // 编辑文章
          editArticle(this.article, this.$route.query.id, draft)
            .then(({ data: res }) => {
              this.$message({
                type: 'success',
                message: draft ? '存入草稿成功' : '编辑文章成功'
              })
              this.$router.push({ name: 'article' })
            })
            .catch((error) => {
              console.log(error)
              this.$message.error('服务器异常,请重试')
            })
          return
        }
        publishArticle(this.article, draft)
          .then(({ data: res }) => {
            this.$message({
              type: 'success',
              message: draft ? '存入草稿成功' : '发布文章成功'
            })
            this.$router.push({ name: 'article' })
          })
          .catch((error) => {
            console.log(error)
            this.$message.error('服务器异常,请重试')
          })
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
