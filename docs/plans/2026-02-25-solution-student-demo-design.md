# SolutionStudent Interactive Demo — Design Specification

> **Purpose:** Define the visual and interaction design for the Student Interactive Demo, transforming the current static mockup into a tabbed, animated experience that communicates personal progress, momentum, and growth.

---

## 1. Overview

### Current State

The existing [`SolutionStudent.tsx`](src/components/sections/SolutionStudent.tsx) contains a static mockup with:
- Single progress ring (engagement score)
- Three stat chips (Growth, Day streak, Rank)
- Weekly bar chart
- No interactivity or tab switching

### Target State

Transform into an interactive demo with:
- Three tabbed views (Progress, Momentum, Journey)
- Animated transitions between states
- Personal progress narrative
- Emotional connection through visual storytelling

---

## 2. Design Philosophy

### Emotional Goals

| Institution Demo | Student Demo |
|------------------|--------------|
| Analytics-focused | Journey-focused |
| Decision-making | Self-improvement |
| Data density | Emotional clarity |
| Admin perspective | Personal perspective |

### Visual Tone

- **Optimistic:** Upward trends, positive reinforcement
- **Motivating:** Visible progress, achievable goals
- **Calm:** Not gamified, not childish
- **Clean:** Minimal, credible, modern

### Core Message

> **"Effort → Visible Growth"**

Students should instantly understand:
1. "This shows how I'm actually improving."
2. "My consistency matters."
3. "I can see my journey."

---

## 3. Layout Structure

### Section Layout

```
┌─────────────────────────────────────────────────────────────┐
│                      Section Container                       │
│  ┌─────────────────────┐  ┌───────────────────────────────┐ │
│  │                     │  │                               │ │
│  │    Left Column      │  │       Right Column            │ │
│  │    (Text Content)   │  │       (Interactive Demo)      │ │
│  │                     │  │                               │ │
│  │  - Eyebrow          │  │  ┌─────────────────────────┐  │ │
│  │  - Headline         │  │  │     Demo Window         │  │ │
│  │  - Description      │  │  │  ┌───────────────────┐  │  │ │
│  │  - Feature list     │  │  │  │ Tab Navigation    │  │  │ │
│  │                     │  │  │  ├───────────────────┤  │  │ │
│  │                     │  │  │  │                   │  │  │ │
│  │                     │  │  │  │   Active Panel    │  │  │ │
│  │                     │  │  │  │                   │  │  │ │
│  │                     │  │  │  └───────────────────┘  │  │ │
│  │                     │  │  └─────────────────────────┘  │ │
│  └─────────────────────┘  └───────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Layout

Stacked vertically: Text content above, demo window below.

---

## 4. Demo Window Structure

### Window Chrome

```
┌─────────────────────────────────────────────────────────────┐
│  ●  ●  ●          "Your Learning Progress"                  │
├─────────────────────────────────────────────────────────────┤
│  [Progress]  [Momentum]  [Journey]                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                     Active Panel Content                    │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Tab Navigation

Three pill-style tabs:
- **Progress** — Current state, score, weekly view
- **Momentum** — Consistency, streaks, behavior connection
- **Journey** — Before/after, milestones, growth story

---

## 5. Panel Designs

### STATE 1: Progress Overview

**Goal:** Immediate clarity about current standing.

**Visual Elements:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌────────────┐                                            │
│   │    (82)    │   Engagement Score                         │
│   │   RING     │   ↑ +6 from last week                      │
│   └────────────┘   Based on attendance, submissions,        │
│                    and improvement trend.                   │
│                                                             │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐                   │
│   │  +14%    │ │  🔥 9    │ │ Top 18%  │                   │
│   │  Growth  │ │  Streak  │ │  Rank    │                   │
│   └──────────┘ └──────────┘ └──────────┘                   │
│                                                             │
│   This week                                                 │
│   ┌──┬──┬──┬──┬──┬──┬──┐                                   │
│   │  │  │  │  │  │  │▓▓│                                   │
│   └──┴──┴──┴──┴──┴──┴──┘                                   │
│    M  T  W  T  F  S  S                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Message:** "See how you're improving over time."

**Animations:**
- Ring draws in (stroke animation)
- Numbers count up
- Bars grow from bottom
- Soft glow on progress elements

---

### STATE 2: Consistency & Momentum

**Goal:** Show behavior → results connection.

**Visual Elements:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Weekly Consistency                                        │
│   ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐              │
│   │  ✓  │  ✓  │  ✓  │  ✓  │  ✓  │  ○  │  ○  │              │
│   │ Mon │ Tue │ Wed │ Thu │ Fri │ Sat │ Sun │              │
│   └─────┴─────┴─────┴─────┴─────┴─────┴─────┘              │
│                                                             │
│   ┌────────────────────────────────────────────┐            │
│   │  🔥 9 Day Streak                           │            │
│   │  Keep going! 1 more day to reach 10.       │            │
│   └────────────────────────────────────────────┘            │
│                                                             │
│   Momentum Indicator                                        │
│   ┌────────────────────────────────────────────┐            │
│   │                                            │            │
│   │    ●───────────────────────────────○       │            │
│   │  Building                    Strong        │            │
│   │                                            │            │
│   └────────────────────────────────────────────┘            │
│                                                             │
│   Your consistency is paying off                            │
│   +12% improvement this month                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Message:** "Consistency builds momentum."

**Animations:**
- Check marks appear sequentially
- Streak counter pulses
- Momentum bar fills
- Subtle motion pulse on active elements

---

### STATE 3: Growth Journey

**Goal:** Emotional payoff — show the transformation.

**Visual Elements:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Your Growth Journey                                       │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                                                     │   │
│   │     ●───────────●───────────●───────────●           │   │
│   │     ▼           ▼           ▼           ▼           │   │
│   │  Started    Improving   Building    Strong          │   │
│   │   Week 1     Week 3      Week 5     Week 7          │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌────────────────────┐  ┌────────────────────┐            │
│   │      Before        │  │       Now          │            │
│   │      Score: 38     │  │      Score: 82     │            │
│   │      Rank: 67%     │  │      Rank: 18%     │            │
│   │      Streak: 0     │  │      Streak: 9     │            │
│   └────────────────────┘  └────────────────────┘            │
│                                                             │
│   +44 points gained                                         │
│   Your effort is visible.                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Message:** "Your effort is visible."

**Animations:**
- Milestones appear sequentially
- Progress line draws
- Numbers animate from "Before" to "Now"
- Smooth curve animation

---

## 6. Animation System

### Libraries

- **Framer Motion:** Primary animation library (already in use)
- **Lenis:** Global smooth scrolling (already configured)

### Animation Principles

| Principle | Implementation |
|-----------|----------------|
| Smooth | Ease curves: `[0.16, 1, 0.3, 1]` |
| Calm | Durations 0.5-1.2s, no sudden movements |
| Encouraging | Positive direction (up, forward) |
| Never flashy | Subtle glows, no dramatic effects |

### Required Effects

1. **Fade + Slide Transitions**
   - Tab content: `opacity: 0 → 1, x: 20 → 0`
   - Duration: 0.25-0.35s

2. **Chart Draw Animation**
   - SVG path strokeDashoffset animation
   - Duration: 1.0-1.4s

3. **Number Counters**
   - RAF-based counting with easing
   - Duration: 0.8-1.0s

4. **Subtle Hover Lift**
   - `y: 0 → -2px` on hover
   - Duration: 0.15s

5. **Glow/Highlight Movement**
   - Soft box-shadow pulse
   - Duration: 2s, repeat

---

## 7. Component Architecture

### Component Tree

```
SolutionStudent
├── FadeUp (wrapper)
│   ├── Left Column
│   │   ├── Eyebrow
│   │   ├── Headline
│   │   ├── Description
│   │   └── Feature List
│   │
│   └── Right Column
│       └── StudentDemoWindow
│           ├── WindowChrome
│           ├── DemoTabs
│           └── DemoContent
│               ├── ProgressView
│               ├── MomentumView
│               └── JourneyView
```

### State Management

```typescript
type Tab = 'progress' | 'momentum' | 'journey'

const [activeTab, setActiveTab] = useState<Tab>('progress')
```

---

## 8. Visual Specifications

### Colors

| Element | Token | Value |
|---------|-------|-------|
| Primary | `brand` | #2563EB |
| Success | `success` | #16A34A |
| Warning | `warning` | #CA8A04 |
| Background | `surface` | #F8FAFC |
| Border | `border` | #E2E8F0 |

### Typography

| Element | Size | Weight |
|---------|------|--------|
| Score | 1.375rem | Bold |
| Label | 0.75rem | Semibold |
| Caption | 0.625rem | Medium |
| Stat Value | 1.1rem | Bold |

### Spacing

| Element | Value |
|---------|-------|
| Card padding | 1.5rem (p-6) |
| Gap between elements | 1.25rem (gap-5) |
| Tab padding | 0.5rem 1rem |
| Border radius | 0.75rem (rounded-xl) |

---

## 9. Interaction Model

### User Actions

1. **Click tabs** — Switch between views
2. **Hover elements** — Subtle lift effect
3. **Watch transitions** — Animated content changes

### No Backend Required

All data is mock/demo data. No API calls, no real user data.

---

## 10. Responsive Behavior

### Breakpoints

| Breakpoint | Layout |
|------------|--------|
| < 1024px | Stacked (text above, demo below) |
| ≥ 1024px | Two-column side by side |

### Demo Window Scaling

- Desktop: Full width in right column
- Tablet: Slightly scaled (0.9)
- Mobile: Full width, compact padding

---

## 11. Success Criteria

The demo succeeds when:

- [ ] Students instantly understand the value proposition
- [ ] Demo feels alive, not static
- [ ] Tab transitions are smooth and satisfying
- [ ] Animations reinforce the narrative (progress, growth)
- [ ] Users spend time switching between views
- [ ] Emotional connection is established

---

## 12. File Changes Summary

| File | Action |
|------|--------|
| `src/components/sections/SolutionStudent.tsx` | Major rewrite |
| `messages/en.json` | Add new translation keys |
| `messages/kk.json` | Add new translation keys |
| `messages/ru.json` | Add new translation keys |

---

## END OF DESIGN SPECIFICATION
