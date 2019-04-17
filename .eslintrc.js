module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 生成器函数的前后空格
    'generator-star-spacimg': 'off',
    // 开发模式可以使用debugger，生产模式使用debugger报错
    'no-debugger': process.env.NODE_ENV == 'production' ? 'error' : 'off',
    // 忽略未使用的变量
    'no-unused-vars': 'off',
    // 忽略单引号和双引号
    quotes: 'off',
    // 对象或者数组字面量项尾不能有逗号
    'comma-dangle': [2, 'never'],
    // 语句强制分号结尾
    semi: [2, 'alwarys']
  },
  // 空行最多不能超过100行
  'no-multiple-empty-lines': [0, { max: 100 }],
  // 关闭禁止混用tab和空格
  'no-mixed-spaces-and-tabs': [0],
  // 数组第一个指定是否启用这个规则，第二个指定几个空格
  indent: [1, 2]
}
