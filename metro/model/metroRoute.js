var mongoose = require('mongoose')
var Schema = mongoose.Schema

var metroRouteSchema = new Schema({
	id: Number,
	length: Number,
	color: String,
	lineName: String,
	routes: [{
		routeName: String,
		stops: [{
			_id: {id:false}
			stopId: Schema.Types.ObjectId
		}]
	}]
})

module.exports = mongoose.model('MetroRoute', metroRouteSchema)