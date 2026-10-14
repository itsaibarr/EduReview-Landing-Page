import { neon } from '@neondatabase/serverless'

// Server-only Postgres client (Neon). Import only in server-side code (API routes).
// Never import this in components or client code.
export const sql = neon(process.env.DATABASE_URL!)
