import type { InputHTMLAttributes, ReactNode } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  label: string
  rightElement?: ReactNode
}

export function Input({
  className = '',
  error,
  id,
  label,
  rightElement,
  ...props
}: InputProps) {
  const inputId = id ?? props.name
  const errorId = error && inputId ? `${inputId}-error` : undefined

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-slate-200">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={[
            'h-12 w-full rounded-lg border bg-slate-950/45 px-4 text-sm text-white outline-none transition',
            'placeholder:text-slate-500 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/10',
            rightElement ? 'pr-14' : '',
            error ? 'border-rose-400/70' : 'border-white/12',
            className,
          ].join(' ')}
          {...props}
        />
        {rightElement ? (
          <div className="absolute inset-y-0 right-2 flex items-center">{rightElement}</div>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} className="text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}
