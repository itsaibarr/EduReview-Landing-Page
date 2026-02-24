# Design: Navbar + Hero Redesign v2

**Date:** 2026-02-24
**Scope:** Visual redesign of existing Navbar + HeroInstitution + FloatingNodeGraph + Button components. Structure unchanged — graph above, headline + CTA below.

**Reference signals used:**
- `Navbar+Buttons.png` (Skiny) — 3D shadow button treatment
- `Hero section (squared pattern).png` — square grid background texture, headline weight
- `Illustrations.png` (CoreShift) — enlarged node graph, center anchor node, colored card depth
- `background transitions, font healiner.png` — lighter headline weight, more elegant typography

---

## 1. What Changes and Why

| Element | Before | After | Why |
|---|---|---|---|
| Hero background | Pure white | White + 40px square grid (very low opacity) | Adds depth without noise; matches reference |
| Node graph height | 200px | 480px | Graph was visually weak; CoreShift graph spans ~40% of hero |
| Node cards | 140×64px, accent dot | 160×84px, left accent bar | More presence, more legible, matches data badge references |
| Center node | None | 80px brand-blue circle with logo mark | Grounds the graph; CoreShift center anchor |
| Card shadow | `shadow-sm` | `0 4px 16px rgba(0,0,0,0.10)` custom | Lift/depth required for 3D float read |
| Float amplitude | y: [0, -8, 0] | y: [0, -12, 0], 5–8s period | Slower, deeper — reads as weighted/3D |
| Connector lines | 1px, `#BFDBFE` | 1.5px, `#BFDBFE`, dash `6 4` | More visible without being heavy |
| Headline weight | `font-black` (900) | `font-bold` (700) | Elegant over aggressive; matches reference tone |
| Button style | Flat gradient fill | 3D shadow ledge (`box-shadow: 0 4px 0 #1D4ED8`) | From Skiny reference — gives physicality |
| Button hover | `translateY(-1px)` | `translateY(2px)` + shadow shrinks | Matches 3D press-in feel |

---

## 2. Hero Background — Grid Texture

**Implementation:** CSS background-image with two perpendicular linear gradients.

```css
background-image:
  linear-gradient(to right, rgba(0,0,0,0.055) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(0,0,0,0.055) 1px, transparent 1px);
background-size: 40px 40px;
```

Layered with a bottom fade-out mask:
```css
mask-image: linear-gradient(to bottom, white 60%, transparent 100%);
```

Applied to the hero `<section>` element. Grid sits behind all content.

---

## 3. Node Graph — Enlarged Spec

### Canvas
- `height: 480px` (was 200px)
- `viewBox: 0 0 800 480`
- Center anchor: `cx: 400, cy: 240`

### Center Node
- `width: 80px, height: 80px`, `border-radius: 50%`
- Background: `#2563EB`
- Inner icon: white logo mark SVG (same as Navbar)
- Shadow: `0 12px 32px rgba(37,99,235,0.30)`
- No float animation — it is the anchor

### Metric Cards (institution)

| id | value | label | accent | x offset | y offset | float delay |
|---|---|---|---|---|---|---|
| engagement | 87 | Engagement Index | `#2563EB` | -260 | -100 | 0s |
| growth | +12% | Growth this month | `#16A34A` | 160 | -120 | 1.6s |
| atrisk | 3 | Need attention | `#DC2626` | 200 | 60 | 0.8s |
| attendance | 94% | Attendance | `#2563EB` | -230 | 70 | 2.4s |

Card dimensions: `160px × 84px`
Card style: white bg, `rounded-xl`, left accent bar (3px × full height), shadow `0 4px 16px rgba(0,0,0,0.10)`
Value typography: JetBrains Mono, 22px, `font-semibold`, `#0A0A14`
Label typography: Satoshi 11px, `#8B92AD`

### Float Animation (3D weighted)
- `y: [0, -12, 0]` oscillation
- Duration: `5s + (floatDelay × 0.6)` per card (range ~5–7s)
- Ease: `easeInOut`
- Entry: `opacity: 0 → 1`, `y: 10 → 0`, `duration: 0.7s`, delay per card

### Connector Lines
- SVG `<line>` from center node cx/cy to each card center
- `stroke: #BFDBFE`, `strokeWidth: 1.5`, `strokeDasharray: "6 4"`
- Small midpoint dot: `r: 3`, `fill: #DBEAFE`, `stroke: #BFDBFE`
- Center node dots: `r: 4`, `fill: #DBEAFE` at each card connection point on the center circle

---

## 4. Headline Typography

```
font-family: Satoshi
font-weight: 700 (font-bold)   ← was 900 (font-black)
font-size: 2.625rem mobile / 3.75rem desktop (display token unchanged)
letter-spacing: -0.04em
line-height: 1.08
```

One word stays in `text-brand` (`#2563EB`). No weight change on that word.

---

## 5. Button — 3D Shadow Style

Applied to all `variant="primary"` buttons.

```css
/* rest state */
background: #2563EB;
color: white;
box-shadow: 0 4px 0 0 #1D4ED8;
transform: translateY(0);
transition: transform 120ms ease, box-shadow 120ms ease;

/* hover */
box-shadow: 0 2px 0 0 #1D4ED8;
transform: translateY(2px);

/* active */
box-shadow: 0 0px 0 0 #1D4ED8;
transform: translateY(4px);
```

No gradient fill. Flat blue with hard offset shadow ledge. This is the Skiny button pattern.

---

## 6. Quality Bar

- Grid texture: barely visible — if you notice it before the content, opacity is too high
- Center node: must read as anchor, not decoration — shadow is critical
- Cards: left accent bar must be flush to card left edge, full height, no gap
- Float: each card must feel independent — timing offsets must be distinct
- Button press: must feel physical — timing `120ms` is fast enough to feel snappy
- Headline: at 700 weight it must still feel authoritative — if it feels weak, increase to 750 or check font loading

---

*Changes only what's broken. Structure, copy, and routing unchanged.*
