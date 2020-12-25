var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var todo = require('../routes/todo');
var logschema = new Schema({
    username:String,
    password:String
})
var  loginfo = module.exports = mongoose.model('users', logschema);