/*
* @Author: beyondouyuan
* @Date:   2017-08-30 19:53:37
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-30 21:24:06
*/

// 使用mock.js
import Mock from 'mockjs';
const Random = Mock.Random;

export default function() {
    let data = {
        stars: [],
        news: []
    };

    const starImages = [1, 2, 3].map(img => Random.image('120x60', Random.color(),Random.word(2,6)));
    for(let i = 0; i < 50; i++) {
        const contents = Random.cparagraph(0,10);
        data.stars.push({
            id: i,
            name: Random.cname(),
            desc: contents.substr(0,50),
            tag: Random.cword(2,8),
            views: Random.integer(100, 5000),
            images: starImages.slice(0, Random.integer(1,3))
        })
    }
    // 生成三张图片
    const newsImages = [1, 2, 3].map(img => Random.image('120x60', Random.color(),Random.word(2,6)));
    for(let i = 0; i < 20; i++) {
        const contents = Random.cparagraph(0,10);
        data.news.push({
            id: i,
            title: Random.cword(8,20),
            desc: contents.substr(0,50),
            tag: Random.cword(2,8),
            views: Random.integer(100, 5000),
            // 从所生成的图片数组中随机汲取
            images: newsImages.slice(0, Random.integer(1,3))
        })
    }
    return data;
}
