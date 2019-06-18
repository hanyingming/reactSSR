
## 技术栈：webpack + react + react-dom

## 目录/文件说明：
    build // webpack 配置文件目录
      webapck.client.js // webpack 客户端配置
      webpack.server.js // webpack 服务器端配置
    client // browser(客户端)代码目录
    server // server(服务器端)代码目录
    .eslintrc // js代码规范
    .editconfig // 不同编辑器的文本格式进行规范
    .babelrc // es6 -> es5;
    postcss.config.js // css样式兼容不同浏览器
    .gitignore // 忽略git 上传的目录或者文件


## 项目创建
  npm init 生成package.json文件
  .editorconfig
  .gitignore文件

### 1. webpack基础配置
安装 webpack、webpack-cli依赖；
创建 webpack.client.js文件 配置 entry、output

### 2. webpack的loader配置
创建 .babelrc文件 配置 "presets": {["@babel/preset-env",{loose: true}, '@babel/preset-react']};
webpack.client.js 配置 js、jsx相关loader： babel-loader。
安装依赖 babel-loader
@babel/core
@babel/preset-env
@babel/preset-react

### 3. 服务器端渲染配置
创建 server.js 导出服务器端渲染组件；
创建 webpack.server.js 服务器端配置文件输出服务器端渲染入口文件。
安装express依赖 启动服务 渲染服务器端入口文件。




