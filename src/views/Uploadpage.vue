<template>
  <div>
    <el-upload ref="upload" class="avatar-uploader" :action="doUpload()" accept="image/jpeg,image/gif,image/png,image/bmp" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <template v-if="upload_url">
        <img :src="upload_url" class="avatar">
        <div class="avatar-list-icon" v-on:click.stop>
          <span @click="handlePictureCardPreview"><i class="el-icon-zoom-in"></i></span>
          <span @click="doThis"><i class="el-icon-delete"></i></span>
        </div>
      </template>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <template v-if="upload_url">
      <el-button size="small" type="primary" @click="up">点击上传</el-button>
      <el-button size="small" type="danger" @click="del">点击删除</el-button>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      upload_url: '',//上传URL
      dialogImageUrl: '',
      file: '',
      dialogVisible: false
    }
  },
  methods: {
    handlePictureCardPreview() {
      this.dialogImageUrl = this.upload_url
      // console.log(this.$refs.upload.uploadFiles[0].raw)
      this.dialogVisible = true;
    },
    doThis() {
      this.$message({
        message: '删除图片成功！',
        type: 'success'
      })
      this.upload_url = ''
      this.file = ''
    },
    doUpload() {
      return '/admin/upload.php'
    },
    del() {
      var params = 'ajax=' + encodeURIComponent(JSON.stringify(this.file));
      this.$axios.post('/admin/unupload.php', params).then(res => {
        if (res.data.status) {
          this.$message({
            message: '删除图片成功！',
            type: 'success'
          })
          this.upload_url = ''
          this.file = ''
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        this.$message({
          message: '系统出错，请重试！',
          type: 'warning'
        })
      })
    },
    up() {
      var formdata = new FormData()
      formdata.append('file', this.file)
      let obj = {}
      for (let key in this.file) {
        obj[key] = this.file[key]
      }
      this.$axios({
        url: '/admin/upload.php',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        if (res.data.status) {
          obj.name = res.data.msg
          this.file = obj
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      }).catch(err => {
        this.$message({
          message: '系统出错，请重试！',
          type: 'warning'
        })
      })
    },
    handleAvatarSuccess(res, file) {
      this.upload_url = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG, PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.file = file
      return (isJPG || isPNG) && isLt2M
    }
  }
}
</script>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-list-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  display: -webkit-flex;
  display: -webkit-inline-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  font-size: 26px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
  span {
    position: static;
    display: none;
    font-size: 20px;
    cursor: pointer;
    & + span {
      margin-left: 15px;
    }
  }
  &:hover {
    opacity: 1;
    span {
      display: inline-block;
    }
  }
}
</style>
