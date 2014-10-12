/**
 *
 * These are some sample collections. You can replace them with yours.
 * 
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var news = new Schema({
		   label : String,
		   content : String,
		   datetime : {type: Date, default: Date.now }
});

var feedback = new Schema({
		   userid : {type: Schema.ObjectId, ref: 'Account'},
		   comment : String,
		   datetime : {type: Date, default: Date.now }
});


exports.news = mongoose.model('news', news);
exports.feedback = mongoose.model('feedback', feedback);
