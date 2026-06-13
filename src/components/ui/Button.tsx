import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & BaseButtonProps
export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & BaseButtonProps

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25',
  secondary: 'bg-bg-card text-text hover:bg-bg-card-hover border border-border',
  outline: 'border border-border text-text hover:border-primary/50 hover:text-primary-light',
  ghost: 'text-text-muted hover:text-text hover:bg-bg-card',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

/**
 * Button component for actions
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-all',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * LinkButton component for navigation links styled as buttons
 */
export function LinkButton({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        'rounded-lg font-medium transition-all inline-block',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
