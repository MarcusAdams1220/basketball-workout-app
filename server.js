const express = require('express')
const app = express()
const port = 4567
const Drill = require('./models/drill')

app.listen(port, () => console.log(`Listening on port: ${port}`))

app.use(express.json())

app.get('/api/drills/:data', (req, res) => {
  const params = req.params
  const data = params.data.split('-')
  const shooting = data[data.indexOf('shooting')]
  const finishing = data[data.indexOf('finishing')]
  const ballHandling = data[data.indexOf('ball handling')]
  const numOfDrills = data[data.length-1] / 5

  if (numOfDrills === 3 && shooting && ballHandling && finishing) {
    Drill
    .findThreeDrills(shooting, finishing, ballHandling)
    .then(drills => res.json(drills))
    
  } else {
    Drill
    .findWorkout(shooting, finishing, ballHandling, numOfDrills)
    .then(drills => res.json(drills))
  }

  
})
app.get('/api/drills/shooting', (req, res) => {
  Drill
    .findShooting()
    .then(shootingDrills => res.json(shootingDrills))
})
app.get('/api/drills/finishing', (req, res) => {
  Drill
    .findFinishing()
    .then(finishingdDrills => res.json(finishingdDrills))
})
app.get('/api/drills/ball%20handling', (req, res) => {
  Drill
    .findBallHandling()
    .then(ballHandlingDrills => res.json(ballHandlingDrills))
})