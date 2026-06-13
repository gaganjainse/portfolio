import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'featured'
  children: React.ReactNode
  className?: string
}

/**
 * Card component for content containers
 */
export function Card({
  variant = 'default',
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border p-6 sm:p-8 transition-all hover:border-primary/30',
        variant === 'featured'
          ? 'bg-bg-card border-primary/20'
          : 'bg-bg-card/50 border-border',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * CardHeader component for card titles
 */
export function CardHeader({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * CardContent component for card body
 */
export function CardContent({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * CardFooter component for card actions
 */
export function CardFooter({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 flex items-center gap-4', className)} {...props}>
      {children}
    </div>
  )
}
