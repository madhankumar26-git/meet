export type PasswordStrength = {
  label: 'Weak' | 'Fair' | 'Good' | 'Strong'
  score: number
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateRequired(value: string, fieldName: string) {
  return value.trim() ? '' : `${fieldName} is required.`
}

export function validateEmail(value: string) {
  if (!value.trim()) {
    return 'Email is required.'
  }

  return emailPattern.test(value) ? '' : 'Enter a valid email address.'
}

export function getPasswordStrength(password: string): PasswordStrength {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ]
  const score = checks.filter(Boolean).length

  if (score <= 2) {
    return { label: 'Weak', score }
  }

  if (score === 3) {
    return { label: 'Fair', score }
  }

  if (score === 4) {
    return { label: 'Good', score }
  }

  return { label: 'Strong', score }
}
