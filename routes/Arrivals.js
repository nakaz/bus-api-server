const {
  http,
  express,
  router,
  BUS_KEY,
  BusDataParser
} = require('./helpers')

const ARRIVAL_URL = 'http://api.thebus.org/arrivals/?key=';
const STOP_PARAM = '&stop=';

const ARRIVAL_URI = `${ARRIVAL_URL}${BUS_KEY}${STOP_PARAM}`

router.get('/stop/:stopId', (req, res) => {
  const stopId = req.params.stopId
  http.get(`${ARRIVAL_URI}${stopId}`, function (resp){
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
