var mongoose = require('mongoose')
var MetroStop = mongoose.model('MetroStop')

exports.list = function (req, res) {
	MetroStop.find({}, function (err, metroStop) {
		if (err) return res.status(500).send(err)
		res.json(metroStop)
	})
}

exports.create = function (req, res) {
	var newMetroStop = new MetroStop(req.body)
	newMetroStop.save(function (err, metroStop) {
		if (err) return res.status(500).send(err)
		res.json({'success': true, 'data': metroStop})
	})
}

exports.read = function (req, res) {
	MetroStop.findById(req.params.metroStopId, function (err, metroStop) {
		if (err) return res.status(500).send(err)
		res.json(metroStop)
	})
}

exports.update = function (req, res) {
	MetroStop.findOneAndUpdate(req.params.metroStopId, req.body, {new: true}, function (err, metroStop) {
		if (err) return res.status(500).send(err)
		res.json(metroStop)
	})
}

exports.delete = function (req, res) {
	MetroStop.remove({_id: req.params.metroStopId}, function (err, metroStop) {
		if (err) return res.status(500).send(err)
		res.json({ message: 'MetroStop successfully deleted' })
	})
}
