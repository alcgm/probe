import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { simulateRouter } from './routes/simulate'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: '*' }))
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_, res) => res.json({ ok: true, service: 'PROBE API' }))
app.use('/api/simulate', simulateRouter)

app.listen(PORT, () => console.log(`PROBE API on :${PORT}`))
