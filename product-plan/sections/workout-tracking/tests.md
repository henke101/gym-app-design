# Workout Tracking — Test Specifications

## Unit Tests

### WorkoutTracking Component

#### Rendering
- [ ] Renders page title "Workouts"
- [ ] Renders date range picker
- [ ] Renders summary banner with improvement count
- [ ] Renders section header with exercise count
- [ ] Renders exercise progress cards grid
- [ ] Renders empty state when no exercises

#### Summary Banner
- [ ] Shows correct "X of Y exercises improving" count
- [ ] Shows correct training session count
- [ ] Uses max sessions from all exercises

#### Empty State
- [ ] Shows empty icon when exerciseProgress is empty
- [ ] Shows "No workout data yet" message
- [ ] Shows call-to-action text

### ExerciseProgressCard Component

#### Rendering
- [ ] Displays exercise type icon
- [ ] Displays exercise type name
- [ ] Displays latest weight with kg unit
- [ ] Displays weight change indicator
- [ ] Renders weight sparkline
- [ ] Displays latest volume in k format
- [ ] Displays volume change indicator
- [ ] Renders volume sparkline
- [ ] Displays session count

#### Styling
- [ ] Positive weight change shows lime color
- [ ] Positive volume change shows amber color
- [ ] Neutral/negative changes show zinc color
- [ ] Shows up arrow for positive changes

#### Interactions
- [ ] Calls onSelect when card clicked
- [ ] Has hover border effect
- [ ] Has active scale effect on click

### DateRangePicker Component

#### Rendering
- [ ] Shows calendar icon
- [ ] Displays formatted date range
- [ ] Shows dropdown chevron
- [ ] Renders dropdown when open

#### Dropdown
- [ ] Shows "Quick select" header
- [ ] Lists all preset options
- [ ] Shows "Current range" section
- [ ] Displays full date range

#### Interactions
- [ ] Opens dropdown on button click
- [ ] Closes dropdown on backdrop click
- [ ] Calls onChange with preset range when preset clicked
- [ ] Closes dropdown after selection

#### Presets
- [ ] "Last 7 days" calculates correct range
- [ ] "Last 14 days" calculates correct range
- [ ] "Last 30 days" calculates correct range
- [ ] "Last 90 days" calculates correct range

### MiniSparkline Component

#### Rendering
- [ ] Returns null when data has fewer than 2 points
- [ ] Renders SVG with correct viewBox
- [ ] Renders area fill path
- [ ] Renders line path
- [ ] Line follows data points

#### Styling
- [ ] Uses lime colors when color='lime'
- [ ] Uses amber colors when color='amber'
- [ ] Respects height prop

### Edge Cases
- [ ] Handles exercise with no weight change
- [ ] Handles exercise with no volume change
- [ ] Handles single data point (no sparkline)
- [ ] Handles very large volume numbers

## Integration Tests

### User Flow: View Exercise Progress

```gherkin
Scenario: User views their workout progress
  Given I am on the Workout Tracking page
  And I have logged workouts for multiple exercises

  Then I should see a summary of improving exercises
  And I should see cards for each exercise type
  And each card should show weight and volume trends
```

### User Flow: Change Date Range

```gherkin
Scenario: User selects a different date range
  Given I am on the Workout Tracking page
  And "Last 30 days" is currently selected

  When I click the date range picker
  And I click "Last 7 days"

  Then the picker should close
  And the date range should show last 7 days
  And exercise progress should update
```

### User Flow: Select Exercise

```gherkin
Scenario: User taps an exercise card
  Given I am on the Workout Tracking page
  And I can see exercise progress cards

  When I tap the "Chest" card

  Then onExerciseSelect should be called with "Chest"
  # Future: Could navigate to exercise detail view
```

### User Flow: Empty State

```gherkin
Scenario: User with no workout data
  Given I am a new user
  And I have not logged any workouts

  When I view the Workout Tracking page

  Then I should see the empty state
  And I should see "No workout data yet"
  And I should see encouragement to log first workout
```

## Accessibility Tests

- [ ] Exercise cards are keyboard accessible
- [ ] Date range picker is keyboard accessible
- [ ] Dropdown closes on Escape key
- [ ] Focus returns to trigger after dropdown closes
- [ ] Color alone doesn't convey progress (icons used)
- [ ] Touch targets are at least 44x44px

## Visual Regression Tests

- [ ] Light mode appearance
- [ ] Dark mode appearance
- [ ] Mobile viewport (375px)
- [ ] Tablet viewport (768px, 2-column grid)
- [ ] Date range picker open state
- [ ] Various progress states
- [ ] Empty state
