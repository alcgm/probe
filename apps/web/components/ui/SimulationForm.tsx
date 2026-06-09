'use client'
import { useState } from 'react'
import { useAccount } from 'wagmi'

type TraceEntry = { type: string; url?: string; to?: string; latency?: number; gasEstimate?: string; status?: string; error?: string; response?: string }
type SimResult = { passed: boolean; trace: TraceEntry[]; gasEstimate: string; callCount: number; reverts: number; agentLatency: number; receipt: { hash: string; signature: string; signedBy: string } }

const TAG_COLORS: Record<string, string> = { agent_call: '#63B3ED', tx: '#9AE6B4', error: '#FC8181' }

export default function SimulationForm() {
  const { address } = useAccount()
  const [agentUrl, setAgentUrl] = useState('')
  const [message, setMessage]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [result,  setResult]    = useState<SimResult | null>(null)
  const [error,   setError]     = useState('')

  const API_URL = process.env.NEXT_PUBLIC_PROBE_API_URL || ''

  async function run() {
    if (!agentUrl.trim() || !message.trim()) { setError('Agent URL and message are required.'); return }
    setError(''); setLoading(true); setResult(null)
    try {
      const res = await fetch(`${API_URL}/api/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentUrl: agentUrl.trim(), message: message.trim(), wallet: address }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Simulation failed')
      setResult(data)
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  const inp = { background: '#0F1419', border: '1px solid rgba(232,255,71,0.12)', color: '#F0F0F0', fontFamily: 'inherit', fontSize: '12px', padding: '10px 14px', outline: 'none', width: '100%', transition: 'border-color 0.2s' } as const

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs tracking-widest uppercase text-muted">Agent endpoint URL</label>
        <input value={agentUrl} onChange={e => setAgentUrl(e.target.value)} placeholder="https://your-agent.com/api" style={inp}
          onFocus={e => (e.target.style.borderColor = '#E8FF47')} onBlur={e => (e.target.style.borderColor = 'rgba(232,255,71,0.12)')} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs tracking-widest uppercase text-muted">Test message</label>
        <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)}
          placeholder='e.g. "swap 200 USDC to ETH, max slippage 1%"'
          style={{ ...inp, resize: 'vertical' } as React.CSSProperties}
          onFocus={e => (e.target.style.borderColor = '#E8FF47')} onBlur={e => (e.target.style.borderColor = 'rgba(232,255,71,0.12)')} />
      </div>
      {error && <p className="font-mono text-xs" style={{ color: '#FC8181' }}>{error}</p>}
      <button onClick={run} disabled={loading || !address}
        className="font-mono text-xs tracking-widest uppercase py-4 bg-accent text-bg font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
        {loading ? 'Simulating…' : !address ? 'Connect wallet first' : 'Run simulation →'}
      </button>
      {result && (
        <div className="flex flex-col gap-4 border p-6 mt-2" style={{ borderColor: 'rgba(232,255,71,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 ${result.passed ? 'bg-accent' : 'bg-orange'}`} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: result.passed ? '#E8FF47' : '#FF6B35' }}>
              {result.passed ? 'Simulation passed' : 'Simulation failed'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[{label:'Gas estimate',val:result.gasEstimate},{label:'Calls',val:String(result.callCount)},{label:'Reverts',val:String(result.reverts)}].map(s=>(
              <div key={s.label}><p className="font-mono text-xs text-muted mb-1">{s.label}</p><p className="font-mono text-sm text-white">{s.val}</p></div>
            ))}
          </div>
          <div className="flex flex-col gap-1 border-t pt-4" style={{ borderColor: 'rgba(232,255,71,0.08)' }}>
            <p className="font-mono text-xs tracking-widest uppercase text-muted mb-2">Trace</p>
            {result.trace.map((entry, i) => (
              <div key={i} className="flex gap-3 items-start py-1">
                <span className="font-mono text-xs px-1.5 py-0.5 shrink-0" style={{ background: 'rgba(232,255,71,0.06)', color: TAG_COLORS[entry.type] || '#F0F0F0' }}>{entry.type}</span>
                <span className="font-mono text-xs text-muted leading-relaxed">
                  {entry.type==='agent_call' ? `${entry.url} · ${entry.latency}ms` : entry.type==='tx' ? `${entry.to?.slice(0,12)}… · gas ${entry.gasEstimate} · ${entry.status}` : entry.error}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex flex-col gap-1" style={{ borderColor: 'rgba(232,255,71,0.08)' }}>
            <p className="font-mono text-xs tracking-widest uppercase text-muted mb-1">Receipt</p>
            <p className="font-mono text-xs break-all" style={{ color: '#63B3ED' }}>{result.receipt.hash}</p>
            <p className="font-mono text-xs text-muted">signed by {result.receipt.signedBy}</p>
          </div>
        </div>
      )}
    </div>
  )
}
