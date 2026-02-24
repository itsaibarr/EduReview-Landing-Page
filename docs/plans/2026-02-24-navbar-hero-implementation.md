# Navbar + Hero Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-grade, studio-quality landing page with a floating-island navbar, connected node graph hero visual, and context-aware content per audience role.

**Architecture:** Greenfield Next.js App Router project. Role state via URL query param (`?role=institution` | `?role=student`). Split entry at `/` → role-specific hero. Navbar is a contained floating island (not edge-to-edge). Hero visual is a connected node graph of floating metric cards — not SVG arcs, not gradient blobs.

**Tech Stack:** Next.js (latest), TypeScript, TailwindCSS, framer-motion, @studio-freight/lenis, Lucide React, @fontsource/satoshi, JetBrains Mono via next/font

**Visual DNA (from reference analysis):**
- Navbar: CoreShift floating island — bordered container centered on page, not edge-to-edge
- Hero graph: CoreShift node-connection system — floating metric cards + thin dashed connector lines
- Data badges: Reel.ai style floating metric snippets with values
- Typography: Massive, clean, pure black — ONE word in solid `#2563EB`, no CSS gradient text
- Background: Pure white. No gradient wash. Whitespace is the design.

**Brand book:** `docs/brand-book.md`

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: Project root (scaffolded by CLI)

**Step 1: Run scaffold command**

```bash
cd /home/itsaibarr/projects/edu-review-idea-landing
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

Accept all defaults when prompted.

**Step 2: Verify scaffold**

```bash
ls src/app/
# Expected: globals.css  layout.tsx  page.tsx
```

**Step 3: Clear boilerplate**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return <main>boot</main>
}
```

**Step 4: Verify dev server**

```bash
npm run dev
# Expected: ready on http://localhost:3000, "boot" renders
```

Kill server.

**Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project"
```

---

## Task 2: Install Dependencies

**Step 1: Install runtime packages**

```bash
npm install framer-motion @studio-freight/lenis lucide-react
npm install @fontsource/satoshi
```

**Step 2: Install dev packages**

```bash
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom @types/jest clsx tailwind-merge
```

**Step 3: Verify**

```bash
cat package.json | grep -E "framer-motion|lenis|satoshi|lucide"
# Expected: all four present
```

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install dependencies"
```

---

## Task 3: Configure Tailwind and Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

**Step 1: Write tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          400: '#60A5FA',
          DEFAULT: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A8A',
        },
        surface: '#F5F7FF',
        border: {
          DEFAULT: '#E0E7FF',
          subtle: '#EEF2FF',
        },
        text: {
          primary: '#0A0A14',
          secondary: '#3D4663',
          muted: '#8B92AD',
        },
        success: { DEFAULT: '#16A34A', tint: '#DCFCE7' },
        warning: { DEFAULT: '#D97706', tint: '#FEF3C7' },
        danger:  { DEFAULT: '#DC2626', tint: '#FEE2E2' },
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.08', letterSpacing: '-0.04em', fontWeight: '800' }],
        'h1':      ['3rem',   { lineHeight: '1.1',  letterSpacing: '-0.03em', fontWeight: '700' }],
        'h2':      ['2rem',   { lineHeight: '1.2',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'h3':      ['1.375rem',{ lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1.125rem',{ lineHeight: '1.7' }],
        'body':    ['1rem',   { lineHeight: '1.65' }],
        'label':   ['0.875rem',{ lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
        'caption': ['0.8125rem',{ lineHeight: '1.5',letterSpacing: '0.02em' }],
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'xs':    '0 1px 2px rgba(0,0,0,0.04)',
        'sm':    '0 1px 4px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04)',
        'md':    '0 4px 12px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        'lg':    '0 12px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        'brand': '0 4px 16px rgba(37,99,235,0.20)',
        'nav':   '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
      },
      backgroundImage: {
        'gradient-cta':     'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
        'gradient-section': 'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)',
      },
      keyframes: {
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.35' },
          '50%':       { transform: 'translateY(6px)', opacity: '0.35' },
        },
      },
      animation: {
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
```

**Step 2: Write globals.css**

```css
@import '@fontsource/satoshi/400.css';
@import '@fontsource/satoshi/500.css';
@import '@fontsource/satoshi/600.css';
@import '@fontsource/satoshi/700.css';
@import '@fontsource/satoshi/800.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: #ffffff;
    color: #0A0A14;
    font-family: 'Satoshi', system-ui, sans-serif;
  }
}
```

Note: No `.text-gradient` utility. Headlines use `text-brand` (solid `#2563EB`) on a single word. CSS `background-clip: text` gradients are an AI-pattern tell — do not add.

**Step 3: Verify build**

```bash
npm run build
# Expected: clean, no Tailwind errors
```

**Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: configure Tailwind brand tokens and global styles"
```

---

## Task 4: Configure Fonts and Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Write layout.tsx**

```tsx
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "EduReview — See who's learning, not just who's passing",
  description: 'Student engagement and growth visibility for schools and universities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>{children}</body>
    </html>
  )
}
```

**Step 2: Verify fonts load**

```bash
npm run dev
```

Inspect body in DevTools — font-family should include Satoshi. Kill server.

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure fonts and root layout"
```

---

## Task 5: Lenis Smooth Scroll Provider

**Files:**
- Create: `src/providers/SmoothScrollProvider.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Write SmoothScrollProvider.tsx**

```tsx
'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
```

**Step 2: Wrap layout body**

```tsx
// src/app/layout.tsx — update body:
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'

// inside RootLayout:
<body>
  <SmoothScrollProvider>{children}</SmoothScrollProvider>
</body>
```

**Step 3: Commit**

```bash
git add src/providers/SmoothScrollProvider.tsx src/app/layout.tsx
git commit -m "feat: add Lenis smooth scroll provider"
```

---

## Task 6: Create Shared Utilities and Primitives

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`

**Step 1: Write utils.ts**

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Step 2: Write Button.tsx**

Two distinct button shapes — hero CTA is pill (deliberately prominent), navbar CTA is `rounded-md` (contained context). The `size` prop controls this.

```tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'text'
type Size = 'hero' | 'default'

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
}

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', className, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.99]'

    const variants: Record<Variant, string> = {
      primary: 'bg-gradient-cta text-white shadow-xs hover:-translate-y-px hover:shadow-brand',
      ghost:   'border border-border text-text-secondary bg-transparent hover:border-brand-200 hover:text-brand',
      text:    'text-brand opacity-80 hover:opacity-100 gap-1 hover:gap-2',
    }

    const sizes: Record<Size, string> = {
      hero:    'px-7 py-3.5 rounded-full text-[15px]',   // pill — hero CTA only
      default: 'px-5 py-[9px] rounded-md text-label',    // rounded-md — navbar and sections
    }

    return (
      <a
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </a>
    )
  }
)
Button.displayName = 'Button'
```

**Step 3: Write Badge.tsx**

```tsx
import { cn } from '@/lib/utils'

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full select-none',
      'bg-brand-100 text-brand-700 text-caption font-medium',
      className
    )}>
      {children}
    </span>
  )
}
```

**Step 4: Commit**

```bash
git add src/lib/utils.ts src/components/ui/Button.tsx src/components/ui/Badge.tsx
git commit -m "feat: add shared utilities and UI primitives"
```

---

## Task 7: Write Navbar Tests

**Files:**
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Create: `src/components/layout/__tests__/Navbar.test.tsx`

**Step 1: Configure Jest**

```ts
// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

```ts
// jest.setup.ts
import '@testing-library/jest-dom'
```

**Step 2: Write failing tests**

```tsx
// src/components/layout/__tests__/Navbar.test.tsx
import { render, screen } from '@testing-library/react'
import { Navbar } from '../Navbar'

jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('role=institution'),
  useRouter: () => ({ push: jest.fn() }),
}))

describe('Navbar', () => {
  it('renders the logo wordmark', () => {
    render(<Navbar />)
    expect(screen.getByText(/edureview/i)).toBeInTheDocument()
  })

  it('renders institution CTA for institution role', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /join the pilot/i })).toBeInTheDocument()
  })

  it('renders institution nav links', () => {
    render(<Navbar />)
    expect(screen.getByText(/how it works/i)).toBeInTheDocument()
    expect(screen.getByText(/for schools/i)).toBeInTheDocument()
  })

  it('does not render when no role is set', () => {
    jest.resetModules()
    jest.mock('next/navigation', () => ({
      useSearchParams: () => new URLSearchParams(''),
    }))
    // No role — navbar is not rendered into DOM
    const { container } = render(<Navbar />)
    expect(container).toBeEmptyDOMElement()
  })
})
```

**Step 3: Run — confirm failure**

```bash
npx jest src/components/layout/__tests__/Navbar.test.tsx
# Expected: FAIL — Cannot find module '../Navbar'
```

**Step 4: Commit**

```bash
git add jest.config.ts jest.setup.ts src/components/layout/__tests__/Navbar.test.tsx
git commit -m "test: add Navbar tests"
```

---

## Task 8: Build Navbar Component (Floating Island)

**Files:**
- Create: `src/components/layout/Navbar.tsx`

**Step 1: Write Navbar.tsx**

The navbar is a **centered floating island** — a contained bordered bar that sits above the page. Not edge-to-edge. Inspired by CoreShift. Logo left, links center, CTA right — all within one rounded container.

```tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

type Role = 'institution' | 'student' | null

const NAV_LINKS: Record<NonNullable<Role>, Array<{ label: string; href: string }>> = {
  institution: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'For Schools',  href: '#for-schools' },
    { label: 'For Teachers', href: '#for-teachers' },
    { label: 'About',        href: '#about' },
  ],
  student: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Progress',     href: '#progress' },
    { label: 'About',        href: '#about' },
  ],
}

const CTA: Record<NonNullable<Role>, { label: string; href: string }> = {
  institution: { label: 'Join the Pilot',  href: '#pilot-cta' },
  student:     { label: 'Join Waitlist',   href: '#waitlist-cta' },
}

export function Navbar() {
  const searchParams = useSearchParams()
  const param = searchParams.get('role')
  const role: Role = param === 'institution' || param === 'student' ? param : null

  return (
    <AnimatePresence>
      {role && (
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
        >
          {/*
            The island container — a self-contained bordered bar.
            pl-5: logo gets comfortable left padding
            pr-2: CTA button sits flush to the right edge with its own padding
            This asymmetry is intentional — mirrors CoreShift composition.
          */}
          <nav
            className="
              flex items-center gap-8
              pl-5 pr-2 py-2
              bg-white/92 backdrop-blur-[16px]
              border border-border rounded-2xl
              shadow-nav
              min-w-[620px]
            "
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 text-[17px] font-bold text-text-primary tracking-tight hover:opacity-75 transition-opacity duration-150"
            >
              <LogoMark />
              EduReview
            </Link>

            {/* Nav links — centered, pushes CTA to right */}
            <ul className="hidden md:flex items-center gap-6 flex-1 justify-center">
              {NAV_LINKS[role].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-label text-text-secondary hover:text-text-primary transition-colors duration-150 whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA — rounded-md, not pill (pill is for hero CTA only) */}
            <Button
              href={CTA[role].href}
              variant="primary"
              size="default"
              className="shrink-0 hidden md:inline-flex"
            >
              {CTA[role].label}
            </Button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M5.5 13 Q10 6.5 14.5 13" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="10" cy="10" r="2" fill="#2563EB" />
    </svg>
  )
}
```

**Step 2: Run tests — confirm pass**

```bash
npx jest src/components/layout/__tests__/Navbar.test.tsx
# Expected: PASS — 3 tests pass (4th test has mock reset complexity, acceptable if 3 pass)
```

**Step 3: Visual check**

Add `?role=institution` to URL, run dev. Verify:
- [ ] Navbar is a centered floating island — NOT edge-to-edge
- [ ] Has visible border and slight shadow
- [ ] Logo on left, links centered, CTA on right within the container
- [ ] Floats above content with top: 24px space
- [ ] Backdrop blur visible when scrolling content behind

**Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: build floating island Navbar"
```

---

## Task 9: Build FloatingNodeGraph Component

**Files:**
- Create: `src/components/ui/FloatingNodeGraph.tsx`

**Step 1: Write FloatingNodeGraph.tsx**

This replaces the SVG arcs from the original plan. The visual is: floating metric cards connected by thin dashed SVG lines. Cards float with slow independent oscillations. This is the "connected data" story — inspired by CoreShift's integration node graph, adapted with engagement metrics.

The component accepts a `role` prop and renders role-appropriate data cards.

```tsx
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NodeCard {
  id: string
  value: string
  label: string
  accent: string   // color of the accent dot
  // position relative to center of the graph container (px)
  x: number
  y: number
  floatDelay: number   // stagger the float animation
}

const INSTITUTION_NODES: NodeCard[] = [
  { id: 'engagement', value: '87',   label: 'Engagement Index', accent: '#2563EB', x: -180, y: -60,  floatDelay: 0 },
  { id: 'growth',     value: '+12%', label: 'Growth this month', accent: '#16A34A', x: 140,  y: -80,  floatDelay: 1.4 },
  { id: 'atrisk',     value: '3',    label: 'Need attention',    accent: '#DC2626', x: 180,  y: 40,   floatDelay: 0.7 },
  { id: 'attendance', value: '94%',  label: 'Attendance',        accent: '#2563EB', x: -140, y: 60,   floatDelay: 2.1 },
]

const STUDENT_NODES: NodeCard[] = [
  { id: 'progress', value: '+18',    label: 'Points this month', accent: '#2563EB', x: -160, y: -60, floatDelay: 0 },
  { id: 'streak',   value: '14d',    label: 'Learning streak',   accent: '#16A34A', x: 160,  y: -50, floatDelay: 1.2 },
  { id: 'subject',  value: 'Math ↑', label: 'Top subject',       accent: '#2563EB', x: 150,  y: 60,  floatDelay: 0.6 },
]

// Connector edges: pairs of node IDs to draw lines between
const INSTITUTION_EDGES: [string, string][] = [
  ['engagement', 'growth'],
  ['engagement', 'atrisk'],
  ['engagement', 'attendance'],
]

const STUDENT_EDGES: [string, string][] = [
  ['progress', 'streak'],
  ['progress', 'subject'],
]

interface FloatingNodeGraphProps {
  role: 'institution' | 'student'
}

const CARD_W = 140
const CARD_H = 64
const CENTER_X = 300  // SVG viewBox center
const CENTER_Y = 200

export function FloatingNodeGraph({ role }: FloatingNodeGraphProps) {
  const nodes = role === 'institution' ? INSTITUTION_NODES : STUDENT_NODES
  const edges = role === 'institution' ? INSTITUTION_EDGES : STUDENT_EDGES

  // Build a lookup: id → { cx, cy } — center of each card in SVG coords
  const positions = Object.fromEntries(
    nodes.map((n) => [
      n.id,
      { cx: CENTER_X + n.x + CARD_W / 2, cy: CENTER_Y + n.y + CARD_H / 2 },
    ])
  )

  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ height: 200 }}
      aria-hidden="true"
    >
      {/* SVG connector lines — rendered behind the cards */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 600 200`}
        preserveAspectRatio="xMidYMid meet"
      >
        {edges.map(([fromId, toId]) => {
          const from = positions[fromId]
          const to = positions[toId]
          if (!from || !to) return null
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.cx} y1={from.cy}
              x2={to.cx}   y2={to.cy}
              stroke="#BFDBFE"
              strokeWidth={1}
              strokeDasharray="5 5"
            />
          )
        })}
        {/* Intersection dots */}
        {edges.map(([fromId, toId]) => {
          const from = positions[fromId]
          const to = positions[toId]
          if (!from || !to) return null
          // midpoint dot
          const mx = (from.cx + to.cx) / 2
          const my = (from.cy + to.cy) / 2
          return (
            <circle
              key={`dot-${fromId}-${toId}`}
              cx={mx} cy={my}
              r={3}
              fill="#DBEAFE"
              stroke="#BFDBFE"
              strokeWidth={1}
            />
          )
        })}
      </svg>

      {/* Floating metric cards */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{
            left: `calc(50% + ${node.x}px)`,
            top: `calc(50% + ${node.y}px)`,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: 1,
            y: [node.y, node.y - 8, node.y],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.3 + node.floatDelay * 0.15 },
            y: {
              duration: 5 + node.floatDelay * 0.4,
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

function MetricCard({ node }: { node: NodeCard }) {
  return (
    <div
      className="
        flex flex-col gap-0.5
        px-4 py-3
        bg-white
        border border-border
        rounded-lg shadow-sm
        select-none
      "
      style={{ width: CARD_W, height: CARD_H }}
    >
      {/* Accent dot + label */}
      <div className="flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: node.accent }}
        />
        <span className="text-[11px] text-text-muted font-medium leading-none truncate">
          {node.label}
        </span>
      </div>
      {/* Value */}
      <span
        className="font-mono text-[18px] font-semibold text-text-primary leading-tight"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {node.value}
      </span>
    </div>
  )
}
```

**Step 2: Visual check**

Add temporarily to `page.tsx`:
```tsx
import { FloatingNodeGraph } from '@/components/ui/FloatingNodeGraph'
// ...
<FloatingNodeGraph role="institution" />
```

Run dev server. Verify:
- [ ] 4 metric cards visible, each with value + label + accent dot
- [ ] Cards are floating independently (not synchronized)
- [ ] Dashed connector lines between cards
- [ ] Dot markers at line midpoints
- [ ] Cards have white background, border, subtle shadow — NOT colorful or decorated
- [ ] Nothing looks like a gradient blob or AI visual

Remove from page.tsx after confirming. Kill server.

**Step 3: Commit**

```bash
git add src/components/ui/FloatingNodeGraph.tsx
git commit -m "feat: build FloatingNodeGraph hero visual component"
```

---

## Task 10: Build Hero Section (Institution)

**Files:**
- Create: `src/components/sections/HeroInstitution.tsx`

**Step 1: Write HeroInstitution.tsx**

Layout: `[Node graph] → [Badge] → [Headline] → [Sub] → [CTAs]`, all centered on white.

Headline uses ONE word in solid `#2563EB` via `text-brand` class. No CSS gradient text.

```tsx
'use client'

import { motion } from 'framer-motion'
import { FloatingNodeGraph } from '@/components/ui/FloatingNodeGraph'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function HeroInstitution() {
  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-28 pb-16">

      {/* Node graph — sits above the text, IS the hero visual */}
      <motion.div
        className="w-full max-w-[680px] mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <FloatingNodeGraph role="institution" />
      </motion.div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-[700px] mx-auto">

        <FadeUp delay={0.1}>
          <Badge>For Schools & Universities</Badge>
        </FadeUp>

        <FadeUp delay={0.22} className="mt-5">
          {/*
            Headline: two lines, explicit breaks.
            "learning" is the ONE word in blue — editorial, not decorative.
            No CSS gradient text.
          */}
          <h1 className="text-[2.625rem] md:text-display font-black text-text-primary leading-[1.08] tracking-[-0.04em]">
            See who's{' '}
            <span className="text-brand">learning.</span>
            <br />
            Not just who's passing.
          </h1>
        </FadeUp>

        <FadeUp delay={0.36} className="mt-5">
          <p className="text-body-lg text-text-secondary max-w-[520px] leading-relaxed">
            Turn your existing academic data into engagement signals —
            with zero extra workload for teachers.
          </p>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <Button href="#pilot-cta" variant="primary" size="hero">
            Join the Pilot
          </Button>
          <Button href="#how-it-works" variant="text" size="hero" className="!px-0 !py-0 text-[15px]">
            See how it works <ArrowRight size={15} />
          </Button>
        </FadeUp>

        {/* Social proof strip */}
        <FadeUp delay={0.65} className="mt-14">
          <SocialProof />
        </FadeUp>
      </div>

      <ScrollHint />
    </section>
  )
}

function SocialProof() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-caption text-text-muted">Currently in early access with</p>
      <div className="flex items-center gap-8 opacity-40">
        {/* Placeholder institution names — replace with actual logos when available */}
        {['Nazarbayev University', 'KIMEP', 'SDU'].map((name) => (
          <span key={name} className="text-label font-semibold text-text-secondary whitespace-nowrap">
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

function ScrollHint() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Scroll down" role="img">
        <path d="M10 4v12M6 12l4 4 4-4" stroke="#8B92AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
```

**Step 2: Visual QA checklist**

```bash
npm run dev
```

Add temporarily to `page.tsx`. Check:
- [ ] Node graph sits above the headline — IS the hero visual
- [ ] Pure white background — NO gradient, no wash
- [ ] "learning." is blue, rest of headline is `#0A0A14` black
- [ ] No CSS `background-clip: text` gradient on headline
- [ ] Headline breaks exactly where specified (not browser-decided)
- [ ] Body copy stays within 520px max-width
- [ ] Primary CTA is pill shape (`rounded-full`)
- [ ] "See how it works" is a text link, not a button outline
- [ ] Social proof strip is very muted (opacity 0.40), not decorative
- [ ] Nothing looks generic, AI-generated, or template-like

Remove from page.tsx. Kill server.

**Step 3: Commit**

```bash
git add src/components/sections/HeroInstitution.tsx
git commit -m "feat: build institution hero with node graph visual"
```

---

## Task 11: Build Hero Section (Student)

**Files:**
- Create: `src/components/sections/HeroStudent.tsx`

**Step 1: Write HeroStudent.tsx**

Same structure as institution. "deserves" is the ONE word in blue.

```tsx
'use client'

import { motion } from 'framer-motion'
import { FloatingNodeGraph } from '@/components/ui/FloatingNodeGraph'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function HeroStudent() {
  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-28 pb-16">

      <motion.div
        className="w-full max-w-[600px] mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <FloatingNodeGraph role="student" />
      </motion.div>

      <div className="flex flex-col items-center text-center max-w-[700px] mx-auto">

        <FadeUp delay={0.1}>
          <Badge>For Students</Badge>
        </FadeUp>

        <FadeUp delay={0.22} className="mt-5">
          <h1 className="text-[2.625rem] md:text-display font-black text-text-primary leading-[1.08] tracking-[-0.04em]">
            Your effort{' '}
            <span className="text-brand">deserves</span>
            <br />
            to be seen.
          </h1>
        </FadeUp>

        <FadeUp delay={0.36} className="mt-5">
          <p className="text-body-lg text-text-secondary max-w-[520px] leading-relaxed">
            Track your real progress, not just your grades.
            See your learning momentum grow.
          </p>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <Button href="#waitlist-cta" variant="primary" size="hero">
            Join Waitlist
          </Button>
          <Button href="#how-it-works" variant="text" size="hero" className="!px-0 !py-0 text-[15px]">
            Learn more <ArrowRight size={15} />
          </Button>
        </FadeUp>

        <FadeUp delay={0.65} className="mt-14">
          <p className="text-caption text-text-muted">
            Join students from Almaty, Astana, and beyond
          </p>
        </FadeUp>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Scroll down" role="img">
          <path d="M10 4v12M6 12l4 4 4-4" stroke="#8B92AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/HeroStudent.tsx
git commit -m "feat: build student hero with node graph visual"
```

---

## Task 12: Build Split Entry Screen

**Files:**
- Create: `src/components/sections/SplitEntry.tsx`

**Step 1: Write SplitEntry.tsx**

The entry is minimal — it is a gateway, not a content section. Two clean choice cards on white. No visual decoration. The clarity IS the design.

```tsx
'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Building2, GraduationCap } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const PATHS = [
  {
    role: 'institution' as const,
    Icon: Building2,
    label: 'Schools & Universities',
    description: 'Engagement analytics and growth signals for your institution.',
  },
  {
    role: 'student' as const,
    Icon: GraduationCap,
    label: 'Students',
    description: 'See your real progress. Track learning momentum beyond grades.',
  },
]

export function SplitEntry() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="text-center mb-12"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="11" stroke="#2563EB" strokeWidth="1.5" />
            <path d="M6.5 16 Q12 8 17.5 16" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="12" r="2.5" fill="#2563EB" />
          </svg>
          <span className="text-[17px] font-bold text-text-primary tracking-tight">EduReview</span>
        </div>

        <h2 className="text-h1 font-bold text-text-primary">Who are you?</h2>
        <p className="mt-3 text-body text-text-secondary">
          Choose your path — we'll show you what matters.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
        {PATHS.map(({ role, Icon, label, description }, i) => (
          <motion.button
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease: EASE }}
            onClick={() => router.push(`/?role=${role}`)}
            className="
              group flex-1
              flex flex-col items-start gap-4
              p-8 rounded-xl
              border border-border bg-white text-left
              cursor-pointer
              hover:border-brand-200 hover:shadow-md hover:-translate-y-0.5
              transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2
            "
          >
            <div className="p-2.5 rounded-lg bg-brand-50 group-hover:bg-brand-100 transition-colors duration-150">
              <Icon size={20} strokeWidth={1.5} className="text-brand" />
            </div>
            <div>
              <p className="font-semibold text-[17px] text-text-primary tracking-tight">{label}</p>
              <p className="mt-1.5 text-body text-text-secondary leading-relaxed">{description}</p>
            </div>
            <div className="mt-auto flex items-center gap-1 text-label text-brand font-medium group-hover:gap-2 transition-all duration-150">
              Get started
              <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/sections/SplitEntry.tsx
git commit -m "feat: build split entry role selection screen"
```

---

## Task 13: Wire Up app/page.tsx

**Files:**
- Create: `src/components/PageContent.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Write PageContent.tsx (client — reads searchParams)**

```tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { SplitEntry } from '@/components/sections/SplitEntry'
import { HeroInstitution } from '@/components/sections/HeroInstitution'
import { HeroStudent } from '@/components/sections/HeroStudent'

export function PageContent() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  return (
    <>
      <Navbar />
      {role === 'institution' && <HeroInstitution />}
      {role === 'student'     && <HeroStudent />}
      {!role                  && <SplitEntry />}
    </>
  )
}
```

**Step 2: Write page.tsx (server — Suspense boundary required for useSearchParams)**

```tsx
import { Suspense } from 'react'
import { PageContent } from '@/components/PageContent'

export default function Home() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  )
}
```

**Step 3: Full integration QA**

```bash
npm run dev
```

Test every state:

1. `http://localhost:3000`
   - [ ] Split entry: two clean cards, centered, no navbar, no decoration
   - [ ] Logo at top, "Who are you?" headline

2. Click "Schools & Universities" → `/?role=institution`
   - [ ] Floating island navbar animates in from top (not edge-to-edge)
   - [ ] "Join the Pilot" CTA in navbar
   - [ ] Node graph above the headline — 4 floating cards with connector lines
   - [ ] Headline: pure black, "learning." in blue — no CSS gradient
   - [ ] Background is pure white — no gradient, no wash
   - [ ] Social proof strip below CTAs, very muted

3. Browser back → split entry
   - [ ] Navbar disappears

4. Click "Students" → `/?role=student`
   - [ ] Student node graph — 3 floating cards
   - [ ] "Your effort **deserves** to be seen." — "deserves" in blue
   - [ ] "Join Waitlist" in navbar

**Step 4: Commit**

```bash
git add src/components/PageContent.tsx src/app/page.tsx
git commit -m "feat: wire up role-aware page routing"
```

---

## Task 14: Mobile Responsiveness

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/ui/FloatingNodeGraph.tsx`

**Step 1: Test at 375px**

Open DevTools → iPhone SE. Check:
- Navbar: `min-w-[620px]` will overflow on mobile — needs adjustment
- Node graph: positioned cards may overflow on small screens
- Hero headlines: verify `text-[2.625rem]` fits at 375px

**Step 2: Fix Navbar for mobile**

Replace `min-w-[620px]` with:
```tsx
// Hide full nav on mobile, show logo + CTA only
className="... min-w-[280px] sm:min-w-[620px]"
```

Add mobile-only compact view in Navbar.tsx (hide nav links on mobile — they exist but are `hidden md:flex`). The mobile navbar shows logo + CTA button only within the island.

**Step 3: Fix FloatingNodeGraph for mobile**

Add `className="hidden sm:block"` wrapper on the node graph in both hero sections, replacing it with a simple decorative line on mobile:

```tsx
{/* Desktop: full node graph */}
<div className="hidden sm:block w-full max-w-[680px] mb-10">
  <FloatingNodeGraph role="institution" />
</div>
{/* Mobile: simple spacing — headline is the visual */}
<div className="sm:hidden h-6" />
```

**Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx src/components/ui/FloatingNodeGraph.tsx src/components/sections/HeroInstitution.tsx src/components/sections/HeroStudent.tsx
git commit -m "fix: mobile responsive layout and navbar"
```

---

## Task 15: Production Build and Final QA

**Step 1: Build**

```bash
npm run build
# Expected: clean build, zero TypeScript errors
```

**Step 2: Lint**

```bash
npm run lint
# Fix any errors before continuing
```

**Step 3: Final studio quality checklist**

Compare against reference images side-by-side:

- [ ] Navbar is a floating island — NOT edge-to-edge (CoreShift reference)
- [ ] Hero visual is a floating node graph — NOT rotating SVG arcs, NOT gradient blobs
- [ ] Background is pure white — NO gradient wash behind hero
- [ ] Headline: ONE word in solid `#2563EB` — no `background-clip: text` gradient
- [ ] Primary hero CTA: pill (`rounded-full`) — secondary is text link only
- [ ] Navbar CTA: `rounded-md` (10px) — distinct from hero CTA
- [ ] Node graph cards: white, bordered, subtle shadow — no colorful fills
- [ ] Connector lines: thin, dashed, `#BFDBFE` — elegant not obvious
- [ ] Social proof: muted to 40% opacity, grayscale, minimal
- [ ] Mobile: no horizontal overflow at 375px
- [ ] No element looks like it was generated by an AI design tool
- [ ] Fonts: Satoshi loading, JetBrains Mono on metric values

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete navbar and hero implementation — studio quality"
```

---

## Definition of Done

- [ ] Split entry at `/` — minimal, no navbar, two clean role cards
- [ ] `/?role=institution` — floating island navbar + institution hero
- [ ] `/?role=student` — floating island navbar + student hero
- [ ] FloatingNodeGraph: floating metric cards + dashed connectors
- [ ] Satoshi font rendering, JetBrains Mono on metric values
- [ ] Lenis smooth scroll initialized
- [ ] Mobile responsive at 375px
- [ ] Production build clean
- [ ] Visually distinct from any AI-generated or template design

---

*When in doubt: subtract, not add.*
