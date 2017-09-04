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
