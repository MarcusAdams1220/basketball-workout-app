const express = require('express')
const app = express()
const port = 4567
const Drill = require('./models/drill')

app.listen(port, () => console.log(`Listening on port: ${port}`))

app.use(express.json())

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