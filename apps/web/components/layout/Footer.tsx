import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
      style={{ borderColor: 'rgba(232,255,71,0.1)' }}>
      <span className="font-display font-black text-accent tracking-widest text-base">PROBE</span>
      <ul className="flex gap-6 list-none">
        {[['#', 'Docs'], ['https://github.com', 'GitHub'], ['https://x.com/SANXARR234', 'X'], ['#', 'Farcaster']].map(([href, label]) => (
          <li key={label}>
            <Link href={href} target={href.startsWith('http') ? '_blank' : undefined}
              className="text-xs tracking-widest uppercase text-muted hover:text-white transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <span className="font-mono text-xs text-muted">Built on Base Â· 2026</span>
    </footer>
  )
}
