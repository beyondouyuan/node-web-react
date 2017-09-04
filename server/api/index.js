/*
 * @Author: beyondouyuan
 * @Date:   2017-08-30 14:01:40
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2017-09-04 22:31:52
 */

import express from 'express'

import db from '../model'

import newsData from '../mock/news'

const router = express.Router();

router.get('/user', (req, res, next) => {
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
