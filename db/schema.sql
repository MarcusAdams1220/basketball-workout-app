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


INSERT INTO drills(title, category, video_url, instructions)
VALUES
-- Shooting Drills
('5 Minute Challenge (3-Point)', 'shooting', 'https://youtu.be/WPUYYWlCIyg', 'Make as many shots as possible in 5 minutes'),
('Drop & Pound Shooting', 'shooting', 'https://youtu.be/2POsCAcom0M', 'Make 10 shots from mid-range'),
('Quick Pound Shooting', 'shooting', 'https://youtu.be/zUV0NMWdVNc', 'Make 10 shots from mid-range'),
('Curl Cut Balance', 'shooting', 'https://youtu.be/mFYRSl6IFGE', 'Make 10 shots moving in each direction'),
('5-Minute Challenge (Flare & Shoot)', 'shooting', 'https://youtu.be/OLVvz5DkEDg', 'Make as many shots as possible in 5 minutes'),
('Slide Balance Jumpers', 'shooting', 'https://youtu.be/a5qY756vo6U', 'Make 10 shots moving in each direction'),
('Balance Free Throws', 'shooting', 'https://youtu.be/-OLKCqlR_Cs', 'Make 15 free throws'),
-- Ball Handling Drills
('Dribble Manipulation', 'ball handling', 'https://youtu.be/Owsl1BLts6M', 'Complete 20 reps'),
('Behind The Back Manipulation', 'ball handling', 'https://youtu.be/JCMT0H87oyU', 'Complete 50 reps'),
('Off Hand Activation', 'ball handling', 'https://youtu.be/bUXswifObJY', 'Complete this drill for 60 seconds with each hand'),
('Protection Dribbles', 'ball handling', 'https://youtu.be/ey0DBt9bZFc', 'Complete this drill for 60 seconds with each hand'),
('Activated Exchange Drags', 'ball handling', 'https://youtu.be/5cIRh4s-F68', 'Complete this drill for 45 seconds each side'),
('90 Second Challenge', 'ball handling', 'https://youtu.be/a8O2SgOsOvA', 'Complete 3 rounds of this drill & try to improve your score each time'),
-- Finishing Drills
('Veer Finish', 'finishing', 'https://youtu.be/VwV5rwav6tU', 'Make 10 layups in total (alternating side on each rep)'),
('Up & Under Finish', 'finishing', 'https://youtu.be/rI6xxKTXFT8', 'Make 10 layups each side (alternating options on each rep)'),
('Slide By Finishes', 'finishing', 'https://youtu.be/Lq8MliAM6u8', 'Make 10 layups each side (alternating options on each rep)'),
('Euro Step Options', 'finishing', 'https://youtu.be/8mIR2TB5YtU', 'Make 10 layups each side (alternating options on each rep)'),
('Floater Options', 'finishing', 'https://youtu.be/Je8Tj8pYmwU', 'Make 10 layups each side (alternating options on each rep)');


-- DO NOT RUN: Queries To Access Workout Data In Drill.js
SELECT DISTINCT ON (category) *
  FROM (SELECT * FROM drills ORDER BY random()) t
  WHERE category = 'shooting'
  OR category = 'finishing'
  OR category = 'ball handling';

(SELECT * FROM drills WHERE category = 'shooting' ORDER BY random() LIMIT 2)
UNION
(SELECT * FROM drills WHERE category = 'finishing' ORDER BY random() LIMIT 1);