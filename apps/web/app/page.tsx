import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TraceFeed from '@/components/ui/TraceFeed'
import WaitlistForm from '@/components/ui/WaitlistForm'
import HowItWorks from '@/components/ui/HowItWorks'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <Navbar />

      {/* ── HERO ── */}
      <section className="min-h-screen grid md:grid-cols-2 pt-20"
        style={{ borderBottom: '1px solid rgba(232,255,71,0.1)' }}>

        {/* Left */}
        <div className="flex flex-col justify-center px-8 md:px-12 py-20"
          style={{ borderRight: '1px solid rgba(232,255,71,0.08)' }}>

          <p className="font-mono text-xs tracking-widest uppercase text-accent mb-7 flex items-center gap-3">
            <span className="w-6 h-px bg-accent inline-block" />
            Agent Debugger — Base Network
          </p>

          <h1 className="font-display font-black leading-none tracking-tight mb-7"
            style={{ fontSize: 'clamp(40px, 5.5vw, 70px)', letterSpacing: '-0.025em' }}>
            Debug your agent<br />
            before it <span className="text-accent">spends</span><br />
            your money.
          </h1>

          <p className="font-mono text-sm leading-loose mb-12 max-w-md"
            style={{ color: '#4A5568' }}>
            Simulate, trace, and verify AI agent behavior on Base — wallet-signed provenance on every run. Catch the bad calls before they cost gas.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link href="#waitlist"
              className="font-mono text-xs tracking-widest uppercase px-8 py-4 bg-accent text-bg font-medium hover:opacity-90 transition-opacity">
              Request access
            </Link>
            <Link href="#how"
              className="font-mono text-xs tracking-widest uppercase px-6 py-4 border text-muted hover:text-white transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              See how it works
            </Link>
          </div>
        </div>

        {/* Right — Trace Feed */}
        <div className="flex flex-col justify-center px-8 md:px-12 py-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-muted">Live simulation trace</span>
          </div>
          <div className="bg-surface border p-6 h-96 overflow-hidden relative"
            style={{ borderColor: 'rgba(232,255,71,0.1)' }}>
            <TraceFeed />
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="flex items-center gap-10 overflow-x-auto px-8 md:px-12 py-4 border-b"
        style={{ borderColor: 'rgba(232,255,71,0.08)' }}>
        <span className="font-mono text-xs tracking-widest uppercase shrink-0" style={{ color: '#2D3748' }}>Stack</span>
        {['Built on Base', 'EIP-712 Signed', 'x402 Compatible', 'SIGNA Ready', 'MCP / A2A Support', 'Foundry Verified'].map(item => (
          <span key={item} className="font-mono text-xs tracking-wider uppercase shrink-0 flex items-center gap-2"
            style={{ color: '#4A5568' }}>
            <span className="w-1 h-1 bg-accent inline-block" />
            {item}
          </span>
        ))}
      </div>

      {/* ── HERO IMAGE ── */}
      <div className="px-8 md:px-12 py-16 border-b" style={{ borderColor: 'rgba(232,255,71,0.08)' }}>
        <div className="relative w-full aspect-[21/9] overflow-hidden bg-surface">
          <Image
            src="/images/hero-visual.png"
            alt="PROBE — agent simulation visualization"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="px-8 md:px-12 py-24 border-b"
        style={{ borderColor: 'rgba(232,255,71,0.08)' }}>
        <p className="font-mono text-xs tracking-widest uppercase text-accent mb-5">How it works</p>
        <h2 className="font-display font-black leading-tight mb-4"
          style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-0.02em' }}>
          From broken agent<br />to verified behavior.
        </h2>
        <p className="font-mono text-sm text-muted max-w-lg mb-16 leading-loose">
          Three steps. No accounts. No API keys handed over. Your wallet signs everything.
        </p>
        <HowItWorks />
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="px-8 md:px-12 py-24 bg-surface border-b"
        style={{ borderColor: 'rgba(232,255,71,0.08)' }}>
        <p className="font-mono text-xs tracking-widest uppercase text-accent mb-5">Capabilities</p>
        <h2 className="font-display font-black leading-tight mb-16"
          style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-0.02em' }}>
          Everything you need to ship<br />agents that don&apos;t break in prod.
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {FEATURES.map((f) => (
            <div key={f.title}
              className="p-10 hover:bg-surface2 transition-colors duration-200"
              style={{ background: '#0F1419' }}>
              <div className="relative w-full aspect-video mb-6 overflow-hidden bg-bg">
                <Image src={f.image} alt={f.title} fill className="object-cover" />
              </div>
              <h3 className="font-display font-bold text-lg mb-3">{f.title}</h3>
              <p className="font-mono text-sm leading-loose text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="grid md:grid-cols-2 px-8 md:px-12 py-24 border-b"
        style={{ borderColor: 'rgba(232,255,71,0.08)' }}>

        <div className="md:pr-20 pb-16 md:pb-0 md:border-r border-b md:border-b-0"
          style={{ borderColor: 'rgba(232,255,71,0.08)' }}>
          <p className="font-mono text-xs tracking-widest uppercase text-accent mb-5">Early access</p>
          <h2 className="font-display font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-0.02em' }}>
            Be first to debug<br />on Base.
          </h2>
          <p className="font-mono text-sm text-muted leading-loose max-w-sm mb-12">
            PROBE is in closed alpha. Early access members get $PROBE token allocation and direct input on the roadmap.
          </p>
          <div className="flex gap-16">
            <div>
              <p className="font-display font-black text-4xl text-accent leading-none mb-2">247+</p>
              <p className="font-mono text-xs tracking-widest uppercase text-muted">Devs waiting</p>
            </div>
            <div>
              <p className="font-display font-black text-4xl text-accent leading-none mb-2">Base</p>
              <p className="font-mono text-xs tracking-widest uppercase text-muted">Network</p>
            </div>
          </div>
        </div>

        <div className="md:pl-20 pt-16 md:pt-0">
          <WaitlistForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}

const FEATURES = [
  {
    title: 'Simulation Sandbox',
    image: '/images/feature-sandbox.png',
    desc:  'Run any agent invocation in an isolated fork of Base. See every state change without touching mainnet or spending gas.',
  },
  {
    title: 'Trace Viewer',
    image: '/images/feature-trace.png',
    desc:  'Full call tree visualization. Every tool call, LLM inference, wallet signature, and on-chain interaction mapped in execution order.',
  },
  {
    title: 'Signature Verifier',
    image: '/images/feature-verify.png',
    desc:  'Re-verify any EIP-712 signed message and recover the signer. One tampered byte and a different address comes back.',
  },
]
