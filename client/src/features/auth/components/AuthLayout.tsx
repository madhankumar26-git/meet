import type { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
  eyebrow: string
  title: string
  description: string
}

export function AuthLayout({ children, description, eyebrow, title }: AuthLayoutProps) {
  return (
    <main className="min-h-svh overflow-hidden bg-slate-950 text-white">
      <div className="grid min-h-svh lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 px-10 py-10 lg:flex lg:flex-col lg:justify-between xl:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(34,211,238,0.2),transparent_28rem),radial-gradient(circle_at_78%_20%,rgba(16,185,129,0.16),transparent_26rem),linear-gradient(145deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))]" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-300 text-lg font-black text-slate-950 shadow-lg shadow-cyan-950/40">
              G
            </div>
            <div>
              <p className="text-lg font-bold tracking-wide text-white">GMeeting</p>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Secure Video</p>
            </div>
          </div>

          <div className="relative z-10 max-w-xl auth-rise">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {eyebrow}
            </p>
            <h1 className="max-w-lg text-5xl font-semibold leading-tight text-white">
              {title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">{description}</p>
          </div>

          <div className="relative z-10 mb-4 rounded-lg border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl auth-rise">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Executive weekly sync</p>
                <p className="text-xs text-slate-400">Encrypted meeting room</p>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-200">
                Live
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['MK', 'AN', 'JS', 'RL'].map((initials, index) => (
                <div
                  key={initials}
                  className="grid aspect-video place-items-center rounded-lg border border-white/10 bg-slate-900/80"
                >
                  <div
                    className={[
                      'grid h-12 w-12 place-items-center rounded-full text-sm font-bold text-slate-950',
                      index === 0 ? 'bg-cyan-300' : '',
                      index === 1 ? 'bg-emerald-300' : '',
                      index === 2 ? 'bg-blue-300' : '',
                      index === 3 ? 'bg-fuchsia-300' : '',
                    ].join(' ')}
                  >
                    {initials}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  className="h-1.5 flex-1 rounded-full bg-cyan-300/70 signal-pulse"
                  style={{ animationDelay: `${bar * 120}ms` }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-svh items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-md auth-rise">
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-300 font-black text-slate-950">
                G
              </div>
              <p className="text-lg font-bold">GMeeting</p>
            </div>
            <div className="rounded-lg border border-white/12 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
