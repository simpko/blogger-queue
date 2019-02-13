const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BloggerSchema = new Schema({
	username : {type: String, required: true, index: { unique: true } },
	password : {type: String, required: true },
	cool     : {type: Boolean, default: true }
});

BloggerSchema.methods.verifyPassword = function(candidatePassword) {
    if (candidatePassword === this.password) return true;
    return false;
};

module.exports = mongoose.model('Blogger', BloggerSchema);