var mongoose = require('mongoose')
var Schema = mongoose.Schema

var metroStopSchema = new Schema({
	id: Number,
	coordinates: [Number],
	code: String,
	name: {
		zh: String,
		en: String
	}
})

module.exports = mongoose.model('MetroStop', metroStopSchema)
