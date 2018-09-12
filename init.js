const log = require('./log')
const request = require('request')

var metroStop    = require('./metro/initData/metroStop')
var metroRoute   = require('./metro/initData/metroRoute')

metroRoute.forEach((e,i,a)=>{
	var stopData = []
	request.get('http://140.112.211.69:3001/metroStop/', function (err, res, body) {
		stopData = JSON.parse(body)
		if (err) console.log('- error:', err) // Print the error if one occurred
		else console.log('- statusCode:', res.statusCode)

		e.routes.forEach((re,ri,ra)=>{
			re.stops.forEach((se,si,sa)=>{
				var stop = stopData.find(ele=>{return ele.id == se.stopId})
				sa[si].stopId = stop._id
			})
		})

		request.post('http://140.112.211.69:3001/metroRoute/', function (err, res, body) {
			if (err) console.log('error:', err) // Print the error if one occurred
			else console.log('statusCode:', res.statusCode, body)
		}).form(e)
	})
})


