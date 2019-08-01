<template>
  <transition name="fade">
    <div class="message" :class="'message-' + type" v-if="visible">
      <i class="icon-iconfont" :class="'icon-' + type"></i>
      <div class="content">{{content}}
        <i v-if="hasClose" class="btn-close iconfont icon-close" @click="visible=false"></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MyMessage",
  data() {
    return {
      content: '',
      time: 5000,
      visible: false,
      type: 'info',//'success','warning','error'
      hasClose: false,
    }
  },
  mounted() {
    this.close()
  },
  methods: {
    close() {
      window.setTimeout(() => {
        this.visible = false
      }, this.time - 1250);
      window.setTimeout(() => {
        this.$el.parentNode.removeChild(this.$el);
      }, this.time)
    }
  }
}
</script>
<style lang="less">
.message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity 0.2s, transform 0.3s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -150%);
}
.message-info {
  .content {
    color: #909399;
  }
}
.message-success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  .content {
    color: #67c23a;
  }
}
.message-warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
  .content {
    color: #e6a23c;
  }
}
.message-error {
  background-color: #fef0f0;
  border-color: #fde2e2;
  .content {
    color: #f56c6c;
  }
}
.icon-iconfont {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  background-size: 100%;
}
.icon-info {
  background-image: url('data:image/svg+xml;%20charset=utf8,%3C?xml%20version=%221.0%22%20standalone=%22no%22?%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-//W3C//DTD%20SVG%201.1//EN%22%20%22http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd%22%3E%3Csvg%20t=%221557748000156%22%20class=%22icon%22%20style=%22%22%20viewBox=%220%200%201024%201024%22%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20p-id=%229100%22%20xmlns:xlink=%22http://www.w3.org/1999/xlink%22%20width=%22200%22%20height=%22200%22%3E%3Cdefs%3E%3Cstyle%20type=%22text/css%22%3E%3C/style%3E%3C/defs%3E%3Cpath%20d=%22M512%2064C264.6%2064%2064%20264.6%2064%20512s200.6%20448%20448%20448%20448-200.6%20448-448S759.4%2064%20512%2064z%20m84%20343.1l-87%20301.4c-4.8%2017.2-7.2%2028.6-7.2%2033.9%200%203.1%201.3%206%203.8%208.7s5.2%204%208.1%204c4.8%200%209.6-2.1%2014.4-6.4%2012.7-10.5%2028-29.4%2045.8-56.8l14.4%208.5c-42.7%2074.4-88%20111.6-136.1%20111.6-18.4%200-33-5.2-43.9-15.5-10.9-10.3-16.3-23.4-16.3-39.2%200-10.5%202.4-23.7%207.2-39.9l58.9-202.7c5.7-19.5%208.5-34.2%208.5-44.1%200-6.2-2.7-11.7-8.1-16.5-5.4-4.8-12.7-7.2-22-7.2-4.2%200-9.3%200.1-15.3%200.4l5.5-17L570.4%20407H596v0.1z%20m17.8-88.7c-12.2%2012.2-26.9%2018.2-44.1%2018.2-17%200-31.5-6.1-43.7-18.2-12.2-12.2-18.2-26.9-18.2-44.1s6-31.9%2018-44.1c12-12.1%2026.6-18.2%2043.9-18.2%2017.5%200%2032.3%206.1%2044.3%2018.2%2012%2012.2%2018%2026.9%2018%2044.1s-6.1%2031.9-18.2%2044.1z%22%20p-id=%229101%22%20fill=%22#909399%22%3E%3C/path%3E%3C/svg%3E');
}
.icon-success {
  background-image: url('data:image/svg+xml;%20charset=utf8,%3C?xml%20version=%221.0%22%20standalone=%22no%22?%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-//W3C//DTD%20SVG%201.1//EN%22%20%22http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd%22%3E%3Csvg%20t=%221557749035630%22%20class=%22icon%22%20style=%22%22%20viewBox=%220%200%201024%201024%22%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20p-id=%2217398%22%20xmlns:xlink=%22http://www.w3.org/1999/xlink%22%20width=%22200%22%20height=%22200%22%3E%3Cdefs%3E%3Cstyle%20type=%22text/css%22%3E%3C/style%3E%3C/defs%3E%3Cpath%20d=%22M512.697383%2063.443961c-247.539816%200-448.208115%20200.668299-448.208115%20448.208115%200%20247.539816%20200.668299%20448.208115%20448.208115%20448.208115%20247.539816%200%20448.208115-200.668299%20448.208115-448.208115C960.905498%20264.11226%20760.237199%2063.443961%20512.697383%2063.443961zM782.650675%20386.324696%20472.510102%20703.184297c-1.057075%201.586125-2.233877%203.100618-3.620457%204.504594-12.155854%2012.346189-31.861662%2012.346189-44.025703%200L270.811334%20551.265282c-12.146645-12.347213-12.146645-32.354895%200-44.683688%2012.154831-12.347213%2031.860638-12.347213%2044.016493%200L446.411701%20640.173195l292.213271-298.549583c12.165064-12.346189%2031.861662-12.346189%2044.025703%200C794.797319%20353.9698%20794.797319%20373.97646%20782.650675%20386.324696z%22%20p-id=%2217399%22%20fill=%22#67c23a%22%3E%3C/path%3E%3C/svg%3E');
}
.icon-warning {
  background-image: url('data:image/svg+xml;%20charset=utf8,%3C?xml%20version=%221.0%22%20standalone=%22no%22?%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-//W3C//DTD%20SVG%201.1//EN%22%20%22http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd%22%3E%3Csvg%20t=%221557748874835%22%20class=%22icon%22%20style=%22%22%20viewBox=%220%200%201024%201024%22%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20p-id=%2212873%22%20xmlns:xlink=%22http://www.w3.org/1999/xlink%22%20width=%22200%22%20height=%22200%22%3E%3Cdefs%3E%3Cstyle%20type=%22text/css%22%3E%3C/style%3E%3C/defs%3E%3Cpath%20d=%22M510.9%2074.6c-243%200-440%20197-440%20440s197%20440%20440%20440%20440-197%20440-440-196.9-440-440-440z%20m0.7%20706.8c-24.3%200-44-19.7-44-44s19.7-44%2044-44%2044%2019.7%2044%2044-19.7%2044-44%2044z%20m69.3-475.7v0.2c-0.1%206.1-1%2012-2.5%2017.6L539%20596.4c0%2015.5-12.5%2028-28%2028s-28-12.5-28-28l-39.4-272.9c-1.6-5.6-2.4-11.5-2.5-17.6v-0.2-1c0-38.7%2031.3-70%2070-70s70%2031.3%2070%2070c-0.2%200.3-0.2%200.6-0.2%201z%22%20p-id=%2212874%22%20fill=%22#e6a23c%22%3E%3C/path%3E%3C/svg%3E');
}
.icon-error {
  background-image: url('data:image/svg+xml;%20charset=utf8,%3C?xml%20version=%221.0%22%20standalone=%22no%22?%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-//W3C//DTD%20SVG%201.1//EN%22%20%22http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd%22%3E%3Csvg%20t=%221557749390699%22%20class=%22icon%22%20style=%22%22%20viewBox=%220%200%201024%201024%22%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20p-id=%2218413%22%20xmlns:xlink=%22http://www.w3.org/1999/xlink%22%20width=%22200%22%20height=%22200%22%3E%3Cdefs%3E%3Cstyle%20type=%22text/css%22%3E%3C/style%3E%3C/defs%3E%3Cpath%20d=%22M664.96%20630.4a32%2032%200%200%201-22.4%2054.72%2032%2032%200%200%201-22.72-9.28L506.56%20562.56%20393.6%20675.84a32%2032%200%200%201-22.72%209.28%2032%2032%200%200%201-22.72-9.28%2032%2032%200%200%201%200-45.44l113.28-112.96-113.28-113.28a32%2032%200%200%201%200-45.12%2032%2032%200%200%201%2045.44%200L506.56%20472l113.28-112.96a32%2032%200%201%201%2045.12%2045.12L552%20517.44zM512%2064a448%20448%200%201%200%20448%20448A448%20448%200%200%200%20512%2064z%22%20p-id=%2218414%22%20fill=%22#f56c6c%22%3E%3C/path%3E%3C/svg%3E');
}
</style>
