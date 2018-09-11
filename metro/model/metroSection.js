var mongoose = require('mongoose')
var Schema = mongoose.Schema

var metroSectionSchema = new Schema({
	id: Number,
	startStation: Schema.Types.ObjectId,
	endStation: Schema.Types.ObjectId,
	reverseOf: Schema.Types.ObjectId,
	coordinates: [[Number]]
})

module.exports = mongoose.model('MetroSection', metroSectionSchema)
