# Daily Check-In Specification

## Overview
A single-form daily logging experience where users can quickly record their weight, workouts, and meals. Nothing is mandatory — users fill in only what they know, and the app carries forward previous values (like weight) when unchanged.

## User Flows
- Open check-in and see today's form with current/previous values displayed
- Optionally update weight (previous value shown if unchanged)
- Optionally mark that a workout was done, then select exercise type(s) from a list
- For each exercise, optionally add details (sets/reps/weight for strength, time/distance for cardio/walking)
- Optionally fill in kcal for each meal slot (Breakfast, Lunch, Dinner, Snacks)
- Submit check-in (can be partial — anything filled counts)

## UI Requirements
- Single card/form layout — all sections visible, fill what you want
- Weight and exercise type are most prominent in the UI
- Progressive disclosure: workout detail fields only appear after marking "workout done"
- Contextual fields: distance/time only shown for Cardio or Walking exercises
- Exercise type picker with: Chest, Lower Back, Upper Back, Shoulders, Arms, Legs, Core, Cardio, Walking
- Support multiple exercises per workout (e.g., Chest + Arms)
- Each exercise has optional detail fields (sets/reps/weight or time/distance depending on type)
- Fixed meal slots: Breakfast, Lunch, Dinner, Snacks — each with kcal input
- Show previous weight value as placeholder/default

## Configuration
- shell: true
