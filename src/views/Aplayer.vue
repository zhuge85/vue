<template>
  <aplayer :volume=".5" :list="list" :music="music" theme='pic'></aplayer>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          title: '情动',
          artist: 'Cha Cha',
          src: 'http://www.zhujianbo.cn/mp3/qd.mp3',
          pic: 'http://www.zhujianbo.cn/images/a9.jpg',
        },
        {
          title: '月中天',
          artist: '殷馨梓',
          src: 'http://www.zhujianbo.cn/mp3/yzt.mp3',
          pic: 'http://www.zhujianbo.cn/images/a3.jpg',
        },
        {
          title: '一袖云',
          artist: '刘珂矣',
          src: 'http://www.zhujianbo.cn/mp3/yxy.mp3',
          pic: 'http://www.zhujianbo.cn/images/a4.jpg',
        },
        {
          title: '水龙吟',
          artist: 'HITA',
          src: 'http://www.zhujianbo.cn/mp3/sly.mp3',
          pic: 'http://www.zhujianbo.cn/images/a1.jpg',
        },
        {
          title: '眉间雪',
          artist: '小爱的妈',
          src: 'http://www.zhujianbo.cn/mp3/mjx.mp3',
          pic: 'http://www.zhujianbo.cn/images/a8.jpg',
        },
        {
          title: '大鱼',
          artist: '周深',
          src: 'http://www.zhujianbo.cn/mp3/dy.mp3',
          pic: 'http://www.zhujianbo.cn/images/a6.jpg',
        }
      ],
      music: {
        // title: '大鱼',
        // artist: '周深',
        // src: 'http://www.zhujianbo.cn/mp3/dy.mp3',
        // pic: 'http://www.zhujianbo.cn/images/a6.jpg',
        // theme: '#41b883'
      }
    }
  },
  components: {
    aplayer: VueAPlayer
  },
  created() {
    this.music = this.list[0]
  },
}
</script>
