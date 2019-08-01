<template lang="html">
  <div class="ajax-wrapper">
    <div class="ajax-loading load-status" v-show="showLoading">
      <div class="head-space"></div>
      <div class="loading-box">
        <div class="la-square-jelly-box">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="ajax-toast load-status" v-show="showToast">
      <div class="toast">
        <div class="la-line-spin-clockwise-fade">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showLoading: false,
      showToast: false
    }
  },
  // props: {
  //   showLoading: false,
  //   showToast: false
  // }
}
</script>
<style lang="css">
.loading-box {
  background: #f5f5f5;
  flex: 1;
  height: 100%;
}
.ajax-loading {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0);
}
.head-space {
  /* height: 4.4rem; */
}
.loading-box {
  color: #f5514d !important;
}
.ajax-loading .la-square-jelly-box {
  margin: -16px auto 0;
  position: relative;
  top: 50%;
}
.la-square-jelly-box,
.la-square-jelly-box > div {
  position: relative;
  box-sizing: border-box;
}

.la-square-jelly-box {
  display: block;
  font-size: 0;
  color: #fff;
}

.la-square-jelly-box.la-dark {
  color: #333;
}

.la-square-jelly-box > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.la-square-jelly-box {
  width: 32px;
  height: 32px;
}

.la-square-jelly-box > div:nth-child(1),
.la-square-jelly-box > div:nth-child(2) {
  position: absolute;
  left: 0;
  width: 100%;
}

.la-square-jelly-box > div:nth-child(1) {
  top: -25%;
  z-index: 1;
  height: 100%;
  border-radius: 10%;
  animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
}

.la-square-jelly-box > div:nth-child(2) {
  bottom: -9%;
  height: 10%;
  background: #000;
  border-radius: 50%;
  opacity: 0.2;
  animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
}

.la-square-jelly-box.la-sm {
  width: 16px;
  height: 16px;
}

.la-square-jelly-box.la-2x {
  width: 64px;
  height: 64px;
}

.la-square-jelly-box.la-3x {
  width: 96px;
  height: 96px;
}

@keyframes square-jelly-box-animate {
  17% {
    border-bottom-right-radius: 10%;
  }

  25% {
    -webkit-transform: translateY(25%) rotate(22.5deg);
    -moz-transform: translateY(25%) rotate(22.5deg);
    -o-transform: translateY(25%) rotate(22.5deg);
    transform: translateY(25%) rotate(22.5deg);
  }

  50% {
    border-bottom-right-radius: 100%;
    -webkit-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
    -moz-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
    -o-transform: translateY(50%) scale(1, 0.9) rotate(45deg);
    transform: translateY(50%) scale(1, 0.9) rotate(45deg);
  }

  75% {
    -webkit-transform: translateY(25%) rotate(67.5deg);
    -moz-transform: translateY(25%) rotate(67.5deg);
    -o-transform: translateY(25%) rotate(67.5deg);
    transform: translateY(25%) rotate(67.5deg);
  }

  100% {
    -webkit-transform: translateY(0) rotate(90deg);
    -moz-transform: translateY(0) rotate(90deg);
    -o-transform: translateY(0) rotate(90deg);
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes square-jelly-box-shadow {
  50% {
    -webkit-transform: scale(1.25, 1);
    -moz-transform: scale(1.25, 1);
    -o-transform: scale(1.25, 1);
    transform: scale(1.25, 1);
  }
}

/*!
 * Load Awesome
 */
.ajax-toast {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
}
.ajax-toast .toast {
  height: 120px;
  width: 120px;
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ajax-toast .la-line-spin-clockwise-fade {
  position: relative;
  text-align: center;
  height: 60px;
  width: 60px;
}
.la-line-spin-clockwise-fade,
.la-line-spin-clockwise-fade > div {
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.la-line-spin-clockwise-fade {
  display: block;
  font-size: 0;
  color: #fff;
}
.la-line-spin-clockwise-fade.la-dark {
  color: #333;
}
.la-line-spin-clockwise-fade > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}
.la-line-spin-clockwise-fade {
  width: 32px;
  height: 32px;
}
.la-line-spin-clockwise-fade > div {
  position: absolute;
  width: 3px;
  height: 10px;
  margin: 2px;
  margin-top: -5px;
  margin-left: -1px;
  border-radius: 0;
  animation: line-spin-clockwise-fade 1s infinite ease-in-out;
}
.la-line-spin-clockwise-fade > div:nth-child(1) {
  top: 15%;
  left: 50%;
  transform: rotate(0deg);
  animation-delay: -0.875s;
}
.la-line-spin-clockwise-fade > div:nth-child(2) {
  top: 25.2512626585%;
  left: 74.7487373415%;
  transform: rotate(45deg);
  animation-delay: -0.75s;
}
.la-line-spin-clockwise-fade > div:nth-child(3) {
  top: 50%;
  left: 85%;
  transform: rotate(90deg);
  animation-delay: -0.625s;
}
.la-line-spin-clockwise-fade > div:nth-child(4) {
  top: 74.7487373415%;
  left: 74.7487373415%;
  transform: rotate(135deg);
  animation-delay: -0.5s;
}
.la-line-spin-clockwise-fade > div:nth-child(5) {
  top: 84.9999999974%;
  left: 50.0000000004%;
  transform: rotate(180deg);
  animation-delay: -0.375s;
}
.la-line-spin-clockwise-fade > div:nth-child(6) {
  top: 74.7487369862%;
  left: 25.2512627193%;
  transform: rotate(225deg);
  animation-delay: -0.25s;
}
.la-line-spin-clockwise-fade > div:nth-child(7) {
  top: 49.9999806189%;
  left: 15.0000039834%;
  transform: rotate(270deg);
  animation-delay: -0.125s;
}
.la-line-spin-clockwise-fade > div:nth-child(8) {
  top: 25.2506949798%;
  left: 25.2513989292%;
  transform: rotate(315deg);
  animation-delay: 0s;
}
.la-line-spin-clockwise-fade.la-sm {
  width: 16px;
  height: 16px;
}
.la-line-spin-clockwise-fade.la-sm > div {
  width: 1px;
  height: 4px;
  margin-top: -2px;
  margin-left: 0;
}
.la-line-spin-clockwise-fade.la-2x {
  width: 64px;
  height: 64px;
}
.la-line-spin-clockwise-fade.la-2x > div {
  width: 4px;
  height: 20px;
  margin-top: -10px;
  margin-left: -2px;
}
.la-line-spin-clockwise-fade.la-3x {
  width: 96px;
  height: 96px;
}
.la-line-spin-clockwise-fade.la-3x > div {
  width: 6px;
  height: 30px;
  margin-top: -15px;
  margin-left: -3px;
}
/*
 * Animation
 */
@keyframes line-spin-clockwise-fade {
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>