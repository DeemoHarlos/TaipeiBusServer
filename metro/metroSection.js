module.exports = (function () {
	var app = require('express').Router()
	var metroSection = require('./controller/metroSection')

	app.route('/')
		.get(metroSection.list) 
		.post(metroSection.create)

	app.route('/:assignmentId')
		.get(metroSection.read)
		.put(metroSection.update)
		.delete(metroSection.delete)

	return app
})()