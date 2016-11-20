var http = require('http')
var fs = require('fs')
var async = require('async')
var path = require('path')

var port = 3000

var server = http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'application/json')

  async.each([
    'du.json',
    'dum.json',
    'dummy.json'
  ], function (file, cb) {
    var filePath = path.join(__dirname, 'data/' + file)
    var content = fs.readFileSync(filePath)

    fs.writeFile(file, JSON.stringify(content), function (err) {
      if (err) {
        return cb(err) // if error, pass the error to be handled
      }
      console.log(file + ' was updated.')
      cb()
    })
  }, function (err) {
    if (err) {
      console.log('A file failed to process')
    } else {
      console.log('All files have been processed successfully')
    }
  })
})

server.on('listening', function () {
  console.log('Server is ready on port:', port)
})

server.listen(port, 'localhost')
