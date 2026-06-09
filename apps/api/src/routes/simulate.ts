import { Router } from 'express'
import { createPublicClient, http, formatGwei } from 'viem'
import { base } from 'viem/chains'
import { startAnvil, stopAnvil, AnvilInstance } from '../lib/anvil'
import { signReceipt } from '../lib/receipt'
import { supabase } from '../lib/supabase'

export const simulateRouter = Router()

interface TxIntent { to: string; data?: string; value?: string }
interface SimulateBody { agentUrl: string; message: string; wallet?: string }

simulateRouter.post('/', async (req, res) => {
  const { agentUrl, message, wallet } = req.body as SimulateBody
  if (!agentUrl || !message) return res.status(400).json({ error: 'agentUrl and message are required' })

  const timestamp = Date.now()
  let anvil: AnvilInstance | null = null
  const trace: object[] = []

  try {
    const agentStart = Date.now()
    const agentRes = await fetch(agentUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(15000),
    })
    const agentLatency = Date.now() - agentStart

    if (!agentRes.ok) throw new Error(`Agent returned ${agentRes.status}`)
    const agentData = await agentRes.json() as { response?: string; transactions?: TxIntent[] }

    trace.push({
      type: 'agent_call',
      url: agentUrl,
      latency: agentLatency,
      response: agentData.response || JSON.stringify(agentData).slice(0, 300),
    })

    const txs: TxIntent[] = agentData.transactions || []
    let totalGas = BigInt(0)
    let reverts = 0

    if (txs.length > 0) {
      anvil = await startAnvil()
      const client = createPublicClient({ chain: base, transport: http(anvil.rpcUrl) })

      for (const tx of txs) {
        try {
          const gas = await client.estimateGas({
            account: (wallet || '0x0000000000000000000000000000000000000001') as `0x${string}`,
            to: tx.to as `0x${string}`,
            data: tx.data as `0x${string}` | undefined,
            value: tx.value ? BigInt(tx.value) : undefined,
          })
          totalGas += gas
          trace.push({ type: 'tx', to: tx.to, gasEstimate: gas.toString(), status: 'success' })
        } catch (e: any) {
          reverts++
          trace.push({ type: 'tx', to: tx.to, status: 'revert', error: (e.shortMessage || e.message || '').slice(0, 200) })
        }
      }
    }

    const gasEstimate = totalGas > 0 ? `${formatGwei(totalGas)} gwei` : 'N/A'
    const passed = reverts === 0

    const receipt = await signReceipt({ agentUrl, message, passed, gasEstimate, callCount: trace.length, timestamp })

    supabase.from('simulations').insert({
      wallet: wallet || null, agent_url: agentUrl, message,
      trace, gas_estimate: gasEstimate, call_count: trace.length,
      reverts, passed, receipt_hash: receipt.hash,
      receipt_signature: receipt.signature, receipt_signed_by: receipt.signedBy,
    }).then()

    res.json({ success: true, passed, trace, gasEstimate, callCount: trace.length, reverts, agentLatency, receipt })
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Simulation failed' })
  } finally {
    if (anvil) stopAnvil(anvil)
  }
})
