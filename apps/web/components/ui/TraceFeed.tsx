'use client'
import { useEffect, useRef, useState } from 'react'

type TraceLine = {
  ts: string
  tag: string
  tagClass: string
  msg: string
}

const TRACES: TraceLine[] = [
  { ts:'00:00.001', tag:'sign',   tagClass:'tag-sign',   msg:'Session signed by <span class="addr">0x8f3aâ€¦c921</span>' },
  { ts:'00:00.043', tag:'call',   tagClass:'tag-call',   msg:'invoke fetchPrice(<span class="val">ETH/USD</span>)' },
  { ts:'00:00.112', tag:'result', tagClass:'tag-result', msg:'â†’ <span class="val">$3,412.80</span> Â· latency 69ms' },
  { ts:'00:00.118', tag:'call',   tagClass:'tag-call',   msg:'invoke checkBalance(<span class="addr">0x8f3aâ€¦c921</span>)' },
  { ts:'00:00.199', tag:'result', tagClass:'tag-result', msg:'â†’ <span class="val">0.42 ETH</span> Â· <span class="val">812 USDC</span>' },
  { ts:'00:00.201', tag:'sim',    tagClass:'tag-sim',    msg:'simulate swapExact Â· input <span class="val">200 USDC</span>' },
  { ts:'00:00.344', tag:'gas',    tagClass:'tag-gas',    msg:'est. gas <span class="val">0.000031 ETH</span> Â· $0.11' },
  { ts:'00:00.346', tag:'error',  tagClass:'tag-error',  msg:'âš  slippage <span class="val">4.2%</span> exceeds limit 1%' },
  { ts:'00:00.350', tag:'sim',    tagClass:'tag-sim',    msg:'retry with split route Aâ†’Bâ†’C' },
  { ts:'00:00.521', tag:'gas',    tagClass:'tag-gas',    msg:'est. gas <span class="val">0.000044 ETH</span> Â· $0.15' },
  { ts:'00:00.522', tag:'result', tagClass:'tag-result', msg:'slippage <span class="val">0.8%</span> âœ“ within limit' },
  { ts:'00:00.530', tag:'sign',   tagClass:'tag-sign',   msg:'receipt signed Â· hash <span class="addr">0x4e9fâ€¦a01b</span>' },
  { ts:'00:00.531', tag:'call',   tagClass:'tag-call',   msg:'invoke broadcastIntent Â· dry-run' },
  { ts:'00:00.620', tag:'result', tagClass:'tag-result', msg:'â†’ ready for mainnet Â· 0 reverts' },
]

export default function TraceFeed() {
  const [lines, setLines] = useState<(TraceLine & { id: number })[]>([])
  const idRef  = useRef(0)
  const idxRef = useRef(0)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    function next() {
      const item = TRACES[idxRef.current % TRACES.length]
      idxRef.current++
      const entry = { ...item, id: idRef.current++ }
      setLines(prev => [...prev.slice(-17), entry])
      const delay = Math.random() * 200 + 60
      const pause = idxRef.current % TRACES.length === 0 ? 1800 : delay
      timer = setTimeout(next, pause)
    }

    timer = setTimeout(next, 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-full overflow-hidden">
      <style>{`
        .tag-call   { background:rgba(232,255,71,0.1);  color:#E8FF47; }
        .tag-result { background:rgba(255,107,53,0.1);  color:#FF6B35; }
        .tag-sign   { background:rgba(99,179,237,0.1);  color:#63B3ED; }
        .tag-error  { background:rgba(252,129,129,0.1); color:#FC8181; }
        .tag-gas    { background:rgba(154,230,180,0.1); color:#9AE6B4; }
        .tag-sim    { background:rgba(183,148,246,0.1); color:#B794F6; }
        .addr { color:#63B3ED; }
        .val  { color:#FF6B35; }
        .trace-enter { animation: fadeSlide 0.28s ease forwards; }
        @keyframes fadeSlide {
          from { opacity:0; transform:translateY(4px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div className="flex flex-col gap-1">
        {lines.map(line => (
          <div key={line.id} className="trace-enter flex gap-3 items-start py-0.5">
            <span className="font-mono text-xs shrink-0 w-16" style={{ color: '#4A5568' }}>{line.ts}</span>
            <span className={`font-mono text-xs px-1.5 py-0.5 shrink-0 ${line.tagClass}`}>{line.tag}</span>
            <span className="font-mono text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: line.msg }} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0F1419, transparent)' }} />
    </div>
  )
}
