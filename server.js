const { json } = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 4567;
const sessions = require('./middlewares/sessions')
const Drill = require('./models/drill')
const Workout = require('./models/workout')
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
    .findByEmail(email)
    .then(user => {
      if (user) {
        res.status(400).json({error: '🚨 User Already Exists'})
      } else {
        User
          .create(name, email, password_digest)
          .then(user => res.json(user))
      }
    })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  User
    .findByEmail(email)
    .then(user => {
      if (!user) {
        res.json({error: '🚫 This user does not exist'})
      } else {
        const isValidPassword = bcrypt.compareSync(password, user.password_digest)
        if (user && isValidPassword) {
          req.session.userId = user.id
          res.json(user)
        } else {
          res.json({error: '🙅‍♂️ The password you entered is incorrect'})
        }
      }
    })
})

app.put('/logout', (req, res) => {
  req.session.destroy()
})

app.post('/workout/:duration', (req, res) => {
  // Use req.body.length to store the number of drills
  const drills = req.body
  const duration = req.params.duration
  const userId = req.session.userId
  Workout
    .findLatestWorkout(userId)
    .then(latestWorkoutId => {
      latestWorkoutId += 1
      drills.forEach (drill => {
        Workout
          .add(userId, latestWorkoutId, duration, drill.title, drill.category, drill.video_url, drill.instructions)
      })
    })
})

app.get('/user/:id', (req, res) => {
  const userId = req.params.id
  Workout
    .findAll(userId)
    .then(workouts => res.json(workouts))
})

app.get('/session', (req, res) => {
  if (req.session.userId) {
    User
      .findById(req.session.userId)
      .then(user => res.json(user))
  }
})

const path = require('path')
app.use(express.static(path.join(__dirname, './build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});
