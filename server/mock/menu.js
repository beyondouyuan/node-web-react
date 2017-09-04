/*
* @Author: beyondouyuan
* @Date:   2017-08-30 12:55:07
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-30 15:50:29
*/


const menu = [
    {
        "name" : "首页",
        "link" : "/index",
        "icon" : 'home',
        "children" : [
            {
                "name" : "设置",
                "link" : "/setting",
                "icon" : "setting"
            }, {
                "name" : "管理",
                "link" : "/manage",
                "icon" : "manage"
            }
        ]
    }, {
        "name" : "新闻",
        "link" : "/news",
        "icon" : 'news',
        "children" : [
            {
                "name" : "热点",
                "link" : "/hot",
                "icon" : "hot"
            }, {
                "name" : "体育",
                "link" : "/sports",
                "icon" : "sports"
            }
        ]
    }, {
        "name" : "关于",
        "link" : "/about",
        "icon" : 'about',
        "children" : [
            {
                "name" : "我的",
                "link" : "/me",
                "icon" : "me"
            }, {
                "name" : "博客",
                "link" : "/blog",
                "icon" : "blog"
            }
        ]
    }, {
        "name" : "产品",
        "link" : "/product",
        "icon" : 'product',
        "children" : [
            {
                "name" : "我的产品",
                "link" : "/my",
                "icon" : "my"
            }, {
                "name" : "我的推荐",
                "link" : "/recommand",
                "icon" : "recommand"
            }
        ]
    }
];

export default menu
