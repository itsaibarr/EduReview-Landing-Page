# PROJECT CONTEXT — EDUCATION ENGAGEMENT PLATFORM

---

# 1. PROJECT OVERVIEW

## Core Idea

This project is a **student engagement and growth visibility platform** built as a layer on top of existing school systems.

It is **NOT**:

* a replacement for LMS systems
* a digital diary clone
* a gamification toy

It IS:

> A learning engagement and growth analytics layer that makes student progress visible for both learners and institutions.

---

## Problem

### Student Side

* Students optimize for grades instead of real learning.
* Progress is invisible, which reduces motivation.
* Engagement depends heavily on interest in specific subjects.
* AI tools make outcome-based assessments less meaningful.

### Teacher Side

* Engagement is hard to monitor consistently.
* Extra workflows are unacceptable.
* Existing systems focus on grades, not behavior.

### Institution Side (Buyer)

* Schools collect data but lack clear insight.
* Hard to detect disengagement early.
* KPI reporting exists but lacks actionable signals.

---

## Core Insight

Grades show results, but they hide progress.

There is a gap between:

* how students experience learning (motivation, effort)
* how institutions measure learning (grades, reports)

The platform bridges this gap.

---

## Product Positioning

**Student Progress Operating Layer**

* Works alongside existing systems (e.g., Kundelik).
* Converts existing academic data into engagement and growth signals.
* Zero additional teacher workload.

---

## Core Metrics

### Engagement Index

Behavior-based signal calculated from:

* attendance consistency
* assignment completion
* submission timing
* participation indicators
* improvement trends

Purpose:

* show learning activity level.

---

### Growth Score

Progress-based metric:

* improvement vs personal baseline
* consistency of improvement
* trajectory over time

Purpose:

* show whether effort becomes progress.

---

### Relationship

Engagement drives growth.

Together they represent learning momentum.

---

## Key Product Principles

1. Zero extra work for teachers.
2. Gamification is UX, not the core product.
3. Effort should become visible.
4. Metrics must support decisions.

---

## Integration Strategy

Long-term: integration with Kundelik.

Early stages:

1. MVP — manual or CSV input.
2. Pilot — lightweight sync.
3. Scale — full integration.

Avoid early dependency on external systems.

---

# 2. DESIGN STYLE & VISUAL DIRECTION

## Design Philosophy

Style should communicate:

* intelligence
* trust
* modernity
* clarity

Landing must feel like:

> Apple × Notion × modern AI startup.

---

## Theme Mode

Light-first design.

Characteristics:

* clean white background
* soft gradients
* strong whitespace
* subtle shadows
* minimal noise

---

## Artistic Direction

Artistic but professional.

Avoid:

* gaming aesthetics
* cartoon visuals
* excessive neon
* cluttered layouts

Use:

* soft animated gradients
* data-inspired visuals
* smooth transitions
* calm motion.

---

## Animation Philosophy

Animation should:

* support clarity
* feel premium
* never distract.

Animation intensity:

**Hybrid**

* Premium SaaS motion everywhere.
* One cinematic hero section with stronger storytelling.

---

# 3. REFERENCE LANDING STYLES

These are style references — not for copying layouts directly.

## 1. Stripe

Why:

* clean information hierarchy
* professional trust signal
* soft motion.

Reference qualities:

* spacing
* typography balance
* clear conversion flow.

---

## 2. Linear

Why:

* premium minimalism
* subtle motion
* modern startup aesthetic.

Reference qualities:

* animation timing
* smooth section transitions.

---

## 3. Vercel

Why:

* developer-first clarity
* structured sections
* modern SaaS credibility.

Reference qualities:

* typography scale
* modular sections.

---

## 4. Apple Product Pages (Hero Inspiration)

Why:

* cinematic scroll storytelling.

Reference qualities:

* hero animation
* scroll-driven reveals.

Only hero section should approach this level.

---

## 5. Notion Marketing Pages

Why:

* calm confidence
* clean UI framing.

Reference qualities:

* simplicity
* readability.

---

# 4. TECH STACK

## Core Stack

* Next.js v16 (App Router)
* TypeScript
* TailwindCSS
* Supabase (auth + database)
* Lucide React (icons)

---

## Animation Stack (Primary)

### Motion (Framer Motion successor)

Used for:

* component animation
* scroll reveals
* layout transitions
* hover interactions.

---

### Lenis

Used for:

* smooth scrolling
* premium motion feel.

---

## Optional (Hero Only)

GSAP + ScrollTrigger

Only if needed for cinematic hero effects.

Do NOT use globally.

---

## Backend

Supabase:

* authentication
* waitlist storage
* role-based entries.

Example schema:

waitlist:

* id
* email
* role (student / institution)
* institution
* created_at

---

# 5. LANDING PAGE STRUCTURE

## Entry Split

First screen asks:

Who are you?

* Schools & Universities
* Students

After split, messaging must diverge.

---

## Institution Path

### Hero

* headline focused on visibility and analytics
* trust-focused tone
* CTA: join pilot.

---

### Problem Section

* grades ≠ engagement
* hard to detect disengagement
* limited actionable insights.

---

### Solution Section

Explain:

* platform transforms data into engagement signals.

Include dashboard mockups:

* engagement index
* growth trends
* early warning indicators.

---

### Value Blocks

For Admins:

* engagement analytics
* intervention signals.

For Teachers:

* zero extra workload.

For Institutions:

* better decisions.

---

### Pilot CTA

Form fields:

* name
* role
* institution
* email
* optional challenge.

---

## Student Path

### Hero

* visible progress messaging
* emotional motivation.

---

### Problem

* effort feels invisible
* grades don’t show growth.

---

### Solution

Show:

* progress visualization
* growth trends
* streaks or momentum.

---

### Waitlist CTA

Fields:

* name
* email
* school/university
* optional frustration input.

---

# 6. ANIMATION SYSTEM

## Global

* smooth scroll via Lenis
* subtle fade + slide reveals
* staggered entrances.

---

## Hero (Cinematic)

* animated gradient background
* layered movement
* slow parallax.

---

## Scroll Effects

* cards move slightly on scroll
* text reveals progressively
* charts animate into place.

---

## Microinteractions

* hover elevation
* icon motion
* button feedback.

---

## Performance Rules

* avoid heavy DOM animations
* use transforms only
* GPU acceleration.

---

# 7. AI EXECUTION TASK (FOR CODING AGENT)

You are a senior frontend engineer building a production-grade startup landing page.

Your goal:

Create a modern, premium SaaS landing page that feels credible for institutions and inspiring for students.

---

## Requirements

* Use the exact tech stack listed above.
* Build reusable components.
* Implement animation system.
* Ensure excellent performance.
* Mobile-first responsiveness.

---

## Output Expectations

* Production-ready code.
* Clean structure.
* Minimal comments.
* Scalable architecture.

---

## Design Goals

The page should feel like:

* an existing funded startup
* calm, intelligent, modern
* artistic but serious.

---

## Success Criteria

AI has succeeded when:

* Landing looks premium and modern.
* Animation feels intentional.
* Institutional trust is high.
* Students feel motivation.
* Codebase is clean and extensible.

---

END OF CONTEXT FILE
