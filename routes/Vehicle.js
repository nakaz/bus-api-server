const {
  http,
  express,
  router,
  BUS_KEY,
  BusDataParser
} = require('./helpers')

const VEHICLE_URL = 'http://api.thebus.org/vehicle/?key=';
const VEHICLE_PARAM = '&num=';

const VEHICLE_URI = `${VEHICLE_URL}${BUS_KEY}${VEHICLE_PARAM}`;

router.get('/:vehicleId', (req, res) => {
  const vehicleId = req.params.vehicleId
  http.get(`${VEHICLE_URI}${vehicleId}`, function (resp){
    let data = '';
    resp.on('data', function (chunk){
      data += chunk;
    });
    resp.on('end', function (){
      BusDataParser(data)
        .then(result => res.json(result))
        .catch(err => {
          res.status(500)
          res.json({error: err})
        })
    });
  }).on('error', function (err){
    res.status(500)
    res.json({error: err})
  });
})

module.exports = router

