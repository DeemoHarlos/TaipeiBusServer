'use strict'

const pad = require('pad')
const colors = require('colors')

var app = require('express').Router()

function currentTime(){
  var date = new Date(Date.now())
  var str = ''
  str += date.getFullYear() + '/'
  str += pad(2,(date.getMonth()+1),'0') + '/'
  str += pad(2,date.getDate(),'0') + ' '
  str += pad(2,date.getHours(),'0') + ':'
  str += pad(2,date.getMinutes(),'0') + ':'
  str += pad(2,date.getSeconds(),'0') + '.'
  str += pad(3,date.getMilliseconds(),'0') + ' '
  var utc = -date.getTimezoneOffset()/60
  str += 'UTC' + ((utc>0)?('+'+utc):(utc==0?' 0':utc))
  return str
}

function colorIp(ip){
  var nip = ''
  if(ip.slice(0,7) == '::ffff:')nip = '::ffff:'.gray + ip.slice(7)
  else nip = ip
  return nip
}

function colorStatus(status){
  var stat = ''
  switch(Math.floor(status/100)){
    case 1: stat = (status+'').cyan;break
    case 2: stat = (status+'').green;break
    case 3: stat = (status+'').yellow;break
    case 4: stat = (status+'').red;break
    case 5: stat = (status+'').magenta;break
  }
  return stat;
}

function retrieve(req,res,id){
  res.locals.id = req.id = id
  res.locals.furl = req.furl = ((req.protocol || 'unknown'.red ) + '://').grey + 
    (req.get('host') || 'unknown'.red ) + req.originalUrl.yellow
  res.locals.originalUrl = req.originalUrl
}

var log = {}

log.reqid = 0

log.printLog = function(type){
  var str = ''
  var args = Array.prototype.slice.call(arguments,
    (type == 'req' || type == 'res')?2:1)
  var id = (typeof(arguments[1]) == 'number' && 
    (type == 'req' || type == 'res'))?(arguments[1]+''):undefined

  switch(type){
    case 'error' : str += '[ ERROR  ]'.bgRed.black;break
    case 'warn' : str += '[  WARN  ]'.bgYellow.black;break
    case 'info' : str += '[  INFO  ]'.bgCyan.black;break
    case 'req' : str += '[REQUEST ]'.bgGreen.black;break
    case 'res' : str += '[RESPONSE]'.bgBlue.white;break
    default : str += '[  INFO  ]'.bgCyan.black
  }
  str += ' ' + currentTime().gray
  if(id) str += '  # ' + pad(15,id.cyan,'0'.gray)
  for(var m of args) str += '\n  ' + m
  console.log(str)
}

log.printReq = function(req){
  this.printLog('req',req.id,
    'IP          : ' + colorIp(req.ip) + (':' + req.connection.remotePort).gray,
    'Request URL : ' + req.furl,
    'METHOD      : ' + req.method.bgWhite.black)
}

log.request = function(req,res){
  this.reqid ++
  retrieve(req,res,this.reqid)
}

log.printRes = function(res){
  this.printLog('res',res.locals.id,
    'Resource    : ' + res.locals.originalUrl.yellow,
    'STATUS      : ' + colorStatus(res.statusCode))
}

log.listenResEnd = function(req,res){
  this.request(req,res)
  this.printReq(req)
  res.on('finish',()=>{
    this.printRes(res)
  })
}

module.exports = log