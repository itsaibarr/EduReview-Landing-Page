# Hero Redesign v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply four targeted visual upgrades to the existing navbar + hero — 3D shadow buttons, grid background texture, enlarged node graph with center anchor, and lighter headline weight.

**Architecture:** All changes are isolated to four existing files. No new files. No new dependencies. No routing changes. Structure (graph above, text below) is preserved exactly.

**Tech Stack:** Next.js App Router, TypeScript, TailwindCSS v4, framer-motion, Satoshi font, JetBrains Mono

**Design spec:** `docs/plans/2026-02-24-hero-redesign-v2-design.md`

---

## Task 1: Button — 3D Shadow Style

**Files:**
- Modify: `src/components/ui/Button.tsx`

This replaces the flat gradient + hover-lift with a hard offset ledge shadow that creates a physically 3D appearance. Pattern from Skiny reference.

**Step 1: Replace the `primary` variant class string**

In `src/components/ui/Button.tsx`, find the `variants` object primary key and replace:

```ts
// BEFORE
primary: 'bg-gradient-cta text-white shadow-xs hover:-translate-y-px hover:shadow-brand',

// AFTER
primary: 'bg-brand text-white [box-shadow:0_4px_0_0_#1D4ED8] hover:translate-y-0.5 hover:[box-shadow:0_2px_0_0_#1D4ED8] active:translate-y-1 active:[box-shadow:0_0px_0_0_#1D4ED8]',
```

**Step 2: Update base class transition duration**

In the `base` string, change `duration-200` to `duration-[120ms]`:

```ts
// BEFORE
const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.99] cursor-pointer'

// AFTER
const base = 'inline-flex items-center justify-center font-semibold transition-all duration-[120ms] cursor-pointer'
```

Note: `active:scale-[0.99]` is removed — the 3D translate handles the press feedback now.

**Step 3: Verify visually**

Run `npm run dev` and open `/?role=institution`.

Check:
- Primary button ("Join the Pilot") has a visible darker blue ledge below it
- Hovering shifts it down 2px and the ledge shrinks
- Clicking presses it fully flat
- The navbar CTA has the same treatment
- Text button link is unaffected

**Step 4: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: 3D shadow ledge on primary button"
```

---

## Task 2: Hero Background — Square Grid Texture

**Files:**
- Modify: `src/components/sections/HeroInstitution.tsx`
- Modify: `src/components/sections/HeroStudent.tsx`

Add a subtle square grid background that fades out toward the bottom. Applied via inline style on the section element.

**Step 1: Add grid style to `HeroInstitution`**

In `src/components/sections/HeroInstitution.tsx`, find the opening `<section>` tag:

```tsx
// BEFORE
<section className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-28 pb-16">

// AFTER
<section
  className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-28 pb-16"
  style={{
    backgroundImage: [
      'linear-gradient(to right, rgba(0,0,0,0.055) 1px, transparent 1px)',
      'linear-gradient(to bottom, rgba(0,0,0,0.055) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '40px 40px',
    maskImage: 'linear-gradient(to bottom, white 55%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, white 55%, transparent 100%)',
  }}
>
```

**Step 2: Add the same grid style to `HeroStudent`**

In `src/components/sections/HeroStudent.tsx`, find the opening `<section>` tag:

```tsx
// BEFORE
<section className="min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-28 pb-16">

// AFTER
<section
  className="min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-28 pb-16"
  style={{
    backgroundImage: [
      'linear-gradient(to right, rgba(0,0,0,0.055) 1px, transparent 1px)',
      'linear-gradient(to bottom, rgba(0,0,0,0.055) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '40px 40px',
    maskImage: 'linear-gradient(to bottom, white 55%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, white 55%, transparent 100%)',
  }}
>
```

Note: `HeroStudent` was missing the `relative` class — add it: `className="relative min-h-screen bg-white ..."`

**Step 3: Verify visually**

Open `/?role=institution` and `/?role=student`.

Check:
- Subtle grid visible in upper portion of hero
- Grid fades cleanly to white before reaching the headline/CTA area
- Grid lines are barely-there — if you notice them before the content, reduce opacity from `0.055` to `0.04`
- Grid is not visible on the scroll hint or below the fold

**Step 4: Commit**

```bash
git add src/components/sections/HeroInstitution.tsx src/components/sections/HeroStudent.tsx
git commit -m "feat: square grid texture on hero background"
```

---

## Task 3: Headline Typography — font-black → font-bold

**Files:**
- Modify: `src/components/sections/HeroInstitution.tsx`
- Modify: `src/components/sections/HeroStudent.tsx`

One class change per file. Reduces headline weight from 900 to 700 for a more elegant, less aggressive feel.

**Step 1: Update HeroInstitution headline weight**

In `src/components/sections/HeroInstitution.tsx`, find the `<h1>`:

```tsx
// BEFORE
<h1 className="text-[2.625rem] md:text-display font-black text-text-primary leading-[1.08] tracking-[-0.04em]">

// AFTER
<h1 className="text-[2.625rem] md:text-display font-bold text-text-primary leading-[1.08] tracking-[-0.04em]">
```

**Step 2: Update HeroStudent headline weight**

In `src/components/sections/HeroStudent.tsx`, find the `<h1>`:

```tsx
// BEFORE
<h1 className="text-[2.625rem] md:text-display font-black text-text-primary leading-[1.08] tracking-[-0.04em]">

// AFTER
<h1 className="text-[2.625rem] md:text-display font-bold text-text-primary leading-[1.08] tracking-[-0.04em]">
```

**Step 3: Verify visually**

Open both `/?role=institution` and `/?role=student`.

Check:
- Headline reads as authoritative but not aggressive
- The blue accent word (`learning.` / `deserves`) still pops — lighter surrounding weight makes it stand out more
- If 700 feels too light (depends on Satoshi rendering), adjust to `font-extrabold` (800) as a middle ground — do NOT go back to 900

**Step 4: Commit**

```bash
git add src/components/sections/HeroInstitution.tsx src/components/sections/HeroStudent.tsx
git commit -m "feat: reduce headline weight to font-bold for refined tone"
```

---

## Task 4: FloatingNodeGraph — Full Redesign

**Files:**
- Modify: `src/components/ui/FloatingNodeGraph.tsx`

This is the main visual upgrade. Four changes: larger canvas, center anchor node, bigger cards with left accent bars, deeper float animation. Complete file replacement.

**Step 1: Update constants and node data**

At the top of `src/components/ui/FloatingNodeGraph.tsx`, replace all constants and node arrays:

```ts
const CARD_W = 160
const CARD_H = 84
const CENTER_X = 400
const CENTER_Y = 240

const INSTITUTION_NODES: NodeCard[] = [
  { id: 'engagement', value: '87',   label: 'Engagement Index',  accent: '#2563EB', x: -260, y: -110, floatDelay: 0   },
  { id: 'growth',     value: '+12%', label: 'Growth this month', accent: '#16A34A', x:  160, y: -130, floatDelay: 1.6 },
  { id: 'atrisk',     value: '3',    label: 'Need attention',    accent: '#DC2626', x:  200, y:   70, floatDelay: 0.8 },
  { id: 'attendance', value: '94%',  label: 'Attendance',        accent: '#2563EB', x: -230, y:   80, floatDelay: 2.4 },
]

const STUDENT_NODES: NodeCard[] = [
  { id: 'progress', value: '+18',    label: 'Points this month', accent: '#2563EB', x: -200, y: -100, floatDelay: 0   },
  { id: 'streak',   value: '14d',    label: 'Learning streak',   accent: '#16A34A', x:  200, y: -100, floatDelay: 1.4 },
  { id: 'subject',  value: 'Math ↑', label: 'Top subject',       accent: '#2563EB', x:  180, y:   80, floatDelay: 0.7 },
]

// All edges now connect FROM 'center' TO each metric card
const INSTITUTION_EDGES: [string, string][] = [
  ['center', 'engagement'],
  ['center', 'growth'],
  ['center', 'atrisk'],
  ['center', 'attendance'],
]

const STUDENT_EDGES: [string, string][] = [
  ['center', 'progress'],
  ['center', 'streak'],
  ['center', 'subject'],
]
```

**Step 2: Update `FloatingNodeGraph` component — canvas + center node**

Replace the `FloatingNodeGraph` function body:

```tsx
export function FloatingNodeGraph({ role }: FloatingNodeGraphProps) {
  const nodes = role === 'institution' ? INSTITUTION_NODES : STUDENT_NODES
  const edges = role === 'institution' ? INSTITUTION_EDGES : STUDENT_EDGES

  // SVG viewBox coordinate positions for connector line endpoints
  // Cards: positioned with CSS at calc(50% + x), calc(50% + y)
  // In SVG viewBox (800x480), center = (400,240), card center = (400+x+CARD_W/2, 240+y+CARD_H/2)
  const positions: Record<string, { cx: number; cy: number }> = {
    center: { cx: CENTER_X, cy: CENTER_Y },
    ...Object.fromEntries(
      nodes.map((n) => [
        n.id,
        {
          cx: CENTER_X + n.x + CARD_W / 2,
          cy: CENTER_Y + n.y + CARD_H / 2,
        },
      ])
    ),
  }

  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ height: 480 }}
      aria-hidden="true"
    >
      {/* SVG connector lines — behind everything */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 480"
        preserveAspectRatio="xMidYMid meet"
      >
        {edges.map(([fromId, toId]) => {
          const from = positions[fromId]
          const to = positions[toId]
          if (!from || !to) return null
          const mx = (from.cx + to.cx) / 2
          const my = (from.cy + to.cy) / 2
          return (
            <g key={`${fromId}-${toId}`}>
              <line
                x1={from.cx} y1={from.cy}
                x2={to.cx}   y2={to.cy}
                stroke="#BFDBFE"
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
              {/* Midpoint dot */}
              <circle cx={mx} cy={my} r={3} fill="#DBEAFE" stroke="#BFDBFE" strokeWidth={1} />
            </g>
          )
        })}
      </svg>

      {/* Center anchor node — static, no float */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#2563EB',
          boxShadow: '0 12px 32px rgba(37,99,235,0.30)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" />
          <path d="M5.5 13 Q10 6.5 14.5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="10" cy="10" r="2" fill="white" />
        </svg>
      </div>

      {/* Floating metric cards */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{
            left: `calc(50% + ${node.x}px)`,
            top:  `calc(50% + ${node.y}px)`,
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.7, delay: 0.2 + node.floatDelay * 0.12 },
            y: {
              duration: 5 + node.floatDelay * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: node.floatDelay,
            },
          }}
        >
          <MetricCard node={node} />
        </motion.div>
      ))}
    </div>
  )
}
```

**Step 3: Update `MetricCard` component — left accent bar + stronger shadow**

Replace the `MetricCard` function:

```tsx
function MetricCard({ node }: { node: NodeCard }) {
  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
        display: 'flex',
        overflow: 'hidden',
        borderRadius: 12,
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: 3,
          height: '100%',
          backgroundColor: node.accent,
          flexShrink: 0,
        }}
      />
      {/* Card content */}
      <div
        style={{
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: '#8B92AD',
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: '0.01em',
          }}
        >
          {node.label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 22,
            fontWeight: 600,
            color: '#0A0A14',
            lineHeight: 1.1,
          }}
        >
          {node.value}
        </span>
      </div>
    </div>
  )
}
```

**Step 4: Update the hero motion wrapper height to match**

In `src/components/sections/HeroInstitution.tsx`, find the motion wrapper around the graph:

```tsx
// BEFORE
<motion.div
  className="hidden sm:block w-full max-w-[680px] mb-10"

// AFTER
<motion.div
  className="hidden sm:block w-full max-w-[760px] mb-6"
```

In `src/components/sections/HeroStudent.tsx`:

```tsx
// BEFORE
<motion.div
  className="w-full max-w-[600px] mb-10"

// AFTER
<motion.div
  className="w-full max-w-[700px] mb-6"
```

**Step 5: Verify visually**

Open `/?role=institution` and `/?role=student`.

Check:
- Center blue circle is anchored at the visual center of the graph
- Connector lines radiate from center circle to each card
- Cards have visible left accent bars (color matches the card's accent)
- Cards are noticeably larger than before
- Each card floats independently with different timing
- Float feels weighted — slow, deep, not jittery
- On `/?role=student` (3 cards): graph still feels balanced — not sparse

If any card overlaps the center node, adjust that card's `x`/`y` offset values — increase the magnitude until there's ~20px clearance from center node edge to card edge.

**Step 6: Commit**

```bash
git add src/components/ui/FloatingNodeGraph.tsx src/components/sections/HeroInstitution.tsx src/components/sections/HeroStudent.tsx
git commit -m "feat: redesign node graph — center anchor, enlarged cards, 3D float"
```

---

## Final Verification

After all 4 tasks are committed, do a full pass:

**Institution hero** (`/?role=institution`):
- [ ] Grid texture visible at top, fades before headline
- [ ] Center blue circle with logo mark, glowing shadow
- [ ] 4 cards with left accent bars floating independently
- [ ] Thin dashed lines from center to each card
- [ ] Headline weight: bold not black — reads as refined, not weak
- [ ] Primary button has visible 3D ledge, presses in on click
- [ ] Navbar CTA has same 3D ledge

**Student hero** (`/?role=student`):
- [ ] Same grid texture + button treatment
- [ ] 3-card layout still feels balanced, center node present
- [ ] Headline reads correctly

**Visual calibration** — if anything feels off:
- Grid too obvious: reduce opacity from `0.055` to `0.04`
- Cards overlapping center: increase x/y offset magnitude
- Float too jittery: increase duration or reduce y amplitude from `12` to `8`
- Button ledge too thick: change `4px` shadow offset to `3px`
