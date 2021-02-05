<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="setting-wrap">
        <el-row>
          <el-col :span="12">
            <!-- 左侧表单部分 start -->
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="编号"> 1 </el-form-item>
              <el-form-item label="手机"> 13911111111 </el-form-item>
              <el-form-item label="媒体名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="primary" @click="onSubmit"
                  >保存设置</el-button
                >
              </el-form-item>
            </el-form>
            <!-- 左侧表单部分 end -->
          </el-col>
          <el-col :span="6" :offset="2">
            <!-- 右侧头像部分 start -->
            <div class="upload-avatar-wrap">
            <label for="file">
              <el-avatar
                shape="square"
                class="avatar-wrap"
                :size="180"
                fit="full"
                src="http://toutiao-img.itheima.net/Fmq1DWCY6OFoy5XgcMUTeZbDTOOu"
              ></el-avatar>
            </label>
            <input type="file" id="file" ref="file" hidden @change="handleUploadAvatar" />
            <p>修改头像</p>
            <el-dialog
              title="提示"
              :visible.sync="avatarDialogVisible"
              width="30%"
              append-to-body
              >
              <el-image
                style="width: px; height: 100px"
                :src="imgUrl"
                fit="cover"></el-image>
              <span slot="footer" class="dialog-footer">
                <el-button @click="avatarDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="avatarDialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            </div>
            <!-- 右侧头像部分 end -->
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SettingIndex',
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
        resource: '',
        desc: ''
      },
      avatarDialogVisible: false, // 修改头像弹窗
      imgUrl: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    // 用户修改头像处理函数
    handleUploadAvatar (e) {
      const blobData = window.URL.createObjectURL(e.target.files[0])
      console.log(blobData)
      this.imgUrl = blobData
      // 弹出dialog
      this.avatarDialogVisible = true
    }
  }
}
</script>

<style scoped lang="less">
.upload-avatar-wrap {
  text-align: center;
}
.avatar-wrap {
  border: 1px dashed #d9d9d9;
  &:hover {
    border-color: rgb(64, 158, 255);
  }
}

</style>
