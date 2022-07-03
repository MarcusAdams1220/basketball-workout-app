const pg = require('pg')

const localDbName = 'basketball_workout_app'
const localDbPassword = process.env.DB_PASSWORD

let db;
if (process.env.NODE_ENV === 'production') {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  db = new pg.Pool({
    database: localDbName
  })
}

module.exports = db