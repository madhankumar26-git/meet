import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { AuthLayout } from '../components/AuthLayout'
import { GoogleIcon } from '../components/GoogleIcon'
import { PasswordToggle } from '../components/PasswordToggle'
import { validateEmail, validateRequired } from '../validation'
import { login } from '../../../services/auth.service'
import { useAuth } from '../AuthContext'

type LoginErrors = {
  email?: string
  password?: string
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

  function validateForm() {
    const nextErrors: LoginErrors = {
      email: validateEmail(email),
      password: validateRequired(password, 'Password'),
    }

    setErrors(nextErrors)
    return !Object.values(nextErrors).some(Boolean)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMsg(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      await login(email, password)
      await refreshUser()
      navigate('/')
    } catch (err: any) {
      const backendError = err.response?.data?.message || err.message || 'Login failed'
      setErrorMsg(backendError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Bring every conversation back into focus."
      description="Sign in to manage secure HD meetings, team rooms, and reliable collaboration workflows from one calm workspace."
    >
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Login</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Access your workspace</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Use your GMeeting account credentials to continue.
        </p>
      </div>

      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        {errorMsg && (
          <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-4 text-sm text-red-400">
            {errorMsg}
          </div>
        )}
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
          autoComplete="current-password"
          placeholder="Enter your password"
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
              password: validateRequired(password, 'Password'),
            }))
          }
          onChange={(event) => setPassword(event.target.value)}
        />

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-300 accent-cyan-300"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            Remember me
          </label>
          <a href="#forgot-password" className="font-medium text-cyan-200 hover:text-cyan-100">
            Forgot Password?
          </a>
        </div>

        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
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
        New to GMeeting?{' '}
        <Link to="/signup" className="font-semibold text-cyan-200 hover:text-cyan-100">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}
