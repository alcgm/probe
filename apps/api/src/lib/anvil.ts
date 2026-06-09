import { spawn, ChildProcess } from 'child_process'

export interface AnvilInstance {
  process: ChildProcess
  port: number
  rpcUrl: string
}

function randomPort() {
  return Math.floor(Math.random() * 40000) + 10000
}

export async function startAnvil(): Promise<AnvilInstance> {
  const port = randomPort()
  const forkUrl = process.env.ALCHEMY_RPC_URL!

  return new Promise((resolve) => {
    const proc = spawn('anvil', [
      '--fork-url', forkUrl,
      '--port', String(port),
      '--silent',
    ], { stdio: ['ignore', 'pipe', 'pipe'] })

    let resolved = false
    const done = () => {
      if (!resolved) {
        resolved = true
        resolve({ process: proc, port, rpcUrl: `http://127.0.0.1:${port}` })
      }
    }

    proc.stdout.on('data', done)
    proc.stderr.on('data', done)
    proc.on('error', done)
    setTimeout(done, 3000)
  })
}

export function stopAnvil(instance: AnvilInstance) {
  try { instance.process.kill('SIGTERM') } catch {}
}
