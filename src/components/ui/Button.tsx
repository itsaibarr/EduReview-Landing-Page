import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'text'
type Size = 'hero' | 'default'

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
}

/**
 * Two distinct shapes by design:
 * - hero: pill (rounded-full) — deliberately prominent, used only on hero CTA
 * - default: rounded-md (10px) — contained, used in navbar and sections
 */
export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', className, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.99] cursor-pointer'

    const variants: Record<Variant, string> = {
      primary: 'bg-gradient-cta text-white shadow-xs hover:-translate-y-px hover:shadow-brand',
      ghost:   'border border-border text-text-secondary bg-transparent hover:border-brand-200 hover:text-brand',
      text:    'text-brand opacity-80 hover:opacity-100 gap-1 hover:gap-2',
    }

    const sizes: Record<Size, string> = {
      hero:    'px-7 py-3.5 rounded-full text-[15px]',
      default: 'px-5 py-[9px] rounded-md text-label',
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
