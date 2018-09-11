var mongoose = require('mongoose')
var MetroSection = mongoose.model('MetroSection')

exports.list = function (req, res) {
	MetroSection.find({}, function (err, metroSection) {
		if (err) return res.status(500).send(err)
		res.json(metroSection)
	})
}

exports.create = function (req, res) {
	var newMetroSection = new MetroSection(req.body)
	newMetroSection.save(function (err, metroSection) {
		if (err) return res.status(500).send(err)
		res.json({'success': true, 'data': metroSection})
	})
}

exports.read = function (req, res) {
	MetroSection.findById(req.params.metroSectionId, function (err, metroSection) {
		if (err) return res.status(500).send(err)
		res.json(metroSection)
	})
}

exports.update = function (req, res) {
	MetroSection.findOneAndUpdate(req.params.metroSectionId, req.body, {new: true}, function (err, metroSection) {
		if (err) return res.status(500).send(err)
		res.json(metroSection)
	})
}

exports.delete = function (req, res) {
	MetroSection.remove({_id: req.params.metroSectionId}, function (err, metroSection) {
		if (err) return res.status(500).send(err)
		res.json({ message: 'MetroSection successfully deleted' })
	})
}
