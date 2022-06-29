const pg = require("pg")
const db = new pg.Pool({
  database: "basketball_workout_app"
})

module.exports = db