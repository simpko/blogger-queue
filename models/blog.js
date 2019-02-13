const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	author: String,
	title : String,
	month : Number,
	day   : Number,
	year  : Number
});

module.exports = mongoose.model('Blog', BlogSchema);