'use strict'
const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
function resolve(dir) {
  return path.join(__dirname, dir)
}
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 打包时去除打印信息（console）
const user = require('./data/user.json') // 假数据

module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   **/
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部,
  // 例如 https://www.my-app.com/
  // 如果你的应用部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如将你的应用部署在
  // https://www.foobar.com/admin/
  // 那么将这个值改为 '/admin/'

  // 部署生产环境和开发环境下的URL
  publicPath: process.env.NODE_ENV === 'production' ? '/vue3/' : '/',

  // 构建输出目录 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
  outputDir: 'dist',

  // 静态资源目录 (js, css, img, fonts)
  assetsDir: 'assets',

  // 指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
  // indexPath: "myIndex.html",

  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,

  // 使用带有浏览器内编译器的完整构建版本
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: false,

  // 如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
  // lintOnSave: process.env.NODE_ENV !== 'production',

  // 运行时版本是否需要编译 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了
  // 但是这会让你的应用额外增加 10kb 左右。(默认false)
  runtimeCompiler: false,

  // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  transpileDependencies: [
    /* string or regex */
  ],
  /**
   * 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   **/
  productionSourceMap: false,

  // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    //修改文件引入自定义路径 开发生产共同配置
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@c', resolve('./src/components'))
      .set('@v', resolve('./src/views'))
      .set('@a', resolve('./src/assets'))
      .set('@img', resolve('./src/assets/img'))
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10240 }))
    }
  },

  transpileDependencies: ['uglifyjs-webpack-plugin'],
  // webpack配置，值位对象时会合并配置，为方法时会改写配置
  configureWebpack: config => {
    // vue 优化CDN加速
    config.externals = {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      VueLazyload: 'vue-lazyload'
      // 'element-ui': 'ELEMENT'
    }
    if (debug) {
      // 开发环境配置
      // 为开发环境修改配置...
      config.mode = 'development'
      config.devtool = 'cheap-module-eval-source-map'
    } else {
      // 生产环境配置
      // 为生产环境修改配置...
      config.mode = 'production'
      // 必须添加环境判断代码，因为development环境下config.optimization是undefined
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
        // minimizer: [
        //   new UglifyJsPlugin({
        //     uglifyOptions: {
        //       compress: {
        //         warnings: false,
        //         drop_console: true, // console
        //         drop_debugger: false,
        //         pure_funcs: ['console.log'] // 移除console
        //       }
        //     },
        //     sourceMap: false,
        //     parallel: true
        //   })
        // ]
      }
      Object.assign(config, {
        optimization
      })

      // let optimization = {
      //   splitChunks: {
      //     cacheGroups: {
      //       vendor: {
      //         chunks: 'all',
      //         test: /node_modules/,
      //         name: 'vendor',
      //         minChunks: 1,
      //         maxInitialRequests: 5,
      //         minSize: 0,
      //         priority: 100
      //       },
      //       common: {
      //         chunks: 'all',
      //         test: /[\\/]src[\\/]js[\\/]/,
      //         name: 'common',
      //         minChunks: 2,
      //         maxInitialRequests: 5,
      //         minSize: 0,
      //         priority: 60
      //       },
      //       styles: {
      //         name: 'styles',
      //         test: /\.(sa|sc|c)ss$/,
      //         chunks: 'all',
      //         enforce: true
      //       },
      //       runtimeChunk: {
      //         name: 'manifest'
      //       }
      //     }
      //   }
      // }
    }
  },
  // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
  // 也可以是传递给 extract-text-webpack-plugin 的选项对象
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    loaderOptions: {
      css: {}, // 这里的选项会传递给 css-loader
      postcss: {} // 这里的选项会传递给 postcss-loader
    },
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },

  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译

  pwa: {
    // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true, //配置自动启动浏览器
    host: 'localhost', // 允许外部ip访问
    port: 8080, // 端口号
    https: false, // 启用https
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    disableHostCheck: true,
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://www.tp.com/static/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }, // 配置多个代理
      '/upload': {
        target: 'http://www.tp.com/static/upload/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/upload': ''
        }
      }
    }, // 代理转发配置，用于调试环境
    before: app => {
      app.get('/api/user.json', (req, res) => {
        res.json(user)
      })
    }
  },

  pluginOptions: {
    // 第三方插件配置
  }
}
