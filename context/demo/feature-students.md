# INTERACTIVE DEMO DASHBOARD — STUDENT LANDING FEATURE SPEC

---

# 1. FEATURE OVERVIEW

## Name

Student Interactive Demo (Landing Page Experience)

## Purpose

The Student Interactive Demo exists to help students instantly understand:

* what the product does for **them**
* how progress becomes visible
* why using it feels motivating

This demo is NOT:

* a real app
* a full dashboard
* a feature list

It IS:

> A lightweight interactive experience that makes students feel their progress becoming visible.

---

# 2. CORE GOAL

When a student sees this demo, the reaction should be:

> “Oh… this shows how I’m actually improving.”

The demo must communicate emotional value first, analytics second.

---

# 3. PRIMARY MESSAGE

Students currently experience:

* grades as isolated numbers
* invisible effort
* unclear growth

The demo shows:

* progress over time
* consistency
* momentum

Core concept:

**Effort → Visible Growth**

---

# 4. DESIGN PHILOSOPHY

## Style Direction

* modern
* clean
* slightly more dynamic than institution demo
* still minimal and credible

Visual tone:

* optimistic
* motivating
* calm (not gamified or childish)

---

## Differences from University Demo

Institution demo focuses on:

* analytics
* decision-making
* dashboards

Student demo focuses on:

* personal journey
* momentum
* self-improvement.

---

# 5. EXPERIENCE STRUCTURE

The demo should feel like a short story.

### Story Flow

1. Current state (confusing progress)
2. Visible progress appears
3. Momentum builds
4. Student understands growth.

---

# 6. LAYOUT STRUCTURE

## Main Layout

Two-column layout recommended:

Left side:

* short explanatory text
* emotional messaging

Right side:

* interactive visual demo.

On mobile:

* stacked layout.

---

# 7. INTERACTIVE STATES

The student demo should contain three simple interactive views.

Users can switch via tabs or small navigation pills.

---

## STATE 1 — Progress Overview

### Goal

Immediate clarity.

### Visual

* personal progress card
* growth percentage
* simple upward chart
* weekly streak indicator.

### Message

“See how you’re improving over time.”

### Animation

* line chart draws in
* numbers count up
* soft glow on progress line.

---

## STATE 2 — Consistency & Momentum

### Goal

Show behavior → results connection.

### Visual

* weekly consistency calendar or streak bar
* small momentum indicator
* simple timeline.

### Message

“Consistency builds momentum.”

### Animation

* streak blocks fill one by one
* subtle motion pulse.

---

## STATE 3 — Growth Journey

### Goal

Emotional payoff.

### Visual

* before vs now comparison
* progress line rising
* milestone markers.

Example milestones:

* Started
* Improving
* Strong momentum

### Message

“Your effort is visible.”

### Animation

* milestones appear sequentially
* smooth curve animation.

---

# 8. INTERACTION MODEL

Users can:

* click tabs
* hover elements
* watch transitions.

No backend required.

All data is mock/demo data.

---

# 9. ANIMATION SYSTEM

## Libraries

* Motion (primary)
* Lenis (global smooth scrolling)

---

## Animation Principles

* smooth
* calm
* encouraging
* never flashy.

---

## Required Effects

* fade + slide transitions
* chart draw animation
* number counters
* subtle hover lift
* small glow or highlight movement.

---

# 10. PSYCHOLOGICAL DESIGN GOALS

The demo should trigger:

### 1. Clarity

“I understand what this does.”

### 2. Ownership

“This is about MY progress.”

### 3. Motivation

“I want to see my real growth.”

---

# 11. VISUAL RULES

## Keep Data Simple

Maximum:

* one main chart per state
* 2–3 supporting numbers.

Avoid:

* dense analytics
* tables
* admin-style dashboards.

---

## Visual Style

* soft gradients
* rounded cards
* clean typography
* generous spacing.

---

# 12. TECHNICAL IMPLEMENTATION

## Component Structure

```id="h4mjlwm"
StudentDemo
 ├── DemoHeader
 ├── DemoTabs
 ├── DemoContent
 │     ├── ProgressView
 │     ├── MomentumView
 │     └── JourneyView
```

---

## State Management

```id="f32l1f"
activeView = "progress" | "momentum" | "journey"
```

Transitions handled via Motion animations.

---

# 13. LANDING PAGE POSITION

Recommended placement:

* directly below hero section on student landing.

Reason:

Students must understand value quickly before scrolling away.

---

# 14. COPY EXAMPLES (OPTIONAL)

Possible headlines:

* “See your real progress.”
* “Your effort should feel visible.”
* “Track growth, not just grades.”

---

# 15. SUCCESS CRITERIA

This feature succeeds when:

* students instantly understand the idea
* demo feels alive, not static
* interaction feels smooth
* users spend time switching views.

---

# 16. FUTURE EXTENSIONS (OPTIONAL)

Later upgrades:

* animated achievements
* AI insight hints
* personal goal progress.

These should NOT be part of initial landing version.

---

# 17. SUMMARY

The Student Interactive Demo is:

* a narrative experience
* emotionally driven
* visually simple
* interaction-based.

Its job is not to explain everything.

Its job is to make students feel:

> “I want this because I can finally see my growth.”

---

END OF SPECIFICATION
