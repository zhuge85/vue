<template>
  <div v-highlight>
    <h1>{{ msg }}</h1>
    <el-button @click="fetch" type="primary">获取mixmsg的值</el-button>
    <pre><code>// mixins.js
export const mixObj = {
  data() {
    return {
      mixmsg: 'Message from Mixin Object',
      imglist: [
        require('@a/img/a1.jpg'),
        require('@a/img/a2.jpg'),
        require('@a/img/a3.jpg'),
        require('@a/img/a4.jpg'),
        require('@a/img/a5.jpg'),
        require('@a/img/a6.jpg'),
        require('@a/img/a7.jpg'),
        require('@a/img/a8.jpg'),
        require('@a/img/a9.jpg'),
        require('@a/img/a10.jpg'),
        require('@a/img/a11.jpg'),
        require('@a/img/a12.jpg')
      ]
    }
  },
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log(`Hello from Mixin`)
    }
  }
}
export const minObjAnother = {
  created() {
    this.prompt()
  },
  methods: {
    prompt() {
      console.log(`Prompt from Mixin Another`)
    }
  }
}

// 调用

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
</code></pre>
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
