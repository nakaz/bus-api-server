var express = require('express');
var app = express();
var http = require('http');

var config = require('./config/config.json');

var PORT = config.port;

var BUS_KEY = process.env.DABUS_APP_KEY;

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

// Converts Array values ot it's first string value
function parseObj(data){
  for(var i in data){
    for (var j in data[i]){
      if (data[i][j].length > 1){
        var arr = [];
        data[i][j].forEach(function(el){
          var obj = {}
          for(var key in el){
            obj[key] = el[key][0]
          }
          arr.push(obj)
        })
        data[i][j] = arr
      }else if (typeof data[i][j][0] === 'object'){
        for(var k in data[i][j][0]){
          data[i][j][0][k] = data[i][j][0][k][0];
        }
      }
      else{
        data[i][j] = data[i][j][0];
      }
    }
  }
  return (data);
}

// ARRIVALS
var ARRIVAL_URL = 'http://api.thebus.org/arrivals/?key=';
var STOP_PARAM = '&stop=';

var ARRIVAL_URI = ARRIVAL_URL + BUS_KEY + STOP_PARAM;

// app.get('/arrivals', function (req, res){
//   var test = req.param('stop');
//   res.send(req.stop);
// });

app.get('/arrivals', function (req, res){
  stopId = req.param('stop');
  var data = '';
  http.get(ARRIVAL_URI + stopId, function (resp){
    resp.on('data', function (chunk){
      data += chunk;
    });
    resp.on('end', function (){
      parser.parseString(data, function (err, result){
        res.send(parseObj(JSON.stringify(result)));
      });
      console.log('au pau');
    });
  }).on('error', function (err){
    console.log(e.message);
  });
});

// VEHICLES
var VEHICLE_URL = 'http://api.thebus.org/vehicle/?key=';
var VEHICLE_PARAM = '&num=';

var VEHICLE_URI = VEHICLE_URL + BUS_KEY + VEHICLE_PARAM;

app.get('/vehicle', function (req, res){
  vehicleId = req.param('id');
  var data = '';
  http.get(VEHICLE_URI + vehicleId, function (resp){
    resp.on('data', function (chunk){
      data += chunk;
    });
    resp.on('end', function (){
      parser.parseString(data, function (err, result){
        res.send(parseObj(JSON.stringify(result)));
      });
    });
  }).on('error', function (err){
    console.log(e.message);
  });
});

// ROUTES
var ROUTE_URL = 'http://api.thebus.org/route/?key=';
var BUS_NUM_PARAM = '&route=';
var BUS_NAME_PARAM = '&headsign=';

var NUM_URI = ROUTE_URL + BUS_KEY + BUS_NUM_PARAM;
var NAME_URI = ROUTE_URL + BUS_KEY + BUS_NAME_PARAM;

app.get('/route', function (req, res){
  routeId = req.param('num');
  var data = '';
  http.get(NUM_URI + routeId, function (resp){
    resp.on('data', function (chunk){
      data += chunk;
    });
    resp.on('end', function (){
      parser.parseString(data, function (err, result){
        res.send(parseObj(JSON.stringify(result)));
      });
    });
  }).on('error', function (err){
    console.log(e.message);
  });
});

app.get('/route', function (req, res){
  stopId = req.param('name');
  var data = '';
  http.get(NAME_URI + stopId, function (resp){
    resp.on('data', function (chunk){
      data += chunk;
    });
    resp.on('end', function (){
      parser.parseString(data, function (err, result){
        res.send(parseObj(JSON.stringify(result)));
      });
    });
  }).on('error', function (err){
    console.log(e.message);
  });
});

var server = app.listen(process.env.PORT || PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Da Bus server stay listening at http://%s:%s', host, port);
});
