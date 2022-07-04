const db = require('../db/db')

const Workout = {
  findLatestWorkout: (userId) => {
    const sql = "SELECT MAX(workout_id) FROM (SELECT * FROM workouts WHERE user_id = $1) t;"
    return db
      .query(sql, [userId])
      .then(dbRes => dbRes.rows[0].max)
  },
  add: (userId, workoutId, workoutDuration, drillTitle, drillCategory, drilVideoUrl, drillInstructions) => {
    const sql = "INSERT INTO workouts (user_id, workout_id, workout_duration, drill_title, drill_category, drill_video_url, drill_instructions) VALUES ($1, $2, $3, $4, $5, $6, $7)"
    return db 
      .query(sql, [userId, workoutId, workoutDuration, drillTitle, drillCategory, drilVideoUrl, drillInstructions])
      .then(dbRes => dbRes.rows)
  },
  findAll: (userId) => {
    const sql = "SELECT * FROM workouts WHERE user_id = $1"
    return db
      .query(sql, [userId])
      .then(dbRes => dbRes.rows)
  }
}

module.exports = Workout