module.exports = (function () {
	var app = require('express').Router()
	var metroStop = require('./controller/metroStop')

	app.route('/')
		.get(metroStop.list) 
		.post(metroStop.create)

	app.route('/:metroStopId')
		.get(metroStop.read)
		.put(metroStop.update)
		.delete(metroStop.delete)

	return app
})()