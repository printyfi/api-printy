const express = require('express')
const compression = require('compression')
const routes  = require('./routes/routes')
const morgan = require('morgan')
const helmet = require('helmet')
const https = require('https')
const fs = require('fs')  // To read SSL certificates
const auth = require('http-auth')
const http = require('http')

// Define basic authentication
var basic = auth.basic({ realm: 'printyfinance.com' }, function (username, password, callback) {
  callback(username === 'A7DA9A05073111700E47211080B9A9FA231E63208D1746450BF2FCDEB55899EA' && password === '0A6C2D22F147093ECCDEAE3181495A6F526E3DB570C2EEA93DB9C108FABCE979')
})

var app = express()

// CORS headers
app.all('/*', function(req, res, next) {
  res.set('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization,Username,Password,Signature,X-Access-Token,X-Key')
  if (req.method == 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
})

// Health check endpoint
app.all('/health', function(req, res, next) {
  res.status(200)
  res.json({
    'status': 200,
    'message': 'health ok'
  })
})

app.use(morgan('dev'))

app.use(auth.connect(basic))  // Basic Authentication

app.use(helmet())  // Add security headers
app.use(compression())  // Enable gzip compression

app.use('/', routes)

// Handle response data
function handleData(req, res) {
  if (res.statusCode === 205) {
    if (res.body) {
      if (res.body.length === 0) {
        res.status(204)
        res.json({
          'status': 204,
          'message': 'No Content'
        })
      } else {
        res.status(200)
        res.json(res.body)
      }
    } else {
      res.status(204)
      res.json({
        'status': 204,
        'message': 'No Content'
      })
    }
  } else if (res.statusCode === 400) {
    res.status(res.statusCode)
    res.json({
      'status': res.statusCode,
      'message': 'Bad Request'
    })
  } else if (res.statusCode === 401) {
    res.status(res.statusCode)
    res.json({
      'status': res.statusCode,
      'message': 'Unauthorized'
    })
  } else if (res.statusCode) {
    res.status(res.statusCode)
    res.json(res.body)
  } else {
    res.status(200)
    res.json(res.body)
  }
}
app.use(handleData)

// Error handling
app.use(function(err, req, res) {
  if (err) {
    if (res.statusCode == 500) {
      res.status(250)
      res.json({
        'status': 250,
        'message': err
      })
    } else if (res.statusCode == 501) {
      res.status(250)
      res.json({
        'status': 250,
        'message': err
      })
    } else {
      res.status(500)
      res.json({
        'status': 500,
        'message': err.message
      })
    }
  } else {
    res.status(404)
    res.json({
      'status': 404,
      'message': 'Request not found'
    })
  }
})

// Setup SSL certificates and HTTPS server
const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.printyfinance.com/privkey.pem', 'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.printyfinance.com/fullchain.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }

// Set HTTP to HTTPS redirect
app.use(function(req, res, next) {
  if (req.protocol !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  return next();
});

// Run HTTP and HTTPS servers
app.set('port', 3005)

// HTTPS Server
https.createServer(credentials, app).listen(3005, function () {
  console.log('HTTPS server running on port 3005')
})

// HTTP Server for redirect
http.createServer(app).listen(80, function () {
  console.log('HTTP server running on port 80')
})

Array.prototype.contains = function(obj) {
  var i = this.length
  while (i--) {
    if (this[i] === obj) {
      return true
    }
  }
  return false
}
