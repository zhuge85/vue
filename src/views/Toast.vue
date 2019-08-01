<template>
  <div>
    <p>自定义消息组件</p>
    <el-button @click="msg(0)" type="info">消息提示</el-button>
    <el-button @click="msg(1)" type="success">成功提示</el-button>
    <el-button @click="msg(2)" type="warning">警告提示</el-button>
    <el-button @click="msg(3)" type="danger">错误提示</el-button>
    <el-button @click="msg2()" type="success">全局调用</el-button>
    <p>自定义toast</p>
    <el-button @click="toast" type="primary">原型调用</el-button>
    <el-button @click="globaltoast" type="primary">全局调用</el-button>
    <p>自定义提示框</p>
    <el-button type="primary" @click.stop="msgbox">msgbox</el-button>
    <p>自定义弹框</p>
    <el-button type="primary" @click.stop="dialog">dialog</el-button>
    <p>自定义全局loading</p>
    <el-button type="primary" @click.stop="msg4">loading</el-button>
    <el-button type="primary" @click.stop="msg5">loading</el-button>

    <div class="wrap">
      <div class="cube">
        <div class="out_front"><img src="@a/img/lang.jpg" class="pic"></div>
        <div class="out_back"><img src="@a/img/lang.jpg" class="pic"></div>
        <div class="out_left"><img src="@a/img/lang.jpg" class="pic"></div>
        <div class="out_right"><img src="@a/img/lang.jpg" class="pic"></div>
        <div class="out_top"><img src="@a/img/lang.jpg" class="pic"></div>
        <div class="out_bottom"><img src="@a/img/lang.jpg" class="pic"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from '../plugins/toast'
import { Message } from '../plugins/message'
export default {
  data() {
    return {
      msgType: {
        0: 'info',
        1: 'success',
        2: 'warning',
        3: 'error'
      },
      type: 0,
      list: [
        {
          id: 1,
          title: '活动名称',
          require: true,
          type: 'text',
          value: ''
        },
        {
          id: 2,
          title: '活动名称',
          type: 'password',
          value: ''
        },
        {
          id: 3,
          title: '活动区域',
          type: 'select',
          value: 1,
          arr: [
            {
              id: 1,
              title: '区域一'
            },
            {
              id: 2,
              title: '区域二'
            },
            {
              id: 3,
              title: '区域三'
            }
          ]
        },
        {
          id: 4,
          title: '活动形式',
          type: 'textarea',
          value: ''
        },
        {
          id: 5,
          title: '活动性质',
          type: 'checkbox',
          value: [],
          arr: [
            {
              id: 1,
              title: '美食/餐厅线上活动',
              checked: false
            },
            {
              id: 2,
              title: '地推活动',
              checked: false
            },
            {
              id: 3,
              title: '线下主题活动',
              checked: false
            },
            {
              id: 4,
              title: '线下场地免费',
              checked: false
            }
          ]
        },
        {
          id: 6,
          title: '线上品牌商赞助',
          type: 'radio',
          value: '',
          arr: [
            {
              id: 1,
              title: '线上品牌商赞助'
            },
            {
              id: 2,
              title: '线下场地免费'
            }
          ]
        }
      ]
    }
  },
  created() {

  },
  methods: {
    msg(type) {
      if (!type) {
        type = this.type % 4
        this.type++
      }
      this.$zhumessage('自定义消息提示组件', this.msgType[type])
    },
    msg2() {
      this.type = this.type % 4
      Message('全局调用', this.msgType[this.type])
      this.type++
    },
    toast() {
      this.$toast({
        message: "原型调用，自定义时间",
        time: 2000
      });
    },
    globaltoast() {
      Toast({
        message: "全局调用",
        time: 5000
      });
    },
    msgbox() {
      this.$msgbox({
        title: '温馨提示',
        cancel: '取消',
        confirm: '确定按钮',
        content: '这里是消息弹出内容',
        className: 'pop-custom'
      }).then(() => {
        console.log("我点击了确定按钮")
      }).catch((err) => {
        console.log("点击取消");
      })
    },
    dialog() {
      this.$dialog({
        title: '温馨提示',
        cancel: '取消按钮',
        confirm: '确定按钮',
        content: this.list,
        className: 'pop-custom-22222'
      }).then((res) => {
        Object.keys(this.list).forEach(item => {
          if (this.list[item].type === 'checkbox') {
            this.list[item].value = this.list[item].arr.filter(val => val.checked).map(val => val.id)
          }
        })
        console.log('我点击了确定按钮')
      }).catch((err) => {
        console.log("点击取消");
      })
    },
    msg4() {
      this.$loading.show('loading')
      setTimeout(() => {
        this.$loading.hide()
      }, 3000);
    },
    msg5() {
      this.$loading.show('toast')
      setTimeout(() => {
        this.$loading.hide()
      }, 3000);
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  width: 120px;
  height: 200px;
  margin: 50px;
  position: fixed;
  top: 100px;
  right: 100px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  z-index: 22;
}

.cube {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(-80deg);
  animation: rotate linear 20s infinite;
  div {
    position: absolute;
    width: 120px;
    height: 120px;
    opacity: 0.8;
    transition: all 0.4s;
    // img {
    // width: 100%;
    // }
  }

  .out_front {
    transform: rotateY(0deg) translateZ(60px);
  }

  .out_back {
    transform: translateZ(-60px) rotateY(180deg);
  }

  .out_left {
    transform: rotateY(-90deg) translateZ(60px);
  }

  .out_right {
    transform: rotateY(90deg) translateZ(60px);
  }

  .out_top {
    transform: rotateX(90deg) translateZ(60px);
  }

  .out_bottom {
    transform: rotateX(-90deg) translateZ(60px);
  }
}

@keyframes rotate {
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
</style>
