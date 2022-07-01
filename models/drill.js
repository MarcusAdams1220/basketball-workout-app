const db = require('../db/db')

const Drill = {
  find15MinWorkoutFrom3Categories: (firstSkill, secondSkill, thirdSkill) => {
    const sql = "SELECT DISTINCT ON (category) * FROM (SELECT * FROM drills ORDER BY random()) t WHERE category = $1 OR category = $2 OR category = $3"
    return db
      .query(sql, [firstSkill, secondSkill, thirdSkill])
      .then(dbRes => dbRes.rows)
  },
  find15MinWorkoutFrom2Categories: (firstSkill, secondSkill) => {
    const sql = "(SELECT * FROM drills WHERE category = $1 ORDER BY random() LIMIT 2) UNION (SELECT * FROM drills WHERE category = $2 ORDER BY random() LIMIT 1);"
    return db
      .query(sql, [firstSkill, secondSkill])
      .then(dbRes => dbRes.rows)
  },
  findWorkout: (firstSkill, secondSkill, thirdSkill, numOfDrills) => {
    const sql = "SELECT * FROM (SELECT * FROM drills ORDER BY random()) t WHERE category = $1 OR category = $2 OR category = $3 LIMIT $4"
    return db
      .query(sql, [firstSkill, secondSkill, thirdSkill, numOfDrills])
      .then(dbRes => dbRes.rows)
  }
}

module.exports = Drill