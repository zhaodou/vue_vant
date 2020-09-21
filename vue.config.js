
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const path = require("path");
module.exports = {
    publicPath: "/",
  // 打包生成的路径
  outputDir: "build",
  // 打包完build目录下放置静态文件的地方
  assetsDir: "",
  // 指定生成的 html 的输出路径
  indexPath: "index.html",
  // 包含了 hash 的名字
  filenameHashing: true,
  //是否在保存的时候，用"eslint-loader"检查
  lintOnSave: false,
  //配置webpack-dev-server行为
  // devServer: {
  //   open: true, // 启动服务后是否打开浏览器
  //   // host: '0.0.0.0',
  //   port: 8000, //端口号
  //   // https: true, //是否开启协议名,如果开启会发出警告
  //   // hotOnly: false, //热模块更新的一种东西,webpack中自动有过配置,但如果我们下载一些新的模块可以更好的给我更新一些配置
  //   proxy: {
  //     //配置跨域
  //     "/Api": {
  //       //配置跨域的名字
  //       target: "", //跨域的地址
  //       ws: true,
  //       changOrigin: true, //是否跨域
  //       // pathRewrite: {
  //       //   //当前的名字
  //       //   "^/api": "/",
  //       // },
  //     },
  //   },
  // },
  // 存放第三方的插件
  pluginOptions: {
    // 引入全局的 less 的样式
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/style/common.less")],
    },
     // 可以通过 less 文件覆盖（文件路径为绝对路径）
    less: {
      modifyVars: {
        hack: `true; @import "${ [path.resolve(__dirname, "./src/assets/style/vantUi.less")] }";`,
      },
    },
  },
};