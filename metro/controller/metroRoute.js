var mongoose = require('mongoose')
var MetroRoute = mongoose.model('MetroRoute')

exports.list = function (req, res) {
	MetroRoute.find({}, function (err, metroRoute) {
		if (err) return res.status(500).send(err)
		res.json(metroRoute)
	})
}

exports.create = function (req, res) {
	var newMetroRoute = new MetroRoute(req.body)
	newMetroRoute.save(function (err, metroRoute) {
		if (err) return res.status(500).send(err)
		res.json({'success': true, 'data': metroRoute})
	})
}

exports.read = function (req, res) {
	MetroRoute.findById(req.params.metroRouteId, function (err, metroRoute) {
		if (err) return res.status(500).send(err)
		res.json(metroRoute)
	})
}

exports.update = function (req, res) {
	MetroRoute.findOneAndUpdate(req.params.metroRouteId, req.body, {new: true}, function (err, metroRoute) {
		if (err) return res.status(500).send(err)
		res.json(metroRoute)
	})
}

exports.delete = function (req, res) {
	MetroRoute.remove({_id: req.params.metroRouteId}, function (err, metroRoute) {
		if (err) return res.status(500).send(err)
		res.json({ message: 'MetroRoute successfully deleted' })
	})
}
