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
