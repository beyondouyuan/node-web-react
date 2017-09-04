# Webpack + React + React-Router + React-Redux + Express + MongoDB 开发前后端分离CMS系统

## 技术栈

### webpack

使用webpack负责配置前端开发与打包React组件和ES6等Babel文件

### React

React用于构建前端页面组件以及页面渲染，React组件使用ES6语法书写

### React-Router

前端页面路由跳转由React-Router控制，Express除了进入应用根目录路径发送一个用于引入打包了的React页面组件的idex.html文件外，不做路由跳转，只用于提供数据API接口

### React-Redux

使用React-Redux管理React组件状态，以单一状态树来管理组件的状态，无需在每一个组件内手动的调用this.state和this.setState来维护组件状态。便于组件维护

### Express

Express作为后端服务器开发，除了进入应用根目录路径发送一个用于引入打包了的React页面组件的idex.html文件外，不做路由跳转，只用于提供数据API接口。

>
NOTE:在传统的MVC模式开发中，或者一般的Express模式开发时，使用express-generator脚手架快速搭建开发项目目录时，除了自动构建了models、controler和views目录外，通常还有一个routes目录，routes用于放置Express的路由控制，Express中的路由其实也就是我们说的API接口，在一般的没有进行前后端分离的Express开发中路由同时负责发送数据到页面并同时在这个路径下渲染这个药展现这个路径下发送数据的页面[参考](http://beyondouyuan.github.io)中Express开发博客的处理。
>
>
本项目中将会采用前后端分离的开发模式，Express只做为后端发送数据的API接口，但是不渲染数据。怎样实现呢？其实这里一直说的API接口就是传统MVC中的Express的路由！只是我们只需要发送数据，不需要在发送数据的同时渲染页面模版，也就是说，我们定义的"路由"只使用Express的res.send()方法发送数据，而不使用res.render()方法来把用于展示数据的页面也渲染出来，我们的做法是在需要展示这些数据的组件或页面中，异步请求发送数据的路由，得到数据后用React-Router去控制组件的展示和跳转。
>

>
所以API接口实际上就是定义路由来发送数据，只是这些"路由"仅仅负责发送数据，渲染的事情，交给前端去做，而不是服务器除了负责提供数据外，还要做服务器端就是完成的事情(渲染页面)。我们之所以把API接口所在的文件夹叫做'api'而不再叫做"routes"，只是为了区分与过去的传统MVC或者耦合的开发模式而显得有语义化而已，因为我们要的是发送数据的"API"而不是跳转的"路由"。
>

>
在传统的MVC的Express开发中，在服务器入口的app.js中会调用app.use('/path/xx', routes)，也就是使用我们定义的路由，只有使用才能通过服务器起作用然后被客户端访问(就像使用React-Router一样，如果你想显示一个没有被其他已经被渲染到浏览器的组件包裹的组件，就必须使用Route去把组件渲染出来，才能通过路由去访问这个没有被引用又想显示的组件)
>

废话不多说，首先给出项目结构：

## 项目结构

    ./node-web-react+
        ./client+
            ./dist+                          //==>打包后文件存放文件夹
                ./css+                       //==>独立打包的css单文件
                ./images+
                ./js+                        //==>独立打包的js单文件
                    ./index.js               //==>打包的react组件
                    ./vender.bundle.js       //==>独立打包的第三方库
                ./index.html                 //==>整个应用的入口
            ./src+                           //==>开发源文件
                ./assets+                    //==>静态文件存放文件夹
                ./components+                //==>React组件模块 也即Redux的展示组件
                    ./admin+                 //==>管理后台的展示组件
                    ./website+               //==>客户端浏览器浏览展示组件
                    ./Menu.js                //==>页面菜单展示组件
                ./containers+                //==>React页面模块 也即Redux的容器组件
                    ./admin+                 //==>管理后台的容器组件
                    ./website+               //==>客户端浏览器浏览容器组件
                    ./Home.js                //==>主页容器组件
                ./layouts+                   //==>React布局组件
                    ./HomeLayout.js
                    ./Menu.js
                    ./Tabel.js
                ./routes+                    //==>React-Router的前端路由组件
                    ./index.js               //==>前端路由总入口，以此实现路由拆分
                    ./menu.js                //==>菜单路由
                    ./user.js
                ./redux+                     //==>Redux相关
                    ./actions+               //==>Redux Action相关
                        ./action1.js
                        ./action2.js
                    ./constants              //==>Action Type 常量相关
                        ./action1Type.js
                        ./action2Type.js
                    ./reducers+              //==>Redux Reducer相关
                        ./reducer1.js
                        ./reducer2.js
                    ./store+                 //==>Redux Store相关
                        ./store.js
                ./utils+                     //==>公用工具方法函数(fetch封装、dom等)
                    ./request.js             //==>请求方法模块封装
                    ./dom.js                 //==>dom操作模块封装
                    ./animations.js          //==>动画模块封装
                ./main.js                    //==>React整体组件的入口文件
        ./server+                            //==>Express服务器文件
            ./api+                           //==>Express服务器提供的API接口相关
                ./index.js
                ./menu.js
                ./user.js
                ./news.js
            ./bin+                           //==>服务器元文件
            ./mock+                          //==>初始mock数据相关
                ./menu.js
                ./user.js
            ./routes+                        //==>路由管理，弃用之使用语义化的api
                ./index.js
                ./menu.js
                ./user.js
            .app.js                          //==>Express服务器启动文件
        ./.babelrc                           //==>babel配置同时在Express和React用ES6
        ./package.json                       //==>依赖包信息
        ./webpack.config.js                  //==>webpack配置文件

一个良好的项目目录结构可以高效的进行开发工作，无需发太多精力在考虑代码放到哪里，以及频繁的切换代码目录。同时，项目结构也可以让自己的思维更佳清晰。


### 前端配置
当此之时，手动创建了dist/目录和dist/index.html，后续将会使用webpack结合模版自动生成dist/目录。

首先安装项目依赖：

    npm install react react-dom redux react-redux react-router antd css-loader style-loader node-sass sass-loader file-loader url-loader autoprefixer postcss-loader --save

- react react-dom redux react-redux react-router为React的全家桶依赖
- antd为蚂蚁金服提供的React的UI组件库
- ss-loader style-loader node-sass sass-loader postcss-loader autoprefixer 主要用于处理css和sass等预处理css
- file-loader url-loader主要用于处理css中引入的图片inco等部分

### Webpack

首先安装webpack，以webpack来打包React组件以及配置Express的ES6余发环境

    npm install webpack -g  
    npm install extract-text-webpack-plugin --save-dev // 将css单独打包的插件
    npm install path --save-dev // 和路径

webpack为3.x版本

新建webpack.config.js配置文件：

    const webpack = require('webpack');
    // extract-text-webpack-plugin：将css单独打包成一个文件
    const ExtractTextPlugin = require('extract-text-webpack-plugin')
    const config = {
        // 入口文件
        entry: {
            index: __dirname + '/client/src/main.js',
            // 将react和react-dom这些单独打包出来，减小打包文件体积
            vender: [
                'react',
                'react-dom'
            ]
        },
        // 打包输出
        output: {
            path: __dirname + '/client/dist',
            filename: 'js/[name].js'
        },
    }

    module.exports = config;

配置webpack.config.js后，在项目根目录执行：

    webpack

命令将报错： `Cannot find module 'webpack'`，此时启动webpack命令是直接根据webpack.config.js文件启动的，这个文件会在项目当前目录序着对应模块，因为我们的webpack只在全局安装了，而并未在当前项目本地安装，所以是找不到，若是不想将webpack安装到当前目录下，而只在全局使用webpack，那就需要结合package.json文件的node script命令来调用了。package.json在当前项目的目录找不到的模块的话将会自动在全局查找模块，所以，解决方案有两个

- 执行npm install webpack --save-dev将webpack安装到当前项目开发依赖
- 配置package.json的script来启动webpack命令

再次启动webpack命令，报错：

>
new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
You would change it to:
new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
>

啊噢，webpack 3.x和webpack 2.x的API不同造成错出。

### babel

配置babel来编译ES6和JSX，在后续中，我的components目录下的组件文件后缀将统一为.jsx，以显示的标示这些文件问React展示组件，而containers目录下的容器文件后缀则为.js以和展示组件进行区分。

无论是.js的ES6/React还是.jsx的ES6/React都需要使用编译为可被浏览器识别的ES5文件，babel则是很优秀的一款工具，配置babel如下：

安装babel以及依赖的其他插件

    npm install babel-loader babel-core babel-preset-es2015 babel-preset-react babel-preset-stage-1 babel-plugin-import babel-cli --save-dev

webpack通过module属性，配置加载器来加载ES6/React的JSX文件，修改webpack.config.js添加module如下：

    // 模块加载
    module: {
        loaders: [{
            test: /\.js|.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader' // 旧版本的webpack可以省略写成babel，新版本的每个loader都不克在省略
        }, {
            test: /\.(scss|sass|css)$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader!postcss-loader', {
                pubkicPath: '../'
            })
        }, {
            test: /\.(png|jpg|jpng|eot|ttf)$/,
            loader: 'url-loader?limit=8192&name=images/[name].[ext]'
        }]
    }

对于babel，新建.babelrc文件，配置如下：

    {
        "presets": ["es2015", "react", "stage-1"],
        "plugins": [
            [
                "import",
                {
                    "libraryName": "antd",
                    "style": "css"
                },
                // 监控组件变化
                "react-transform", {
                    "transforms": [{
                        "transform": "react-transform-hmr",

                        "import": ["react"],
                        "locals": ["modules"]
                    }]
                }
            ]
        ]
    }

添加一个plugins属性，完善webpack的配置：

    // 插件配置
    plugins: [
        // 这是之前单独打包出来的react、react-dom等文件
        new webpack.optimize.CommonsChunkPlugin({ name: 'vender', filename: 'js/vender.bundle.js' }),
        // 将所有sass/css文件打包成一个index.css文件
        new ExtractTextPlugin('css/index.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        //  压缩打包后的代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        // 热更新
        new webpack.HotModuleReplacementPlugin()
    ],

至此，前端部分已经配置完成，简单的测试一下：

components/目录下新建三个文件如下

    /*
    * @Author: beyondouyuan
    * @Date:   2017-08-30 17:43:15
    * @Last Modified by:   beyondouyuan
    * @Last Modified time: 2017-09-04 20:51:58
    * @User.jsx
    */

    import React from 'react';

    class User extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            const { user } = this.props;
            return (
                <div>
                    <h2>用户列表</h2>
                    {
                        user.map(user => {
                            return (
                                <ul>
                                    <li>{ user.name }</li>
                                    <li>{ user.email }</li>
                                    <li>{ user.pwd }</li>
                                </ul>
                            )
                        })
                    }
                </div>
            )
        }
    }

    export default User


    /*
    * @Author: beyondouyuan
    * @Date:   2017-08-30 20:22:51
    * @Last Modified by:   beyondouyuan
    * @Last Modified time: 2017-08-30 21:14:41
    * @News.jsx
    */

    import React from 'react';

    class News extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            const { news } = this.props;
            return (
                <div>
                    <h2>新闻列表</h2>
                    {
                        news.map(news => {
                            return (
                                <ul>
                                    <li><span>新闻标题：</span>{ news.title }</li>
                                    <li><span>新闻标签：</span>{ news.tag }</li>
                                    <li><span>新闻简述：</span>{ news.desc }</li>
                                    <li><span>新闻浏览：</span>{ news.views }</li>
                                    <li><span>新闻id：</span>{ news.id }</li>
                                    <li><span>新闻图片：</span>
                                        <ul>{
                                            news.images.map(image => {
                                                return(
                                                    <li><img src={image} /></li>
                                                )
                                            })
                                        }
                                        </ul>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </div>
            )
        }
    }

    export default News



    /*
    * @Author: beyondouyuan
    * @Date:   2017-08-30 17:38:33
    * @Last Modified by:   beyondouyuan
    * @Last Modified time: 2017-08-30 18:09:56
    * @Menu.jsx
    */
    import React from 'react';

    class Menu extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            const { menu } = this.props;
            return (
                <div>
                    <h2>菜单列表</h2>
                    {
                        menu.map(menu => {
                            return (
                                <ul>
                                    <li>{ menu.name }</li>
                                    <li>{ menu.link }</li>
                                    <li>{ menu.icon }</li>
                                </ul>
                            )
                        })
                    }
                </div>
            )
        }
    }

    export default Menu


在containers/目录下创建一个页面容器组件Home.js

    /*
    * @Author: beyondouyuan
    * @Date:   2017-08-30 17:35:43
    * @Last Modified by:   beyondouyuan
    * @Last Modified time: 2017-09-04 22:19:52
    */

    import React from 'react'

    import Menu from '../components/Menu.jsx'
    import User from '../components/User.jsx'
    import News from '../components/News.jsx'


    class Home extends React.Component {
        constructor() {
            super();
            this.state = {
                menu: [],
                user: [],
                news: []
            };
        }
        componentWillMount() {
            // 无路是否需要配置反响代理，都是相对路径而无需使用全路径
            // 当使用express服务器加载时react项目(该项目中除start命令外的其他命令都会使用express服务器去渲染前端)时，其实是一个同构的项目，不存在跨域
            // 当使用webpack dev server单独启动前端项目时，同时后端的expreess分开启动命令，server，只提供服务器不加载渲染前端时存在跨域(执行start命令可以单独通过localhost:8080)单独的访问前端页面，再用任何其他命令来启动express服务器来提供数据，此时的前端页面与后段分离了，若想获取服务器数据，则需要配置代理
            // 本项目的代理只针对单独使用webpack dev server启动另外的服务器，不使用express服务器渲染前端页面时，
            fetch(
                "/api/menu/"
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.setState({
                        menu : data
                    })
                });
            fetch(
                "/api/user/"
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.setState({
                        user : data
                    })
                });
            fetch(
                "/api/news/"
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    this.setState({
                        news : data
                    })
                });
        }
        render() {
            const { menu, user, news } = this.state;
            return (
                <div>
                    <h1>你好世界</h1>
                    <h2>mock menu data 模拟数据</h2>
                    <Menu menu={menu} />
                    <h2>mock user data 模拟数据</h2>
                    <User user={user} />
                    <h2>mock news data 模拟数据</h2>
                    <News news={news} />
                </div>
            )
        }
    }

    export default Home

在src/目录下的main.js文件即React的入口文件中写入内容如下：

    /*
    * @Author: beyondouyuan
    * @Date:   2017-08-29 04:50:12
    * @Last Modified by:   beyondouyuan
    * @Last Modified time: 2017-09-04 22:21:39
    * @main.js
    */

    import React from 'react'
    import { render } from 'react-dom'

    import Home from './containers/Home'

    render(
        <div>
            <Home />
        </div>,
        document.getElementById('root')
    )

至此，我们已经构建了一个十分简单的React应用了，此时执行npm start则成功打包React文件，并运行成功。



### 服务器

服务器使用NodeJS，选择Express框架：

- 使用express-generator脚手架快速搭建node的express环境
- 删除掉那些我们不需要的由express自动生成文件夹(public和views等)
- 修改app.js服务器启动文件

    npm install express --save
    npm install express-generator -g
    npm install nodemon -g

nodemon监听node的变化，当我们修改服务器文件时，无需手动重启服务器。
修改package.json的scripts命令：

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack-dev-server",
        "server": "nodemon ./server/app.js --exec babel-node",
        "dev": "webpack && nodemon ./server/app.js --exec babel-node",
        "build": "webpack && nodemon ./server/app.js --exec babel-node"
    },

nodemon ./server/app.js --exec babel-node可以是的我们的Express也可以使用ES6语法。

为了更好的理解，我使用语义化的api文件代替了routes文件夹，我们的服务器将不再负责视图的渲染，只需要提供接口即可，所以，将渲染视图部分删除掉，修改如下：


    app.set('views', path.join(__dirname, '../client/dist'));
    app.set('view engine', 'html');
    app.engine('html', ejs.renderFile)

我们选择使用ejs模版来发送我们的前端视图入口文件，当然，你也可以选择nodejs内置提供的fs文件模块来发送前端视图文件。

同时用于我们的前端视图文件./dist/index.html不在我们所启动的express服务器中，他只是一个静态文件，所以，express想使用静态文件则需要配置如下：

    app.use(express.static(path.join(__dirname, '../client/dist')));


则修改后的express服务器启动文件如下：


    import express from 'express';
    import mongoose from 'mongoose';
    import path from 'path';
    import favicon from 'serve-favicon';
    import logger from 'morgan';
    import cookieParser from 'cookie-parser';
    import bodyParser from 'body-parser';
    import ejs from 'ejs';
    import api from './api'
    import config from './config/db'


    const app = express();

    app.set('views', path.join(__dirname, '../client/dist'));
    app.set('view engine', 'html');
    app.engine('html', ejs.renderFile)

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../client/dist')));

    const port = 4000;
    // 因为是单页面，node监听到所有路由变化都只做一件事情只控制进入应用的根目录
    // 即渲染这个单页面文件即可，所有页面跳转变化路由交给react-router控制不同组件的渲染
    // 这个设置，将会在客户端访问web应用跟目录路由时会将../client/dist/目录下的index.html用ejs当作一个文件发送到前台即浏览器。然后这个index.html呗客户端渲染出来
    // 如此即可实现后端express调用前端的的页面入口，express只负责发送单页面的client/dist/目录下的index.html(index.html为前端入口文件)单页面到浏览器让浏览器渲染提供其他的数据接口共给react前端调用，前端的页面跳转🈶️react-router控制。同时前端的react组件调用express提供的其他接口实现数据操作
    // 这就是前后端分离
    app.get("/", (req, res, next) => {
        // index即我们上面设置的app.set('views', path.join(__dirname, '../client/dist'));
        // 和app.use(express.static(path.join(__dirname, '../client/dist')));
        // 这两个设置告诉express我们的视图怎样去渲染
        res.render('index');// node只监听跟路径"/"路由然后发送index.html到浏览器，其他任何路由的变化即每一次客户端发起请求(如/login、/register、／user改变而现实不同的页面和数据等这些由react-router控制实现组件页面跳转的路由并渲染不同的接口数据)。
    });

    // 引入API接口
    app.use('/api', api)
    // 解构赋值
    const { db: { mongodb }, options } = config;
    // mongodb测试
    mongoose.connect(mongodb, options);

    // 实例化连接
    const db = mongoose.connection;

    db.on('error', (err) => {
      console.error('MongoDB连接失败！！' + err)
    });

    db.once('open', () => {
      console.log('MongoDB连接成功！！')
    })

    app.listen(port, () => {
        console.info('server is runing on port ' + port)
    })

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    module.exports = app;

选择使用mongoose来驱动mongodb，config为mongodb的配置选项：

    const config = {
        db: {
            mongodb: "mongodb://localhost/node-cms"
        },
        options: {
            user: "ouyuan",
            pass: "ouyuan"
        }
    };

    export default config;


mongoose作为我们的mongodb驱动的同时，也为我们提供了Schema这个强大的数据模型定义模块。

>
mongodb是一个NoSQL数据库，它不需要预先设计表，而且它也没有表的概念，一般称之为集合Cllection，它的具体的数据着是类JS的JSON，被称之为文档Document，多个文档组成一个集合，多个集合组成一个数据库Database。
>

### Nodel

在server/目录下新建model目录，新建index.js文件定义数据库文档模型：

    import mongoose from 'mongoose'

    const Schema = mongoose.Schema;

    const menuSchema = new Schema({
        name: String,
        link: String,
        icon: String
    });

    const userSchema = new Schema({
        name: String,
        email: String,
        pwd: String
    });

    const Models = {
        User: mongoose.model('User', userSchema),
        Menu: mongoose.model('Menu', menuSchema)
    }

    export default Models


/api/index.js文件饮用数据模型，并查询数据（menu和user已经使用了数据库的数据）：


    import express from 'express'

    import db from '../model'

    import user from '../mock/user'
    import menu from '../mock/menu'
    import newsData from '../mock/news'

    const router = express.Router();

    router.get('/user', (req, res, next) => {
        // res.send(user)
        db.User.find((err, user) => {
            res.send(user)
        })
    })

    router.get('/news', (req, res, next) => {
        const data = newsData();
        const news = data.news;
        res.send(news)
    })

    router.get('/menu', (req, res, next) => {
        db.Menu.find((err, menu) => {
            res.send(menu)
        })
    })
    export default router


### 传入数据


启动mongo并按照我们设置的数据模型插入一些测试数据


    $mongo

    >
    >use node-cms
    >db.users.insert({
    ....    name:"ouyuan",
    ....    email:"ouyuan@163.com",
    ....    pwd:"ouyuan"
    ....    })
    WriteResult({ "nRemoved" : 1 })
    >db.users.insert({
    ....    name:"oujunyuan",
    ....    email:"oujunyuan@163.com",
    ....    pwd:"oujunyuan"
    ....    })
    WriteResult({ "nRemoved" : 1 })
    >db.users.insert({
    ....    name:"beyondouyuan",
    ....    email:"beyondouyuan@hotmail.com",
    ....    pwd:"beyondouyuan"
    ....    })
    WriteResult({ "nRemoved" : 1 })
    >db.menus.insert({
    ....    name:"主页",
    ....    link:"home",
    ....    icon:"home"
    ....    })
    WriteResult({ "nRemoved" : 1 })
    >db.menus.insert({
    ....    name:"关于",
    ....    link:"about",
    ....    icon:"about"
    ....    })
    WriteResult({ "nRemoved" : 1 })
    >db.menus.insert({
    ....    name:"新闻",
    ....    link:"news",
    ....    icon:"news"
    ....    })
    WriteResult({ "nRemoved" : 1 })


node-cms对应Database，menus为menus集合Cllection，users为users集合Cllection，集合内的数据称为文档。

查看集合：
    
    show collections

删除集合：

    db.menu.drop()

menu是我此前创建的一个集合

查看文档数据：

    db.users.find().pretty()
    // pretty()将数据格式化

此时访问浏览器的[http://localhost:8080/](http://localhost:8080/)即可看到我们的模拟的数据以及从mongodb数据库读取回来的数据：


### 总结

项目结构反应了开发者在整体项目的高度去考虑产品或者项目的构架，清晰的项目让我们有条理的开发以及维护项目。

在这期间遇到的问题主要有两个，第一个就是mongodb的安装配置的问题了，刚换到Mac OS上，安装的mongodb版本和社区上都不太一样，所以多化了点时间，另外一个express连接mongodb，使用了mongoose模块作为驱动，但是由于版本不同，API也不一样，总算看着API文档链接上了，

以上，我们配置了一个前后端分离的项目，前端使用React+React-Router负责页面构建以及路由控制，后端则使用Express提供后台服务，除访问跟目录外Express不做任何渲染页面的事情，只提供数据API服务。数据库选择非关系型数据库mongodb。

前后端已经打通，此时只写了两个简单的API接口，所有的数据也全部显示在Home跟页面下，那么后期，后端之需要添加想要的API接口并设计响应的数据模型并插入到数据库中，前端则构建对应组件，并借助React-Router去控制组件的渲染，以便在不同的组件中显示相对应的数据。至于组件状态的管理，后期可响应的根据项目需求，考虑是否使用Redux、React-Redux来构建我们的状态树。
