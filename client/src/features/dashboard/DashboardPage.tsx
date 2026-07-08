import { useAuth } from '../auth/AuthContext'
import { Button } from '../../components/ui/Button'

export function DashboardPage() {
  const { user, logout } = useAuth()

  if (!user) return null

  // Get initials for avatar fallback if avatar is not set
  const initials = user.fullName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col justify-between">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.15),transparent_35rem),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.12),transparent_30rem),linear-gradient(180deg,#0f172a,#020617)]" />

      {/* Header / Navbar */}
      <header className="relative z-10 border-b border-white/10 px-6 py-4 backdrop-blur-md bg-slate-950/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-300 text-lg font-black text-slate-950 shadow-md shadow-cyan-900/30">
              G
            </div>
            <div>
              <p className="text-md font-bold tracking-wide text-white">GMeeting</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-200/80">Workspace</p>
            </div>
          </div>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-white/12 bg-white/[0.04] p-8 shadow-2xl shadow-black/50 backdrop-blur-3xl text-center">
          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-slate-900 shadow-inner">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.fullName}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 text-2xl font-black text-slate-950">
                {initials}
              </div>
            )}
            <span className="absolute bottom-1 right-1 h-4.5 w-4.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200/80">Account Profile</p>
          <h2 className="mt-1 text-2xl font-bold text-white tracking-tight">{user.fullName}</h2>
          <p className="text-sm text-slate-400 mt-1">{user.email}</p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 px-4 py-1.5 text-xs font-semibold text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
            Role: {user.role}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-4">Secure Connection</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Account status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Security protocol</span>
                <span className="text-slate-300 font-mono text-xs bg-white/[0.03] border border-white/5 rounded px-2 py-0.5">JWT-SHA256</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-4 text-center text-xs text-slate-600 bg-slate-950/20">
        &copy; 2026 GMeeting. All data transmission is secure and end-to-end encrypted.
      </footer>
    </main>
  )
}
