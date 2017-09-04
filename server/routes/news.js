/*
* @Author: beyondouyuan
* @Date:   2017-08-30 20:20:33
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-30 20:47:49
*/

import { getNews } from '../api/news'

export default function(req, res, next) {
    const news = getNews();
    res.send(news)
}
