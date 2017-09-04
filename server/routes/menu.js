/*
* @Author: beyondouyuan
* @Date:   2017-08-30 14:48:16
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-08-30 19:49:55
*/

// mock menu数据
// import menu from '../mock/menu'

// export default function(req, res, next) {
//     res.send(menu)
// }

import { getMenu } from '../api/menu'

export default function(req, res, next) {
    const menu = getMenu();
    res.send(menu)
}
