import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'PROBE â€” Dashboard',
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-bg">
      <Navbar />

      <div className="pt-32 pb-24 px-8 md:px-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-16 border-b pb-10"
          style={{ borderColor: 'rgba(232,255,71,0.08)' }}>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-accent mb-3">Dashboard</p>
            <h1 className="font-display font-black text-3xl tracking-tight">
              Agent workbench
            </h1>
          </div>
          <button className="font-mono text-xs tracking-widest uppercase px-6 py-3 bg-accent text-bg font-medium hover:opacity-90 transition-opacity">
            Connect wallet
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-16"
          style={{ background: 'rgba(232,255,71,0.06)' }}>
          {[
            { val: 'â€”',  label: 'Simulations run' },
            { val: 'â€”',  label: 'Traces saved' },
            { val: 'â€”',  label: 'Gas saved (est.)' },
            { val: 'â€”',  label: 'Capabilities exported' },
          ].map(s => (
            <div key={s.label} className="bg-bg p-8">
              <p className="font-display font-black text-4xl text-accent leading-none mb-2">{s.val}</p>
              <p className="font-mono text-xs tracking-widest uppercase text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Connect wallet CTA */}
        <div className="bg-surface border p-16 flex flex-col items-center text-center gap-6 mb-16"
          style={{ borderColor: 'rgba(232,255,71,0.1)' }}>
          <div className="w-14 h-14 border border-accent flex items-center justify-center">
            <div className="w-4 h-4 bg-accent" />
          </div>
          <p className="font-display font-bold text-xl">Connect your wallet to start debugging.</p>
          <p className="font-mono text-sm text-muted max-w-sm leading-loose">
            Your wallet is your login. No email, no password. Sign once to start a session.
          </p>
          <button className="font-mono text-xs tracking-widest uppercase px-10 py-4 bg-accent text-bg font-medium hover:opacity-90 transition-opacity">
            Connect wallet
          </button>
        </div>

        {/* Quick links */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: 'rgba(232,255,71,0.06)' }}>
          {[
            {
              label: 'Sandbox',
              title: 'Run a simulation',
              desc: 'Test any agent invocation in an isolated Base fork.',
              href: '#',
              cta: 'Coming soon',
            },
            {
              label: 'Verifier',
              title: 'Verify a signature',
              desc: 'Recover the signer from any EIP-191 or EIP-712 message.',
              href: '/verify',
              cta: 'Open verifier',
            },
            {
              label: 'Marketplace',
              title: 'Browse capabilities',
              desc: 'Discover and export agent capabilities to SIGNA network.',
              href: '#',
              cta: 'Coming soon',
            },
          ].map(card => (
            <div key={card.title} className="bg-bg p-10 flex flex-col gap-4">
              <p className="font-mono text-xs tracking-widest uppercase text-accent">{card.label}</p>
              <h3 className="font-display font-bold text-lg">{card.title}</h3>
              <p className="font-mono text-sm text-muted leading-loose flex-1">{card.desc}</p>
              <Link href={card.href}
                className="font-mono text-xs tracking-widest uppercase text-muted hover:text-white transition-colors self-start border-b pb-0.5"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                {card.cta} â†’
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
