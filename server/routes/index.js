/*
* @Author: beyondouyuan
* @Date:   2017-08-30 00:40:00
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-30 22:54:20
*/

// 实现路由从app.js中拆分
import express from 'express';
// import Menu from './menu';
import User from './user';
import News from './news'
const router = express.Router();


// router.get('/menu', Menu)
router.get('/user', User)
router.get('/news', News)

export default router;
