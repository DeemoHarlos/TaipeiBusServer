const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const log = require('./log')
const argv = require('minimist')(process.argv.slice(2));

var app = express()
var port = argv.p || 3001
var database = argv.d || 'mongodb://127.0.0.1/TaipeiBus'

// Model Declaration, if unused we use plain 'require'
require('./metro/model/metroStop')
//require('./metro/model/metroSection')
require('./metro/model/metroRoute')

// mongoose.Promise = global.Promise
mongoose.connect(database, function (err, res) {
	if (err) log.printLog('error','ERROR connecting to: '   + database + '. ',err)
	else     log.printLog('info','Succeeded connected to: ' + database)
})

app.use((req,res,next)=>{
	log.listenResEnd(req,res)
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api')
})

// Routing a checking function to verify token
app.use('/metroStop'   , require('./metro/metroStop'))
//app.use('/metroSection', require('./metro/metroSection'))
app.use('/metroRoute'  , require('./metro/metroRoute'))

app.listen(port, ()=>{
	log.printLog('info','Listening on port ' + (port+'').cyan)
})
