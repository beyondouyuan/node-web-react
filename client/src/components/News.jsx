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
