import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
  leftIcon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-950/30 hover:brightness-110',
  secondary:
    'border-white/12 bg-white/[0.04] text-slate-100 hover:border-cyan-300/50 hover:bg-white/[0.08]',
}

export function Button({
  children,
  className = '',
  fullWidth = false,
  leftIcon,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex h-12 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-semibold transition duration-200 ease-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300',
        'disabled:cursor-not-allowed disabled:opacity-60',
        fullWidth ? 'w-full' : '',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {leftIcon}
      <span>{children}</span>
    </button>
  )
}
