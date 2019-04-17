<template>
  <div>
    <h1>{{ msg }}</h1>
    <el-button @click="fetch" type="primary">获取mixmsg的值</el-button>
    <ul class="imglist">
      <li v-for="(img, i) in imglist" :key="i">
        <img v-lazy="img" alt="i" @click="handlePictureCardPreview(img)">
      </li>
    </ul>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { mixObj, minObjAnother } from '@/mixins'
export default {
  data() {
    return {
      msg: 'Vue中的Mixins',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mixins: [mixObj, minObjAnother],
  created() {
    console.log(this.imglist)
    // this.hello()
  },
  methods: {
    fetch() {
      this.$message.success(this.mixmsg)
    },
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true;
    },
  }
}
</script>
<style lang="less" scoped>
.imglist {
  width: 300px;
  margin: 0 auto;
  list-style: none;
  li {
    width: 300px;
    height: 300px;
    margin-bottom: 40px;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
