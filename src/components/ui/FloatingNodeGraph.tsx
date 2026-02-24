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
const CENTER_X = 300
const CENTER_Y = 200

/**
 * Connected node graph — floating metric cards linked by dashed SVG lines.
 * Inspired by CoreShift's integration graph, adapted with engagement metrics.
 * Each card floats independently with slow oscillation.
 */
export function FloatingNodeGraph({ role }: FloatingNodeGraphProps) {
  const nodes = role === 'institution' ? INSTITUTION_NODES : STUDENT_NODES
  const edges = role === 'institution' ? INSTITUTION_EDGES : STUDENT_EDGES

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
      {/* SVG connector lines — behind the cards */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 400"
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
        {/* Midpoint dots on connector lines */}
        {edges.map(([fromId, toId]) => {
          const from = positions[fromId]
          const to = positions[toId]
          if (!from || !to) return null
          const mx = (from.cx + to.cx) / 2
          const my = (from.cy + to.cy) / 2
          return (
            <circle
              key={`dot-${fromId}-${toId}`}
              cx={mx}
              cy={my}
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
            y: [0, -8, 0],
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
      >
        {node.value}
      </span>
    </div>
  )
}
