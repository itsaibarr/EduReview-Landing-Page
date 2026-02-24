'use client'

import { motion } from 'framer-motion'

interface NodeCard {
  id: string
  value: string
  label: string
  accent: string
  x: number
  y: number
  floatDelay: number
}

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

interface FloatingNodeGraphProps {
  role: 'institution' | 'student'
}

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
