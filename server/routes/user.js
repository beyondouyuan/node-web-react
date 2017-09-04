/*
* @Author: beyondouyuan
* @Date:   2017-08-30 15:31:13
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-30 15:31:43
*/

import user from '../mock/user'

export default function(req, res, next) {
    res.send(user)
}
