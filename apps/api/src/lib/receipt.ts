import { keccak256, encodePacked, privateKeyToAccount } from 'viem'

export async function signReceipt(data: {
  agentUrl: string
  message: string
  passed: boolean
  gasEstimate: string
  callCount: number
  timestamp: number
}) {
  const pk = process.env.EVM_PRIVATE_KEY as `0x${string}`
  if (!pk) throw new Error('EVM_PRIVATE_KEY not set')

  const account = privateKeyToAccount(pk)

  const hash = keccak256(encodePacked(
    ['string', 'string', 'bool', 'string', 'uint32', 'uint256'],
    [data.agentUrl, data.message, data.passed, data.gasEstimate, data.callCount, BigInt(data.timestamp)]
  ))

  const signature = await account.signMessage({ message: { raw: hash } })

  return { hash, signature, signedBy: account.address, timestamp: data.timestamp }
}
