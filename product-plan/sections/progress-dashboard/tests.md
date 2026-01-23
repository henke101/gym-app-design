# Progress Dashboard — Test Specifications

## Unit Tests

### ProgressDashboard Component

#### Rendering
- [ ] Renders page title "Progress"
- [ ] Renders Week/Month toggle
- [ ] Renders progress message based on weight change
- [ ] Renders three metric cards
- [ ] Renders three chart sections
- [ ] Renders day detail sheet when selectedDayDetail provided

#### Time Range Toggle
- [ ] Week button has active style when selectedTimeRange is 'week'
- [ ] Month button has active style when selectedTimeRange is 'month'
- [ ] Calls onTimeRangeChange with 'week' when Week clicked
- [ ] Calls onTimeRangeChange with 'month' when Month clicked

#### Progress Message
- [ ] Shows "Great progress!" when weight.change < 0
- [ ] Shows "Keep going!" when weight.change > 0
- [ ] Shows "Staying steady!" when weight.change === 0
- [ ] Displays correct kg value and period name

### MetricCard Component

#### Rendering
- [ ] Displays title, value, and unit
- [ ] Shows TrendingUp icon when change > 0
- [ ] Shows TrendingDown icon when change < 0
- [ ] Shows Minus icon when change === 0
- [ ] Displays change value with sign

#### Styling
- [ ] Positive changes show lime color
- [ ] Negative changes show red color
- [ ] Neutral changes show zinc color

### MiniChart Component

#### Line Chart
- [ ] Renders SVG path for line
- [ ] Renders area fill under line
- [ ] Renders Y-axis labels
- [ ] Renders X-axis date labels
- [ ] Renders interactive data points
- [ ] Highlights selected point

#### Bar Chart
- [ ] Renders bars for each data point
- [ ] Bar height corresponds to value
- [ ] Renders Y-axis labels
- [ ] Renders X-axis date labels
- [ ] Highlights selected bar

#### Dots Chart
- [ ] Renders checkmark for workout days (value=1)
- [ ] Renders small dot for rest days (value=0)
- [ ] Renders baseline connecting days
- [ ] Renders X-axis date labels
- [ ] Highlights selected day

#### Interactions
- [ ] Calls onPointClick when data point clicked
- [ ] Calls onPointClick when bar clicked
- [ ] Calls onPointClick when dot clicked

### DayDetailSheet Component

#### Rendering
- [ ] Displays formatted date in header
- [ ] Shows weight with kg unit
- [ ] Shows calories with kcal unit
- [ ] Shows workout checkmark or dash
- [ ] Lists meals with calories

#### Interactions
- [ ] Calls onClose when X button clicked
- [ ] Calls onClose when backdrop clicked
- [ ] Animates in from bottom

### Edge Cases
- [ ] Handles empty dailyMetrics array
- [ ] Handles metrics with missing dates
- [ ] Handles day with no workout
- [ ] Handles day with no meals

## Integration Tests

### User Flow: View Weekly Progress

```gherkin
Scenario: User views weekly progress
  Given I am on the Progress Dashboard
  And Week view is selected

  Then I should see the last 7 days of data
  And I should see week summary statistics
  And I should see weight trend for the week
  And I should see calorie intake for the week
  And I should see workout days for the week
```

### User Flow: Switch to Month View

```gherkin
Scenario: User switches to month view
  Given I am on the Progress Dashboard
  And Week view is selected

  When I click the "Month" button

  Then the Month button should be active
  And I should see the last 30 days of data
  And I should see month summary statistics
  And charts should update to show monthly data
```

### User Flow: View Day Details

```gherkin
Scenario: User taps a data point for details
  Given I am on the Progress Dashboard
  And I can see the weight chart

  When I tap on a data point for January 20

  Then a detail sheet should appear
  And I should see "Sat, Jan 20" in the header
  And I should see weight, calories, and workout status
  And I should see meal breakdown
```

### User Flow: Close Day Details

```gherkin
Scenario: User closes day detail sheet
  Given I have a day detail sheet open

  When I tap the X button

  Then the detail sheet should close
  And I should see the dashboard
```

## Accessibility Tests

- [ ] Time range toggle is keyboard accessible
- [ ] Chart data points are focusable
- [ ] Detail sheet traps focus when open
- [ ] Detail sheet has close button accessible
- [ ] Color alone doesn't convey meaning (icons used)
- [ ] Touch targets are at least 44x44px

## Visual Regression Tests

- [ ] Light mode appearance
- [ ] Dark mode appearance
- [ ] Mobile viewport (375px)
- [ ] Tablet viewport (768px)
- [ ] Week view vs Month view
- [ ] Detail sheet open state
- [ ] Various data states (improving, declining, stable)
