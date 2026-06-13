import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'outline'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

const variantClasses = {
  default: 'bg-bg-card text-text-muted border border-border',
  primary: 'bg-primary/20 text-primary-light',
  success: 'bg-green-500/20 text-green-400',
  outline: 'border border-border text-text-muted',
}

const sizeClasses = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

/**
 * Badge component for labels and tags
 */
export function Badge({
  variant = 'default',
  size = 'sm',
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full font-medium inline-block',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
