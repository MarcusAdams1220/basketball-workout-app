const db = require('../db/db')

const Drill = {
  findThreeDrills: (shooting, finishing, ballHandling) => {
    const sql = "SELECT DISTINCT ON (category) * FROM (SELECT * FROM drills ORDER BY random()) t WHERE category = $1 OR category = $2 OR category = $3"
    return db
      .query(sql, [shooting, finishing, ballHandling])
      .then(dbRes => dbRes.rows)
  },
  findWorkout: (shooting, finishing, ballHandling, numOfDrills) => {
    const sql = "SELECT * FROM (SELECT * FROM drills ORDER BY random()) t WHERE category = $1 OR category = $2 OR category = $3 LIMIT $4"
    return db
      .query(sql, [shooting, finishing, ballHandling, numOfDrills])
      .then(dbRes => dbRes.rows)
  }
}

module.exports = Drill