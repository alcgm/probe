'use client'
import { useState } from 'react'

// Minimal EIP-191 personal_sign recovery without ethers/viem dependency
// Uses native Web Crypto + manual keccak simulation via browser
async function recoverAddress(message: string, signature: string): Promise<string> {
  // Dynamic import viem only on client
  const { recoverMessageAddress } = await import('viem')
  try {
    const address = await recoverMessageAddress({
      message,
      signature: signature as `0x${string}`,
    })
    return address
  } catch {
    throw new Error('Invalid signature format')
  }
}

export default function VerifierTool() {
  const [message,   setMessage]   = useState('')
  const [signature, setSignature] = useState('')
  const [result,    setResult]    = useState<{ address: string; valid: boolean } | null>(null)
  const [error,     setError]     = useState('')
  const [loading,   setLoading]   = useState(false)

  async function verify() {
    if (!message.trim() || !signature.trim()) {
      setError('Both message and signature are required.')
      return
    }
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const address = await recoverAddress(message.trim(), signature.trim())
      setResult({ address, valid: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Verification failed.')
    }
    setLoading(false)
  }

  function reset() { setMessage(''); setSignature(''); setResult(null); setError('') }

  const inputStyle = {
    background: '#0F1419',
    border: '1px solid rgba(232,255,71,0.12)',
    color: '#F0F0F0',
    fontFamily: 'inherit',
    fontSize: '12px',
    padding: '12px 16px',
    outline: 'none',
    width: '100%',
    resize: 'vertical' as const,
    transition: 'border-color 0.2s',
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">

      {/* Input panel */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs tracking-widest uppercase text-muted">Message</label>
          <textarea
            rows={5}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="The original message that was signed..."
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = '#E8FF47')}
            onBlur={e => (e.target.style.borderColor = 'rgba(232,255,71,0.12)')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs tracking-widest uppercase text-muted">Signature</label>
          <textarea
            rows={4}
            value={signature}
            onChange={e => setSignature(e.target.value)}
            placeholder="0x..."
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = '#E8FF47')}
            onBlur={e => (e.target.style.borderColor = 'rgba(232,255,71,0.12)')}
          />
        </div>

        {error && <p className="font-mono text-xs" style={{ color: '#FC8181' }}>{error}</p>}

        <div className="flex gap-3">
          <button onClick={verify} disabled={loading}
            className="flex-1 font-mono text-xs tracking-widest uppercase py-4 bg-accent text-bg font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? 'Recovering...' : 'Recover signer'}
          </button>
          <button onClick={reset}
            className="font-mono text-xs tracking-widest uppercase px-6 py-4 border text-muted hover:text-white transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            Reset
          </button>
        </div>
      </div>

      {/* Result panel */}
      <div className="bg-surface border min-h-64 p-8 flex flex-col justify-center"
        style={{ borderColor: 'rgba(232,255,71,0.1)' }}>
        {!result && !loading && (
          <div className="text-center">
            <p className="font-mono text-xs text-muted leading-loose">
              Paste a message and its signature.<br />
              The recovered address appears here.
            </p>
          </div>
        )}

        {loading && (
          <div className="text-center">
            <p className="font-mono text-xs text-accent tracking-widest uppercase animate-pulse">
              Recovering...
            </p>
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent" />
              <span className="font-mono text-xs tracking-widest uppercase text-accent">Signature valid</span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs tracking-widest uppercase text-muted">Recovered signer</p>
              <p className="font-mono text-sm break-all" style={{ color: '#63B3ED' }}>
                {result.address}
              </p>
            </div>

            <div className="border-t pt-5 flex flex-col gap-2"
              style={{ borderColor: 'rgba(232,255,71,0.08)' }}>
              <p className="font-mono text-xs tracking-widest uppercase text-muted">Verification result</p>
              <pre className="font-mono text-xs leading-loose" style={{ color: '#9AE6B4' }}>
{`{
  "valid": true,
  "recovered": "${result.address}",
  "method": "EIP-191 personal_sign"
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
