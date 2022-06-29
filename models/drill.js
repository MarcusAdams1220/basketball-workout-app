const db = require('../db/db')

const Drill = {

  findAll: () => {
    const sql = 'SELECT * FROM drills'
    return db
      .query(sql)
      .then(dbRes => dbRes.rows)
  },
  findShooting: () => {
    const sql = "SELECT * FROM drills WHERE category = 'shooting'"
    return db
      .query(sql)
      .then(dbRes => dbRes.rows)
  },
  findFinishing: () => {
    const sql = "SELECT * FROM drills WHERE category = 'finishing'"
    return db
      .query(sql)
      .then(dbRes => dbRes.rows)
  },
  findBallHandling: () => {
    const sql = "SELECT * FROM drills WHERE category = 'ball handling'"
    return db
      .query(sql)
      .then(dbRes => dbRes.rows)
  }
}

module.exports = Drill