<template>
  <div>
    <p>{{ index }}</p>
    <div class="banner">
      <img v-for="(item, i) in img" :src="item" :key="i" v-show="i === index" />
      <ul>
        <li v-for="(item, i) in img" :src="item" :key="i" :class="i === index ? 'on' : ''"></li>
      </ul>
    </div>
    <div class="banner">
      <Slider></Slider>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      // img: [a, b, c],
      img: [require('@a/img/b1.jpg'), require('@a/img/b2.jpg'), require('@a/img/b3.jpg')],
      index: 0,
      timer: null,
      moveLeft: false,
      scrollside: ''
    }
  },
  components: {
    Slider: resolve => require(['@c/Slider'], resolve)
  },
  methods: {
    play() {
      this.timer = setInterval(this.changeIndex, 2500)
    },
    changeIndex() {
      this.index++;
      if (this.index === this.img.length) {
        this.index = 0
      }
    },

    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = document.querySelector('.blog-sidebar').offsetTop
      var element = document.getElementsByClassName('blog-sidebar')[0];
      // console.log(scrollTop)
      if (scrollTop > offsetTop) {
        this.scrollside = true
        element.classList.add('col-sm-3');
      } else {
        this.scrollside = false
        element.classList.remove("col-sm-3");
      }
    },
  },
  created() {
    this.play();
  },
  mounted() {
    this.$nextTick(() => {

    })
    // window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    // window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="less" scoped>
.banner {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  width: 750px;
  height: 378px;
  ul {
    position: absolute;
    bottom: 10px;
    width: 100%;
    padding: 0;
    list-style: none;
    text-align: center;
  }
  li {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    display: inline-block;
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    &.on {
      background: rgba(60, 60, 60, 1);
    }
  }
}
</style>
