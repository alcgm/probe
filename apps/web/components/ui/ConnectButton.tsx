'use client'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function ConnectButton({ className }: { className?: string }) {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <button onClick={() => disconnect()} className={className}>
        {address.slice(0, 6)}…{address.slice(-4)}
      </button>
    )
  }

  return (
    <button onClick={() => connect({ connector: injected() })} className={className}>
      Connect wallet
    </button>
  )
}
