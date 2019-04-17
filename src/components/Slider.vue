
<template>
  <div id="slider" ref="slider">
    <div class="window" @mouseover="stop" @mouseleave="play">
      <ul class="container" :style="containerStyle">
        <li>
          <img :src="sliders[sliders.length - 1]" alt="">
        </li>
        <li v-for="(item, index) in sliders" :key="index">
          <img :src="item" alt="">
        </li>
        <li>
          <img :src="sliders[0]" alt="">
        </li>
      </ul>
      <ul class="direction">
        <li class="left" @click="move(width, 1, speed)">
          <svg class="icon" width="30" height="30" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z" /></svg>
        </li>
        <li class="right" @click="move(width, -1, speed)">
          <svg class="icon" width="30" height="30" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z" /></svg>
        </li>
      </ul>
      <ul class="dots">
        <li v-for="(dot, i) in sliders" :key="i" :class="{dotted: i === (currentIndex-1)}" @click=jump(i+1)>
        </li>
      </ul>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'slider',
  props: {
    initialSpeed: {
      type: Number,
      default: 30
    },
    initialInterval: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      sliders: [require('@a/img/b1.jpg'), require('@a/img/b2.jpg'), require('@a/img/b3.jpg')],
      currentIndex: 1,
      distance: -750,
      transitionEnd: true,
      speed: this.initialSpeed,
      width: 750,
      total: 3
    }
  },
  computed: {
    containerStyle() {
      return {
        width: `${this.width * (this.total + 2)}px`,
        transform: `translate3d(${this.distance}px, 0, 0)`
      }
    },
    interval() {
      return this.initialInterval * 1000
    }
  },
  mounted() {
    this.total = this.sliders.length
    this.$nextTick(() => {
      this.width = this.$refs.slider.offsetWidth
      this.distance = -this.$refs.slider.offsetWidth
    })
    this.init()
  },
  methods: {
    init() {
      this.play()
      window.onblur = function () { this.stop() }.bind(this)
      window.onfocus = function () { this.play() }.bind(this)
    },
    move(offset, direction, speed) {
      if (!this.transitionEnd) return
      this.transitionEnd = false
      direction === -1 ? this.currentIndex += offset / this.width : this.currentIndex -= offset / this.width
      if (this.currentIndex > this.total) this.currentIndex = 1
      if (this.currentIndex < 1) this.currentIndex = this.total

      const destination = this.distance + offset * direction
      this.animate(destination, direction, speed)
    },
    animate(des, direc, speed) {
      if (this.temp) {
        window.clearInterval(this.temp)
        this.temp = null
      }
      this.temp = window.setInterval(() => {
        if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
          this.distance += speed * direc
        } else {
          this.transitionEnd = true
          window.clearInterval(this.temp)
          this.distance = des
          if (des < -this.total * this.width) this.distance = -this.width
          if (des > -this.width) this.distance = -this.total * this.width
        }
      }, 20)
    },
    jump(index) {
      const direction = index - this.currentIndex >= 0 ? -1 : 1
      const offset = Math.abs(index - this.currentIndex) * this.width
      const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed
      this.move(offset, direction, jumpSpeed)
    },
    play() {
      if (this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
      }
      this.timer = window.setInterval(() => {
        this.move(this.width, -1, this.speed)
      }, this.interval)
    },
    stop() {
      window.clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>
<style lang="less" scoped>
#slider,
.window {
  position: relative;
  width: 100%;
  height: 100%;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.container {
  overflow: hidden;
  height: 100%;
  display: flex;
  li {
    flex: 1;
  }
}
.dots {
  position: absolute;
  width: 100%;
  bottom: 30px;
  text-align: center;
  li {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.5);
    border: solid 1px #fff;
    border-radius: 50%;
    &.dotted {
      background-color: rgba(255, 102, 0, 0.5);
    }
  }
}
.direction {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  margin-top: -25px;
  li {
    position: absolute;
    width: 50px;
    height: 50px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    .icon {
      margin-top: 10px;
    }
  }
  .left {
    left: 0;
    .icon {
      margin-left: 10px;
    }
  }
  .right {
    right: 0;
    .icon {
      margin-right: 10px;
    }
  }
}
</style>
