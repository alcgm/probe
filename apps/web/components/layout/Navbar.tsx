'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'

export default function Navbar() {
  const path = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5"
      style={{ background: 'rgba(8,11,16,0.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(232,255,71,0.1)' }}>

      <Link href="/" className="font-display font-black text-accent tracking-widest text-lg">
        PROBE
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-8 list-none">
        {[['/#how', 'How it works'], ['/#features', 'Features'], ['/verify', 'Verifier'], ['/#waitlist', 'Early access']].map(([href, label]) => (
          <li key={href}>
            <Link href={href}
              className={clsx(
                'text-xs tracking-widest uppercase transition-colors duration-200',
                path === href ? 'text-accent' : 'text-muted hover:text-white'
              )}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/dashboard"
        className="hidden md:block font-mono text-xs tracking-widest uppercase px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-bg transition-colors duration-200">
        Launch app
      </Link>

      {/* Mobile toggle */}
      <button className="md:hidden text-muted" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="font-mono text-xs tracking-widest">{menuOpen ? 'CLOSE' : 'MENU'}</span>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface border-b border-probe md:hidden">
          <ul className="flex flex-col list-none p-6 gap-5">
            {[['/#how', 'How it works'], ['/#features', 'Features'], ['/verify', 'Verifier'], ['/#waitlist', 'Early access'], ['/dashboard', 'Launch app']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} onClick={() => setMenuOpen(false)}
                  className="text-xs tracking-widest uppercase text-muted hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
