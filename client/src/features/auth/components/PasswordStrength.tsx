import { getPasswordStrength } from '../validation'

type PasswordStrengthProps = {
  password: string
}

const strengthColors = {
  Weak: 'bg-rose-400',
  Fair: 'bg-amber-300',
  Good: 'bg-cyan-300',
  Strong: 'bg-emerald-300',
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = getPasswordStrength(password)
  const activeBars = password ? Math.max(1, Math.min(4, strength.score)) : 0

  return (
    <div className="space-y-2" aria-live="polite">
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className={[
              'h-1.5 flex-1 rounded-full transition-colors',
              bar <= activeBars ? strengthColors[strength.label] : 'bg-white/10',
            ].join(' ')}
          />
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Password strength: <span className="font-medium text-slate-200">{password ? strength.label : 'Not set'}</span>
      </p>
    </div>
  )
}
