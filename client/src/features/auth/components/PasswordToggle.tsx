type PasswordToggleProps = {
  isVisible: boolean
  onToggle: () => void
}

export function PasswordToggle({ isVisible, onToggle }: PasswordToggleProps) {
  return (
    <button
      type="button"
      className="rounded-md px-2 py-1 text-xs font-semibold text-cyan-200 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
      aria-label={isVisible ? 'Hide password' : 'Show password'}
      onClick={onToggle}
    >
      {isVisible ? 'Hide' : 'Show'}
    </button>
  )
}
