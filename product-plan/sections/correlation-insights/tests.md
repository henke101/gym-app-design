# Correlation Insights — Test Specifications

## Unit Tests

### CorrelationInsights Component

#### Rendering
- [ ] Renders page title "Insights"
- [ ] Renders time range selector
- [ ] Renders summary banner with strong pattern count
- [ ] Renders "Strong Patterns" section when applicable
- [ ] Renders "Possible Patterns" section when applicable
- [ ] Renders empty state when no insights

#### Summary Banner
- [ ] Shows correct count of strong patterns
- [ ] Shows sparkle icon
- [ ] Shows analysis description text

#### Sections
- [ ] Strong patterns section shows only confidence='strong' insights
- [ ] Possible patterns section shows only confidence='possible' insights
- [ ] Each section shows insight count
- [ ] Cards render in responsive grid

#### Empty State
- [ ] Shows when insights array is empty
- [ ] Displays empty icon
- [ ] Shows "Not enough data for insights" message
- [ ] Shows encouragement to keep logging

### InsightCard Component

#### Rendering
- [ ] Displays category icon (weight or strength)
- [ ] Displays confidence badge
- [ ] Displays insight title
- [ ] Displays insight description
- [ ] Displays metric highlight box
- [ ] Renders mini chart

#### Category Icons
- [ ] Shows scale icon for category='weight'
- [ ] Shows lightning icon for category='strength'

#### Confidence Badges
- [ ] Strong confidence shows lime styling
- [ ] Possible confidence shows gray styling
- [ ] Badge text matches confidence level

#### Metric Box
- [ ] Displays metric value prominently
- [ ] Shows metric label
- [ ] Shows comparison text
- [ ] Uses category color for value

#### Chart
- [ ] Passes chartData to MiniBarChart
- [ ] Uses amber color for weight category
- [ ] Uses lime color for strength category

### TimeRangeSelector Component

#### Rendering
- [ ] Renders all provided time ranges
- [ ] Shows label text for each option

#### Selection States
- [ ] Selected option has active styling (white bg, shadow)
- [ ] Unselected options have muted styling

#### Interactions
- [ ] Calls onChange with value when option clicked
- [ ] Only one option can be selected at a time

### MiniBarChart Component

#### Rendering
- [ ] Returns null when data is empty
- [ ] Renders SVG with polyline
- [ ] Renders dots at data points
- [ ] Renders labels below chart

#### Data Visualization
- [ ] Dots positioned based on normalized values
- [ ] Y positions inverted (higher values at top)
- [ ] X positions evenly distributed
- [ ] Polyline connects all dots

#### Styling
- [ ] Lime color shows lime-400/500 classes
- [ ] Amber color shows amber-400/500 classes
- [ ] Dots have glow shadow effect

### Edge Cases
- [ ] Handles insight with empty chartData
- [ ] Handles insight with single data point
- [ ] Handles very long description text
- [ ] Handles very long metric value

## Integration Tests

### User Flow: View Insights

```gherkin
Scenario: User views their correlation insights
  Given I am on the Correlation Insights page
  And I have logged enough data for insights

  Then I should see a summary of strong patterns
  And I should see insight cards organized by confidence
  And each card should have a title, description, and chart
```

### User Flow: Change Time Range

```gherkin
Scenario: User changes the analysis time range
  Given I am on the Correlation Insights page
  And "30d" is currently selected

  When I click the "7d" option

  Then "7d" should appear selected
  And insights should update for 7-day analysis
  And onTimeRangeChange should be called with '7d'
```

### User Flow: No Insights Available

```gherkin
Scenario: New user with insufficient data
  Given I am a new user
  And I have only logged 2 days of data

  When I view the Correlation Insights page

  Then I should see the empty state
  And I should see "Not enough data for insights"
  And I should see encouragement to keep logging
```

### User Flow: Only Possible Patterns

```gherkin
Scenario: User with only suggestive patterns
  Given I have logged some data
  And only low-confidence correlations exist

  When I view the Correlation Insights page

  Then the summary should show "0 strong patterns"
  And I should not see a "Strong Patterns" section
  And I should see a "Possible Patterns" section
```

## Accessibility Tests

- [ ] Time range selector is keyboard accessible
- [ ] Insights are navigable with screen reader
- [ ] Icons have appropriate aria-labels or are decorative
- [ ] Color alone doesn't convey confidence (text used)
- [ ] Touch targets meet minimum size
- [ ] Chart has text alternative in labels

## Visual Regression Tests

- [ ] Light mode appearance
- [ ] Dark mode appearance
- [ ] Mobile viewport (375px, single column)
- [ ] Tablet viewport (768px, 2 columns)
- [ ] Desktop viewport (1024px+, 3 columns)
- [ ] Strong vs Possible confidence styling
- [ ] Weight vs Strength category styling
- [ ] Empty state
- [ ] Various time range selections
