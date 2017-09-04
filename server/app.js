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
