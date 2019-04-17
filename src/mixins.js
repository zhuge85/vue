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
