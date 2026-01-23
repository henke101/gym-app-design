# Daily Check-In — Test Specifications

## Unit Tests

### DailyCheckInForm Component

#### Rendering
- [ ] Renders streak badge with current streak count
- [ ] Renders date navigation with previous/next buttons
- [ ] Renders weight input card with placeholder from previousWeight
- [ ] Renders workout card with toggle button
- [ ] Renders meals card with all four slot inputs
- [ ] Renders submit button

#### Date Navigation
- [ ] Displays "Today" for current date
- [ ] Displays "Yesterday" for previous date
- [ ] Displays formatted date for other days
- [ ] Disables next button when on newest date
- [ ] Disables previous button when on oldest date
- [ ] Calls onSelectDate when navigating

#### Weight Input
- [ ] Shows previousWeight as placeholder when weight is null
- [ ] Displays current weight when set
- [ ] Calls onUpdateWeight with number when valid input
- [ ] Calls onUpdateWeight with null when input cleared
- [ ] Accepts decimal values (step 0.1)

#### Workout Section
- [ ] Shows "Mark Done" button when workout not completed
- [ ] Shows "Done" with checkmark when workout completed
- [ ] Calls onToggleWorkout when button clicked
- [ ] Shows exercise list when workout completed
- [ ] Hides exercise list when workout not completed
- [ ] Shows "Add Exercise" button when workout completed

#### Exercise Picker
- [ ] Opens modal when "Add Exercise" clicked
- [ ] Displays strength exercises grouped together
- [ ] Displays cardio exercises grouped together
- [ ] Closes modal when backdrop clicked
- [ ] Closes modal when X button clicked
- [ ] Calls onAddExercise with selected type

#### Exercise Item
- [ ] Displays exercise type name
- [ ] Shows sets/reps/weight fields for strength exercises
- [ ] Shows time/distance fields for cardio exercises
- [ ] Calls onUpdateExercise when field changed
- [ ] Calls onRemoveExercise when X button clicked
- [ ] Shows kg unit for weight, min for time, km for distance

#### Meals Section
- [ ] Renders all four meal slot inputs
- [ ] Displays current kcal value when set
- [ ] Shows placeholder when value is null
- [ ] Calls onUpdateMeal when input changed
- [ ] Displays total calories when any meals logged
- [ ] Hides total when no meals logged

#### Submit
- [ ] Calls onSubmit with check-in ID when clicked
- [ ] Button has visual active state on press

### Edge Cases
- [ ] Handles empty dailyCheckIns array gracefully
- [ ] Handles check-in with no exercises
- [ ] Handles check-in with no meals
- [ ] Handles check-in with null weight

## Integration Tests

### User Flow: Complete Check-In

```gherkin
Scenario: User logs a complete daily check-in
  Given I am on the Daily Check-In page
  And today's check-in is displayed

  When I enter "85.4" in the weight field
  And I click "Mark Done" on the workout section
  And I click "Add Exercise"
  And I select "Chest"
  And I enter "4" sets, "10" reps, "80" kg
  And I click "Add Exercise"
  And I select "Cardio"
  And I enter "30" minutes, "5" km
  And I enter "500" for Breakfast
  And I enter "700" for Lunch
  And I enter "800" for Dinner
  And I enter "200" for Snacks
  And I click "Save Check-In"

  Then the check-in should be saved
  And the total calories should show "2200"
```

### User Flow: Partial Check-In

```gherkin
Scenario: User logs only weight
  Given I am on the Daily Check-In page

  When I enter "86.0" in the weight field
  And I click "Save Check-In"

  Then the check-in should be saved
  And workout should remain as not completed
  And meals should remain empty
```

### User Flow: Navigate Dates

```gherkin
Scenario: User views previous day's check-in
  Given I am on today's check-in
  And yesterday has a saved check-in

  When I click the left arrow

  Then I should see "Yesterday" as the date
  And I should see yesterday's saved values
  And the next arrow should be enabled
```

## Accessibility Tests

- [ ] All form inputs have associated labels
- [ ] Date navigation buttons have aria-labels
- [ ] Exercise picker modal traps focus
- [ ] Modal closes on Escape key
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets are at least 44x44px

## Visual Regression Tests

- [ ] Light mode appearance
- [ ] Dark mode appearance
- [ ] Mobile viewport (375px)
- [ ] Tablet viewport (768px)
- [ ] Workout expanded state
- [ ] Exercise picker modal open
- [ ] Error state (if applicable)
