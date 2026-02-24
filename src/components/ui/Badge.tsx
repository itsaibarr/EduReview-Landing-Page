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
