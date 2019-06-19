
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

### 4. 开发环境页面实时局部刷新
 webpack dev server 更改数据，页面实时刷新
 hot module replacement 更改数据，页面局部刷新
 https://webpack.docschina.org/guides/hot-module-replacement

 react-hot-loader: https://github.com/gaearon/react-hot-loader

react-hot-loader(react局部热更新的增强版，依赖hot-module-replacement)
配置步骤：
安装 react-hot-loader依赖
1. 配置.babelrc文件 plugins: react-hot-loader/babel
2. 配置webpack.client.js文件 通过入口文件注入 react-hot-loader/patch; devServer 配置 hot: true
3. App.js文件中引入react-hot-loader；通过 module.hot判断 热更新

限制：
1. React-Hot-Loader would not change the past, only update the present
2. React-Hot-Loader would not update any object, including component state.

### 5.服务器端实现热更新
https://webpack.docschina.org/api/node/#%E5%AE%89%E8%A3%85-installation-
> 线上环境 express服务通过引入dist目录的服务入口文件server.js 与 html模板文件并进行整合返回给客户端。
> 开发环境 需要通过axios获取客户端生成的模板文件，express服务器获取需要渲染的内容注入到模板文件的内容区域，返回给客户端。
开发环境处理过程：
  1. webpack-dev-server 启动客户端开发环境 npm run dev:client
  2. 引入 axios 获取客户端的模板文件
  3. 动态创建webpack 并 通过watch钩子监听打包过程；为了提升读写速度，webpack通过设置outputFileSystem: new MemoryFS() 将打包数据存储在内容中；
  在打包过程监听回调函数中，读取打包数据并将数据动态挂载到module上（参考server.js）
  4. 整合模板文件与渲染bundle内容 返回给客户端
  5. 通过http-proxy-middle代理中间件 访问静态文件




