/*
* @Author: beyondouyuan
* @Date:   2017-09-04 19:13:49
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2017-09-04 20:41:51
*/

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: String,
    link: String,
    icon: String
});

const userSchema = new Schema({
    name: String,
    email: String,
    pwd: String
});

const Models = {
    User: mongoose.model('User', userSchema),
    Menu: mongoose.model('Menu', menuSchema)
}

export default Models
