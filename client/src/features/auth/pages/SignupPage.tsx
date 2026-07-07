import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { AuthLayout } from '../components/AuthLayout'
import { GoogleIcon } from '../components/GoogleIcon'
import { PasswordStrength } from '../components/PasswordStrength'
import { PasswordToggle } from '../components/PasswordToggle'
import { getPasswordStrength, validateEmail, validateRequired } from '../validation'

type SignupErrors = {
  confirmPassword?: string
  email?: string
  fullName?: string
  password?: string
  termsAccepted?: string
}

export function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<SignupErrors>({})

  function validateForm() {
    const strength = getPasswordStrength(password)
    const nextErrors: SignupErrors = {
      fullName: validateRequired(fullName, 'Full name'),
      email: validateEmail(email),
      password:
        validateRequired(password, 'Password') ||
        (strength.score < 3 ? 'Use at least 8 characters with mixed character types.' : ''),
      confirmPassword:
        validateRequired(confirmPassword, 'Confirm password') ||
        (password === confirmPassword ? '' : 'Passwords do not match.'),
      termsAccepted: termsAccepted ? '' : 'You must accept the Terms & Conditions.',
    }

    setErrors(nextErrors)
    return !Object.values(nextErrors).some(Boolean)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    validateForm()
  }

  return (
    <AuthLayout
      eyebrow="Start meeting smarter"
      title="Create a secure home for your team conversations."
      description="Set up your GMeeting account for crisp video rooms, dependable scheduling, and focused collaboration built for serious teams."
    >
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Signup</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Create your account</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Frontend validation only. No account will be created yet.
        </p>
      </div>

      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Madhan Kumar"
          value={fullName}
          error={errors.fullName}
          onBlur={() =>
            setErrors((current) => ({
              ...current,
              fullName: validateRequired(fullName, 'Full name'),
            }))
          }
          onChange={(event) => setFullName(event.target.value)}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          error={errors.email}
          onBlur={() => setErrors((current) => ({ ...current, email: validateEmail(email) }))}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Create a strong password"
          value={password}
          error={errors.password}
          rightElement={
            <PasswordToggle
              isVisible={showPassword}
              onToggle={() => setShowPassword((current) => !current)}
            />
          }
          onBlur={() =>
            setErrors((current) => ({
              ...current,
              password:
                validateRequired(password, 'Password') ||
                (getPasswordStrength(password).score < 3
                  ? 'Use at least 8 characters with mixed character types.'
                  : ''),
            }))
          }
          onChange={(event) => setPassword(event.target.value)}
        />
        <PasswordStrength password={password} />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          error={errors.confirmPassword}
          rightElement={
            <PasswordToggle
              isVisible={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((current) => !current)}
            />
          }
          onBlur={() =>
            setErrors((current) => ({
              ...current,
              confirmPassword:
                validateRequired(confirmPassword, 'Confirm password') ||
                (password === confirmPassword ? '' : 'Passwords do not match.'),
            }))
          }
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-300">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-300 accent-cyan-300"
              checked={termsAccepted}
              onChange={(event) => {
                setTermsAccepted(event.target.checked)
                setErrors((current) => ({
                  ...current,
                  termsAccepted: event.target.checked
                    ? ''
                    : 'You must accept the Terms & Conditions.',
                }))
              }}
            />
            <span>
              I agree to the{' '}
              <a href="#terms" className="font-medium text-cyan-200 hover:text-cyan-100">
                Terms & Conditions
              </a>
              .
            </span>
          </label>
          {errors.termsAccepted ? (
            <p className="mt-2 text-sm text-rose-300">{errors.termsAccepted}</p>
          ) : null}
        </div>

        <Button type="submit" fullWidth>
          Create Account
        </Button>

        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span className="h-px flex-1 bg-white/10" />
          OR
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <Button variant="secondary" fullWidth leftIcon={<GoogleIcon />}>
          Continue with Google
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-cyan-200 hover:text-cyan-100">
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}
