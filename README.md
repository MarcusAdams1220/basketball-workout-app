# Basketball Workout Generator
<a href="https://warm-lowlands-83978.herokuapp.com/">Go To The App</a>

## Overview
<p> This app helps basketball players improve their skills by generating full workouts that are custom tailored to suit their personal goals.</p>

## Tech Stack
<p>Back-End:
<ul>
  <li>Postgresql</li>
  <li>Express.js</li>
</ul>
<p>Front-End:
<ul>
  <li>React</li>
  <li>Typescript</li>
</ul>

## User Journey
<ol>
  <li>Users will begin by either logging in or creating a new account.</li>
  <li>After logging in the user will be presented with a workout builder that allows them to select which skills they want to work on & how long they have to workout.</li>
  <li>After adjusting the settings for their workout & clicking the "Create Workout" button, a workout will be automatically created for them.
  <br>
  (Workouts include videos tutorials & drill instructions)
  </li>
  <li>After completing a workout, the user can click the "Mark As Complete" button & update their profile.</li>
  <li>The profile page shows the user how many workouts they've completed, the total time they've spent training (in hours  minutes) & their ranking.</li>
</ol>

## Code That I'm Proud Of
<p>I used the following code to get drills from the database based on user inputs which I then used to create customised workouts:

```
SELECT DISTINCT ON (category) *
FROM (SELECT * FROM drills ORDER BY random()) t
WHERE category = 'shooting'
OR category = 'finishing'
OR category = 'ball handling'
```

```
(SELECT * FROM drills WHERE category = 'shooting' ORDER BY random() LIMIT 2)
UNION
(SELECT * FROM drills WHERE category = 'finishing' ORDER BY random() LIMIT 1)
```

<p>(The categories were replaced with the user's selected skills)</p>

