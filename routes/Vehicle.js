const {
  http,
  express,
  router,
  BUS_KEY,
  BusAPIQuery
} = require('./helpers')

const VEHICLE_URL = 'http://api.thebus.org/vehicle/?key=';
const VEHICLE_PARAM = '&num=';

const VEHICLE_URI = `${VEHICLE_URL}${BUS_KEY}${VEHICLE_PARAM}`;

router.get('/:vehicleId', (req, res) => {
  const vehicleId = req.params.vehicleId
  BusAPIQuery(VEHICLE_URI, vehicleId)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(500)
      res.json({error: err})
    })
})

module.exports = router

