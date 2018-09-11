module.exports = (function () {
	var app = require('express').Router()
	var metroRoute = require('./controller/metroRoute')

	app.route('/')
		.get(metroRoute.list) 
		.post(metroRoute.create)

	app.route('/:assignmentId')
		.get(metroRoute.read)
		.put(metroRoute.update)
		.delete(metroRoute.delete)

	return app
})()