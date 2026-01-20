# Data Model

## Entities

### User
The person using the app, tracking their fitness journey. Each user has their own data, streaks, and personalized insights.

### DailyCheckIn
A single day's quick log entry for the daily prompt experience. Serves as the central hub connecting that day's weight, workouts, and meals for easy review.

### WeightEntry
A bodyweight measurement recorded on a specific date. Used for trend visualization and correlation analysis.

### Workout
A training session on a specific date. Contains the exercises performed during that session.

### Exercise
A specific movement performed within a workout, including sets, reps, and weight used. Tracks progressive overload over time.

### Meal
A logged meal on a specific date, focused on protein intake and overall consumption. Kept simple to reduce tracking friction.

### Streak
Tracks consecutive days of logging to gamify consistency and maintain user motivation. Each user has one active streak.

### Insight
An AI-generated correlation pattern that connects user habits to their results. Examples: "You lift heavier after rest days" or "Weight drops when protein is logged consistently."

## Relationships

- User has many DailyCheckIns
- User has many WeightEntries
- User has many Workouts
- User has many Meals
- User has one Streak
- User has many Insights
- Workout has many Exercises
- DailyCheckIn may reference that day's WeightEntry, Workout(s), and Meal(s)
