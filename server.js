const { json } = require('body-parser')
const express = require('express')
const sessions = require('./middlewares/sessions')
const app = express()
const port = 4567
const Drill = require('./models/drill')
const User = require('./models/user')
const bcrypt = require('bcrypt')

app.listen(port, () => console.log(`Listening on port: ${port}`))

app.use(express.json())

app.use(sessions)

app.get('/api/drills/:data', (req, res) => {
  const params = req.params
  const data = params.data.split('-')
  let firstSkill
  let secondSkill
  let thirdSkill
  let numOfDrills
  if (data.length === 4) {
    firstSkill = data[0]
    secondSkill = data[1]
    thirdSkill = data[2]
    numOfDrills = data[3] / 5
  } else if (data.length === 3) {
    firstSkill = data[0]
    secondSkill = data[1]
    numOfDrills = data[2] / 5
  } else {
    firstSkill = data[0]
    numOfDrills = data[1] / 5
  }

  if (numOfDrills === 3 && firstSkill && secondSkill && thirdSkill) {
    Drill
      .find15MinWorkoutFrom3Categories(firstSkill, secondSkill, thirdSkill)
      .then(drills => res.json(drills))
    
  } else if (numOfDrills === 3 && firstSkill && secondSkill) {
    Drill
      .find15MinWorkoutFrom2Categories(firstSkill, secondSkill)
      .then(drills => res.json(drills))
  } else {
    Drill
      .findWorkout(firstSkill, secondSkill, thirdSkill, numOfDrills)
      .then(drills => res.json(drills))
  }
})

app.post('/signup', (req, res) => {
  const { name, email, password} = req.body
  const password_digest = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
  User
    .create(name, email, password_digest)
    .then(user => res.json(user))
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  User
    .findByEmail(email)
    .then(user => {
      const isValidPassword = bcrypt.compareSync(password, user.password_digest)
      if (user && isValidPassword) {
        req.session.userId = user.id
        res.json(user.name)
      }
    })
})