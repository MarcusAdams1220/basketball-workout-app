# basketball-workout-app.

# Challenging Problem:
SELECT DISTINCT ON (category) *
  FROM (SELECT * FROM drills ORDER BY random()) t
  WHERE category = 'shooting'
  OR category = 'finishing'
  OR category = 'ball handling'
  LIMIT 3;