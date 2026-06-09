'use client'
import { useState } from 'react'

const STEPS = [
  {
    title: 'Connect wallet & define agent',
    desc:  'Import your agent ABI or capability endpoint. Your wallet signs the sandbox session â€” that signature is your session token. No email, no OAuth.',
    code: `<span style="color:#4A5568">// wallet-signed session init</span>

probeSession.<span style="color:#B794F6">init</span>({
  <span style="color:#63B3ED">wallet</span>:   <span style="color:#FF6B35">"0x8f3aâ€¦c921"</span>,
  <span style="color:#63B3ED">agent</span>:    <span style="color:#FF6B35">"trading-agent-v2"</span>,
  <span style="color:#63B3ED">network</span>:  <span style="color:#FF6B35">"base-mainnet"</span>,
  <span style="color:#63B3ED">signature</span>: <span style="color:#FF6B35">"0xd4e1â€¦"</span>
})

<span style="color:#4A5568">// no email Â· no API key</span>
<span style="color:#4A5568">// wallet = identity</span>`,
  },
  {
    title: 'Run simulation',
    desc:  'Send any message payload to your agent in an isolated environment. PROBE intercepts every call and builds a full execution trace with gas estimates.',
    code: `<span style="color:#4A5568">// run simulation</span>

probeSession.<span style="color:#B794F6">simulate</span>({
  <span style="color:#63B3ED">message</span>: <span style="color:#FF6B35">"swap 200 USDC to ETH"</span>,
  <span style="color:#63B3ED">fork</span>:    <span style="color:#FF6B35">"base-mainnet@latest"</span>
})

<span style="color:#4A5568">// returns full trace</span>
{
  <span style="color:#63B3ED">calls</span>:    <span style="color:#E8FF47">14</span>,
  <span style="color:#63B3ED">reverts</span>:  <span style="color:#E8FF47">0</span>,
  <span style="color:#63B3ED">gasEst</span>:   <span style="color:#FF6B35">"0.000044 ETH"</span>,
  <span style="color:#63B3ED">slippage</span>: <span style="color:#FF6B35">"0.8%"</span>,
  <span style="color:#63B3ED">safe</span>:     <span style="color:#E8FF47">true</span>
}`,
  },
  {
    title: 'Export to live network',
    desc:  'When tests pass, publish your capability directly to the SIGNA marketplace or deploy to Base mainnet with a signed provenance hash attached.',
    code: `<span style="color:#4A5568">// export to live network</span>

probeSession.<span style="color:#B794F6">export</span>({
  <span style="color:#63B3ED">target</span>:   <span style="color:#FF6B35">"signa-marketplace"</span>,
  <span style="color:#63B3ED">receipt</span>:  <span style="color:#FF6B35">"0x4e9fâ€¦a01b"</span>,
  <span style="color:#63B3ED">tests</span>:    <span style="color:#E8FF47">12</span>,
  <span style="color:#63B3ED">passed</span>:   <span style="color:#E8FF47">12</span>
})

<span style="color:#4A5568">// capability published</span>
<span style="color:#4A5568">// with signed provenance âœ“</span>`,
  },
]

export default function HowItWorks() {
  const [active, setActive] = useState(0)

  return (
    <div className="grid md:grid-cols-2 gap-16 items-start">
      {/* Steps */}
      <div className="flex flex-col">
        {STEPS.map((step, i) => (
          <button key={i} onClick={() => setActive(i)} className="text-left"
            style={{
              padding: '24px 0 24px 16px',
              borderTop: '1px solid rgba(232,255,71,0.08)',
              borderBottom: i === STEPS.length - 1 ? '1px solid rgba(232,255,71,0.08)' : 'none',
              borderLeft: active === i ? '2px solid #E8FF47' : '2px solid transparent',
              transition: 'border-color 0.2s',
            }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-2"
              style={{ color: active === i ? '#E8FF47' : '#4A5568' }}>
              0{i + 1}
            </p>
            <p className="font-display font-bold text-base mb-2"
              style={{ color: active === i ? '#F0F0F0' : '#4A5568', transition: 'color 0.2s' }}>
              {step.title}
            </p>
            <div style={{
              maxHeight: active === i ? '100px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}>
              <p className="font-mono text-xs leading-loose text-muted">{step.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Code panel */}
      <div className="bg-surface border p-8 min-h-64"
        style={{ borderColor: 'rgba(232,255,71,0.1)' }}>
        <pre className="font-mono text-xs leading-loose overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: STEPS[active].code }} />
      </div>
    </div>
  )
}
