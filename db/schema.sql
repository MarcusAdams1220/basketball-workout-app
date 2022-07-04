CREATE DATABASE basketball_workout_app;
\c basketball_workout_app

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password_digest TEXT
);

CREATE TABLE drills(
  id SERIAL PRIMARY KEY,
  title TEXT,
  category TEXT,
  video_url TEXT,
  instructions TEXT
);

CREATE TABLE workouts(
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  workout_id INTEGER,
  workout_duration INTEGER,
  drill_title TEXT,
  drill_category TEXT,
  drill_video_url TEXT,
  drill_instructions TEXT
);

INSERT INTO drills(title, category, video_url, instructions)
VALUES
('Wing Lift', 'shooting', 'https://youtu.be/I0dxw9smZ7k', 'Make 10 shots from the right wing & 10 shots from the left wing'),
('Wing Flare', 'shooting', 'https://youtu.be/yJRxXtJ3roQ', 'Make 10 shots from the right wing & 10 shots from the left wing'),
('Transition 3', 'shooting', 'https://youtu.be/IwE4V6TYliM', 'Make 10 shots from anywhere around the 3-point line'),
('Percentage Shooting: Pull ups', 'shooting', 'https://youtu.be/0M0LuuLHO_I', 'Complete this challenge once'),
('Lateral Shift Pull ups', 'shooting', 'https://youtu.be/aGp-_5S7Wb0', 'Make 10 shots moving right & 10 shots moving left'),
('Curl Shooting', 'shooting', 'https://youtu.be/dwE7Xg2M58Y', 'Make 10 shots moving right & 10 shots moving left'),
('21 Drill: Pull ups', 'shooting', 'https://youtu.be/QzfUJNxB7u4', 'Complete this challenge once'),
('Plus Minus Challenge', 'shooting', 'https://youtu.be/NgGqEMHvVQk', 'Complete this challenge once'),
('5 Shot Series', 'shooting', 'https://youtu.be/CNbohfllyuk', 'Complete this drill from 5 spots around the 3-point line'),
('Consecutive Makes: 3 Point', 'shooting', 'https://youtu.be/JpMnMp0zDL0', 'Complete this drill for 10 minutes or until you make 10 shots in a row'),
('21 Drill: Catch & Shoot', 'shooting', 'https://youtu.be/BX9AM_x3qLU', 'Complete this challenge once'),
('U Drill', 'shooting', 'https://youtu.be/T3bSmy9SQ7k', 'Complete this drill until you make 10 shots'),
('Consecutive Makes: Mid Range', 'shooting', 'https://youtu.be/u7Y_wxUwyGk', 'Complete this drill for 10 minutes or until you make 10 shots in a row'),
('Dribble Manipulation', 'ball handling', 'https://youtu.be/Owsl1BLts6M', 'Complete 20 reps'),
('Behind The Back Manipulation', 'ball handling', 'https://youtu.be/JCMT0H87oyU', 'Complete 50 reps'),
('Off Hand Activation', 'ball handling', 'https://youtu.be/bUXswifObJY', 'Complete this drill for 60 seconds with each hand'),
('Protection Dribbles', 'ball handling', 'https://youtu.be/ey0DBt9bZFc', 'Complete this drill for 60 seconds with each hand'),
('Activated Exchange Drags', 'ball handling', 'https://youtu.be/5cIRh4s-F68', 'Complete this drill for 45 seconds each side'),
('90 Second Challenge', 'ball handling', 'https://youtu.be/a8O2SgOsOvA', 'Complete 3 rounds of this drill & try to improve your score each time'),
('Veer Finish', 'finishing', 'https://youtu.be/VwV5rwav6tU', 'Make 10 layups in total (alternating side on each rep)'),
('Up & Under Finish', 'finishing', 'https://youtu.be/rI6xxKTXFT8', 'Make 10 layups each side (alternating options on each rep)'),
('Slide By Finishes', 'finishing', 'https://youtu.be/Lq8MliAM6u8', 'Make 10 layups each side (alternating options on each rep)'),
('Euro Step Options', 'finishing', 'https://youtu.be/8mIR2TB5YtU', 'Make 10 layups each side (alternating options on each rep)'),
('Hip Rotation & Pro Hop / Euro Step', 'finishing', 'https://youtu.be/gXJtM4IKS10', 'Make 10 layups each side (alternating options on each rep)'),
('Floater Options', 'finishing', 'https://youtu.be/Je8Tj8pYmwU', 'Make 10 layups each side (alternating options on each rep)');


-- Queries To Access Workout Data In Drill.js
SELECT DISTINCT ON (category) *
  FROM (SELECT * FROM drills ORDER BY random()) t
  WHERE category = 'shooting'
  OR category = 'finishing'
  OR category = 'ball handling';

(SELECT * FROM drills WHERE category = 'shooting' ORDER BY random() LIMIT 2)
UNION
(SELECT * FROM drills WHERE category = 'finishing' ORDER BY random() LIMIT 1);

-- Query to access latest workout_id for the given user
SELECT MAX(workout_id)
FROM (SELECT * FROM workouts WHERE user_id = 6) t;