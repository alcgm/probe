import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ConnectButton } from '@/components/ui/ConnectButton'
import SimulationForm from '@/components/ui/SimulationForm'

export const metadata = {
  title: 'PROBE — Dashboard',
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
            <h1 className="font-display font-black text-3xl tracking-tight">Agent workbench</h1>
          </div>
          <ConnectButton className="font-mono text-xs tracking-widest uppercase px-6 py-3 bg-accent text-bg font-medium hover:opacity-90 transition-opacity" />
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — Simulation */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-accent mb-5">Sandbox</p>
            <h2 className="font-display font-bold text-xl mb-2">Run a simulation</h2>
            <p className="font-mono text-xs text-muted leading-loose mb-8">
              Paste your agent endpoint and a test message. PROBE calls your agent, intercepts any transaction intents, simulates them on a Base fork, and returns a signed receipt.
            </p>
            <SimulationForm />
          </div>

          {/* Right — Quick links */}
          <div className="flex flex-col gap-px" style={{ background: 'rgba(232,255,71,0.06)' }}>
            {[
              { label: 'Verifier', title: 'Verify a signature', desc: 'Recover the signer from any EIP-191 or EIP-712 message.', href: '/verify', cta: 'Open verifier' },
              { label: 'Marketplace', title: 'Browse capabilities', desc: 'Discover and export agent capabilities to SIGNA network.', href: '#', cta: 'Coming soon' },
              { label: 'v2 — Coming soon', title: 'Full test suite', desc: 'Scenario suites, stress tests, and fork-mode debugging. Launching soon.', href: '#', cta: 'Get notified' },
            ].map(card => (
              <div key={card.title} className="bg-bg p-8 flex flex-col gap-3">
                <p className="font-mono text-xs tracking-widest uppercase text-accent">{card.label}</p>
                <h3 className="font-display font-bold text-base">{card.title}</h3>
                <p className="font-mono text-xs text-muted leading-loose flex-1">{card.desc}</p>
                <Link href={card.href}
                  className="font-mono text-xs tracking-widest uppercase text-muted hover:text-white transition-colors self-start border-b pb-0.5"
                  style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                  {card.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
