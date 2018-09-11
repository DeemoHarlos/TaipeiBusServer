const log = require('./log')
const request = require('request')

var metroStop    = require('./metro/initData/metroStop')
var metroSection = require('./metro/initData/metroSection')
var metroRoute   = require('./metro/initData/metroRoute')

metroRoute.forEach((e,i,a)=>{
	var sectionData = []
	request.get('http://localhost:3001/metroSection/', function (err, res, body) {
		sectionData = JSON.parse(body)
		if (err) console.log('- error:', err) // Print the error if one occurred
		else console.log('- statusCode:', res.statusCode)

		e.routes.forEach((re,ri,ra)=>{
			re.sections.forEach((se,si,sa)=>{
				var section = sectionData.find((ele)=>{return ele.id == se})
				sa[si] = section._id
			})
		})

		request.post('http://localhost:3001/metroRoute/', function (err, res, body) {
			if (err) console.log('error:', err) // Print the error if one occurred
			else console.log('statusCode:', res.statusCode, body)
		}).form(e)
	})
})


