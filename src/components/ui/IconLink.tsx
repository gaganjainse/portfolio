import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BaseIconLinkProps {
  href: string
  label: string
  icon: React.ReactNode
  variant?: 'default' | 'primary' | 'outline'
  className?: string
}

export type IconLinkProps = ButtonHTMLAttributes<HTMLAnchorElement> & Omit<BaseIconLinkProps, 'href'>

const variantClasses = {
  default: 'px-6 py-3 border border-border text-text hover:border-primary/50 hover:text-primary-light',
  primary: 'px-6 py-3 bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25',
  outline: 'px-6 py-3 border border-accent/30 text-accent hover:bg-accent/10',
}

/**
 * IconLink component for social links with icons
 */
export function IconLink({
  href,
  label,
  icon,
  variant = 'default',
  className,
  ...props
}: IconLinkProps & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-2 rounded-lg font-medium transition-all',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon}
      {label}
    </a>
  )
}
