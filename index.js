const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const Arrivals = require('./routes/Arrivals')
const Vehicle = require('./routes/Vehicle')
const BusRoute = require('./routes/BusRoute')

app.use('/arrivals', Arrivals)
app.use('/vehicle', Vehicle)
app.use('/route', BusRoute)

var server = app.listen(process.env.PORT || PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Da Bus server stay listening at http://%s:%s', host, port);
});
