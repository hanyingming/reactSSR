
## 技术栈：webpack + react + react-domm + react-router-dom

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

### 4. 开发环境页面实时局部刷新[HMR + react-hot-loader]
 webpack dev server 更改数据，页面实时刷新
 hot module replacement 更改数据，页面局部刷新

####react-hot-loader(react局部热更新的增强版，依赖hot-module-replacement)
react-hot-loader 配置步骤：
1. 配置.babelrc文件 plugins: react-hot-loader/babel
2. 配置webpack.client.js文件 通过入口文件注入 react-hot-loader/patch; devServer 配置 hot: true
3. App.js文件中引入react-hot-loader；通过 module.hot判断 热更新

react-hot-loader 限制：
1. React-Hot-Loader would not change the past, only update the present
2. React-Hot-Loader would not update any object, including component state.

### 5.服务器端实现热更新
> 线上环境 express服务通过引入dist目录的服务入口文件server.js 与 html模板文件并进行整合返回给客户端。
> 开发环境 需要通过axios获取客户端生成的模板文件，express服务器获取需要渲染的内容注入到模板文件的内容区域，返回给客户端。
开发环境处理过程：
  1. webpack-dev-server 启动客户端开发环境 npm run dev:client
  2. 引入 axios 获取客户端的模板文件
  3. 动态创建webpack 并 通过watch钩子监听打包过程；为了提升读写速度，webpack通过设置outputFileSystem: new MemoryFS() 将打包数据存储在内容中；
  在打包过程监听回调函数中，读取打包数据并将数据动态挂载到module上（参考server.js）
  4. 整合模板文件与渲染bundle内容 返回给客户端
  5. 通过http-proxy-middle代理中间件 访问静态文件

### 6. 配置 eslint、editorconfig 规范
editorconfig: 规范不同编辑器的文本格式，维护一致的代码风格。（vscode:需要安装EditorConfig插件支持）
eslint:语法规则和代码风格的检查工具
用途：
  1. 规范代码规则与风格，编译时实时进行代码检查
  2. 与git 结合使用，git commit 时进行代码规范检查
参考链接：
https://www.npmjs.com/package/eslint-config-standard
https://www.npmjs.com/package/eslint-config-airbnb
https://juejin.im/post/5c92e11b5188251571729ef0
https://webpack.docschina.org/guides/migrating/#%E7%A7%BB%E9%99%A4-module-preloaders-%E5%92%8C-module-postloaders

安装依赖：
  extends: "standard"
    eslint-config-standard
    eslint-plugin-node
    eslint-plugin-promise
    eslint-plugin-standard
  extends: "airbnb"
    eslint-config-airbnb@latest
    eslint-plugin-jsx-a11y
    eslint-plugin-import
    eslint-plugin-react
  eslint
  babel-eslint
  elint-loader

eslint 常用配置项说明：
  root 限定配置文件的使用范围
  parser 指定eslint的解析器
  parserOptions 设置解析器选项
  extends 指定eslint规范
  plugins 引用第三方的插件
  env 指定代码运行的宿主环境
  rules 启用额外的规则或覆盖默认的规则
  globals 声明在代码中的自定义全局变量

客户端：配置将 eslint 配置到 webpack 的工作流程中。
服务器端：引入nodemon 启动服务 通过配置 监听文件改动时 执行 npm run server:eslint 进行检测 文件代码风格与语法规范。

### 7. 配置路由[react-router-dom](https://reacttraining.com/react-router/web/example/basic)
1. 在client/view/config 目录创建route.jsx 路由配置文件
2. 配置路由的代码分离（按需加载）

### 8. react-redux 支持 @connect
babel >= 7.0
1. @babel/plugin-proposal-decorators
2. .babelrc 文件中配置
"plugins": [
  ["@babel/plugin-proposal-decorators", { "legacy": true }],
]


### 参考链接
[详解React 服务端渲染方案完美的解决方案](https://m.jb51.net/article/152748.htm)
[详解React服务端渲染从入门到精通](https://m.jb51.net/article/158625.htm)
[利用React Router4实现的服务端直出渲染(SSR)](https://m.jb51.net/article/154169.htm)
[webpack HMR](https://webpack.docschina.org/guides/hot-module-replacement)
[react-hot-loader](https://github.com/gaearon/react-hot-loader)
[webpack 动态初始化](https://webpack.docschina.org/api/node/#%E5%AE%89%E8%A3%85-installation-)
[react-router文档](https://reacttraining.com/react-router/web/example/basic)
[代码分割](https://blog.csdn.net/sinat_17775997/article/details/83151142)
[react-routerV3、V4 server render的区别](https://wuxinhua.com/2017/11/20/React-ssr-exploration/)
[react-redux支持@connect](https://blog.csdn.net/qq_26586219/article/details/85991776)


[react-koa-SSR参考项目]https://github.com/Graceji/react-koa-SSR/blob
[react-ssr参看项目](https://github.com/onlyling/react-ssr)

