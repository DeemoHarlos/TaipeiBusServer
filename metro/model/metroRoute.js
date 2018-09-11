var mongoose = require('mongoose')
var Schema = mongoose.Schema

var metroRouteSchema = new Schema({
	id: Number,
	length: Number,
	color: String,
	lineName: String,
	routes: [{
		routeName: String,
		sections: [Schema.Types.ObjectId]
	}]
})

module.exports = mongoose.model('MetroRoute', metroRouteSchema)