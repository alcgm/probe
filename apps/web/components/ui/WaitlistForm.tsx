'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function WaitlistForm() {
  const [wallet,   setWallet]   = useState('')
  const [handle,   setHandle]   = useState('')
  const [building, setBuilding] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [done,     setDone]     = useState(false)
  const [error,    setError]    = useState('')

  async function submit() {
    if (!wallet.trim()) { setError('Wallet address is required.'); return }
    setError('')
    setLoading(true)

    const { error: err } = await supabase.from('waitlist').insert({
      wallet:   wallet.trim(),
      handle:   handle.trim() || null,
      building: building.trim() || null,
    })

    setLoading(false)
    if (err) { setError('Something went wrong. Try again.'); return }
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="w-12 h-12 border border-accent flex items-center justify-center">
          <div className="w-3 h-3 bg-accent" />
        </div>
        <p className="font-display font-bold text-xl text-accent">You&apos;re in.</p>
        <p className="font-mono text-xs text-muted">Watch your wallet for the alpha invite.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs tracking-widest uppercase text-muted">
          Wallet address or ENS
        </label>
        <input
          value={wallet}
          onChange={e => setWallet(e.target.value)}
          placeholder="0x... or yourname.eth"
          className="bg-surface border font-mono text-sm px-4 py-3 outline-none text-white placeholder:text-muted transition-colors duration-200 focus:border-accent"
          style={{ borderColor: error && !wallet ? '#FF6B35' : 'rgba(232,255,71,0.15)' }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs tracking-widest uppercase text-muted">
          Farcaster / X handle <span className="normal-case">(optional)</span>
        </label>
        <input
          value={handle}
          onChange={e => setHandle(e.target.value)}
          placeholder="@yourhandle"
          className="bg-surface border font-mono text-sm px-4 py-3 outline-none text-white placeholder:text-muted transition-colors duration-200 focus:border-accent"
          style={{ borderColor: 'rgba(232,255,71,0.15)' }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs tracking-widest uppercase text-muted">
          What are you building?
        </label>
        <input
          value={building}
          onChange={e => setBuilding(e.target.value)}
          placeholder="AI trading agent, DeFi bot..."
          className="bg-surface border font-mono text-sm px-4 py-3 outline-none text-white placeholder:text-muted transition-colors duration-200 focus:border-accent"
          style={{ borderColor: 'rgba(232,255,71,0.15)' }}
        />
      </div>

      {error && <p className="font-mono text-xs" style={{ color: '#FC8181' }}>{error}</p>}

      <button
        onClick={submit}
        disabled={loading}
        className="font-mono text-xs tracking-widest uppercase py-4 bg-accent text-bg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-2">
        {loading ? 'Submitting...' : 'Join waitlist â€” get $PROBE allocation'}
      </button>

      <p className="font-mono text-xs text-center text-muted">
        No email required. Wallet address is your identity.
      </p>
    </div>
  )
}
