import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VerifierTool from '@/components/ui/VerifierTool'

export const metadata = {
  title: 'PROBE â€” Signature Verifier',
  description: 'Re-verify any EIP-712 or EIP-191 signed message and recover the signer address.',
}

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-bg">
      <Navbar />
      <div className="pt-32 pb-24 px-8 md:px-12">
        <p className="font-mono text-xs tracking-widest uppercase text-accent mb-5">Universal Verifier</p>
        <h1 className="font-display font-black leading-tight mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.025em' }}>
          Re-verify any signed message.<br />
          <span className="text-accent">Recover the signer.</span>
        </h1>
        <p className="font-mono text-sm text-muted leading-loose max-w-lg mb-16">
          Paste any EIP-191 or EIP-712 signed message. PROBE recovers the signer address client-side. Tamper one byte â€” a different address comes back.
        </p>
        <VerifierTool />
      </div>
      <Footer />
    </main>
  )
}
