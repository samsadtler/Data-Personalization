var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var trailEntry = new Schema({
	trailID:Number,
	title: String,
	url: String,
	parent: [String],
	childen: [String],
	favicon:String,
	tagstats:{
		tags:[String],
		tagCount:Number,
	},
	note:{
		noteContent:[String],
		noteDiv:String,
	},
	dateAdded : { type: Date, default: Date.now },
	dateAccessed : { type: Date, default: Date.now },
});

module.exports = mongoose.model('TrailEntry', trailEntry);