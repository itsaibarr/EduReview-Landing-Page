# Design Plan: Navbar + Hero Section + Brand Book

**Date:** 2026-02-24
**Project:** Education Engagement Platform — Landing Page
**Scope:** Brand system, context-aware navbar, cinematic hero section

---

## 1. Decisions Made

| Decision | Choice | Rationale |
|---|---|---|
| Navbar type | Context-aware (role-adaptive) | Messaging must diverge per audience |
| Role state management | URL query params (`?role=institution / ?role=student`) | Shareable, back-button safe, simplest architecture |
| Hero visual | Bold typographic + abstract SVG data arcs | No product screenshot dependency; distinctive before launch |
| Typography | Satoshi (Fontshare) + JetBrains Mono (data labels) | Warm, modernist; full weight range; free commercial license |
| Accent color | Blue (`#2563EB`) with matching blue gradient system | Clean, institutional trust + modern clarity |
| Background approach | Single directional radial gradient wash (CSS only) | Studio decision — avoids AI blob orb pattern |
| CTA shape | Rounded rectangle (`radius: 10px`) | Pills = generic SaaS; rounded rect = precision |
| Quality bar | Studio-level, no AI patterns | Every element intentional; restraint over decoration |

---

## 2. Architecture

### Route Structure

```
/                   → Split entry screen (role selection)
/?role=institution  → Institution landing path
/?role=student      → Student landing path
```

### Component Tree

```
app/
├── layout.tsx              ← Lenis smooth scroll provider
├── page.tsx                ← Split entry screen (role selection)
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx      ← Context-aware, reads role from URL
│   │
│   ├── sections/
│   │   ├── HeroInstitution.tsx
│   │   └── HeroStudent.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── HeroArcs.tsx    ← SVG arc system component
│
└── providers/
    └── SmoothScrollProvider.tsx
```

---

## 3. Navbar Spec

### States

| State | Visibility | Content |
|---|---|---|
| Entry (`/`) | Hidden (`opacity: 0`) | — |
| Institution | Visible | Logo + 4 nav links + "Join Pilot" CTA |
| Student | Visible | Logo + 3 nav links + "Join Waitlist" CTA |

### Visual

```
height: 64px
padding: 20px 32px
max-width: 1200px (centered)
position: fixed, top: 0, full-width
background: rgba(255,255,255,0.80) + backdrop-filter: blur(12px)
border-bottom: 1px solid #E0E7FF
shadow: 0 1px 3px rgba(0,0,0,0.05)
```

### Animation

- Entry: `y: -8 → 0`, `opacity: 0 → 1`, `400ms ease-out` after role selection
- Scroll > 80px: border opacity increases to `#BFDBFE`, shadow strengthens

### Nav Links

**Institution:** How it works · For Schools · For Teachers · About
**Student:** How it works · Progress · About

Style: `Satoshi 500 14px #3D4663` → hover `#2563EB`, `150ms ease`

### CTA Button

- Label: "Join Pilot" (institution) / "Join Waitlist" (student)
- Style: `gradient-cta`, `#FFFFFF`, `Satoshi 600 14px`, `12px 20px padding`, `radius: 10px`
- Hover: `translateY(-1px)` + `shadow-brand`

---

## 4. Hero Section Spec

### Layout

```
height: 100vh
display: flex, align-items: center, justify-content: center
text-align: center
overflow: hidden (contains SVG arcs)
```

### Visual Layers (back to front)

1. **Background wash** — CSS radial gradient, top-left, `rgba(37,99,235,0.06)`, static
2. **SVG arcs** — 3 concentric rings, stroke-only, Framer Motion `rotate` infinite
3. **Content** — badge → headline → subheadline → CTAs

### Content

**Institution:**
- Badge: `For Schools & Universities`
- Headline: `See who's learning.`  `Not just who's passing.`
- Sub: `Turn your existing academic data into engagement signals — with zero extra workload for teachers.`
- CTA: `Join the Pilot` (primary) + `See how it works →` (text link)

**Student:**
- Badge: `For Students`
- Headline: `Your effort deserves`  `to be seen.`
- Sub: `Track your real progress, not just your grades. See your learning momentum grow.`
- CTA: `Join the Waitlist` (primary) + `Learn more →` (text link)

### Headline Typography

- `Satoshi 800`, `72px`, `letter-spacing: -0.04em`, `line-height: 1.08`
- Gradient text on the **first line only**: `#1E3A8A → #2563EB → #60A5FA`
- Second line: `--text-primary` (`#0A0A14`) — plain black for contrast

### SVG Arcs

| Arc | Diameter | Stroke | Opacity | Direction | Duration |
|---|---|---|---|---|---|
| Outer | `640px` | `#BFDBFE 1px` | `0.45` | Clockwise | `40s` |
| Mid | `440px` | `#60A5FA 1px` | `0.30` | Counter | `28s` |
| Inner | `260px` | `#2563EB 0.5px` | `0.20` | Clockwise | `18s` |

4 small circle markers (`r: 3`, `fill: #BFDBFE`) at `0° / 90° / 180° / 270°` on outer arc.
All animations: Framer Motion `animate={{ rotate: 360 }}`, `repeat: Infinity`, `ease: "linear"`.

### Entry Animation Sequence

| Element | Delay | Duration | Motion |
|---|---|---|---|
| SVG arcs | `0s` | `1200ms` fade in | opacity 0→1 |
| Badge | `100ms` | `500ms` | y 16→0, opacity 0→1 |
| Headline line 1 | `200ms` | `600ms` | y 20→0, opacity 0→1 |
| Headline line 2 | `300ms` | `600ms` | y 20→0, opacity 0→1 |
| Subheadline | `450ms` | `500ms` | y 16→0, opacity 0→1 |
| CTAs | `600ms` | `500ms` | y 12→0, opacity 0→1 |

All easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out).

### Scroll Hint

- Animated `↓` or chevron at `bottom: 32px`, centered
- `y: 0 → 6 → 0`, `2s infinite`, `opacity: 0.35`
- Fades out on first scroll via Lenis `onScroll` listener

---

## 5. Brand Book Location

Full brand system documented in: `docs/brand-book.md`

Covers: typography, color system (base/text/brand/semantic), spacing, radius, shadows, animation system, component rules, Tailwind config mapping.

---

## 6. Quality Checklist

Before any component is considered done:

- [ ] No AI-pattern aesthetics (no blob orbs, no mesh gradients, no generic SaaS purple)
- [ ] Typography breaks at intentional points (no browser-decided wrapping on headlines)
- [ ] Gradient text used on maximum ONE phrase per section
- [ ] Body copy never exceeds `600px` width
- [ ] All animations serve meaning — can justify each one
- [ ] Hover states feel precise, not flashy
- [ ] Mobile layout reviewed before desktop is considered done
- [ ] Lenis smooth scroll initialized before any scroll-linked animation
- [ ] `whileInView` with `once: true` on all section reveals
- [ ] Performance: transforms only, no layout-triggering properties animated

---

*When in doubt: subtract, not add.*
