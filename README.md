# PROBE

**Debug your agent before it spends your money.**

Most agent failures happen in production. Wrong tool call, bad slippage estimate, a signature that doesn't verify — and by the time you know, gas is gone. PROBE gives you a simulation sandbox on Base where you can run, trace, and verify agent behavior before anything touches mainnet.

No accounts. No email. Your wallet signs the session.

---

## What it does

You send a message to your agent. PROBE intercepts every call in an isolated Base fork, builds a full execution trace, estimates gas, flags reverts, and signs a receipt you can verify later. When everything looks good, you export the capability directly to the [SIGNA](https://signaagent.xyz) marketplace with a provenance hash attached.

Three things, done well:

- **Sandbox** — isolated Base fork, no mainnet risk
- **Trace viewer** — every call, every signature, in order
- **Verifier** — re-verify any EIP-191 signed message, recover the signer

---

## Stack

Next.js 14 · Tailwind · TypeScript · Supabase · viem · Vercel

Contracts on Base (Foundry) — coming in v2.

---

## Project structure

```
probe/
├── apps/
│   └── web/                 # everything you see
│       ├── app/             # Next.js App Router pages
│       ├── components/      # UI + layout components
│       ├── lib/             # Supabase client, hooks
│       └── public/images/   # static assets
└── contracts/               # Solidity (v2)
```

---

## Running locally

```bash
cd apps/web
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

You'll need a Supabase project with a `waitlist` table:

```sql
create table waitlist (
  id         uuid default gen_random_uuid() primary key,
  wallet     text not null,
  handle     text,
  building   text,
  created_at timestamp with time zone default now()
);

alter table waitlist enable row level security;
create policy "allow insert" on waitlist for insert with check (true);
```

---

## Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Deploying

Push to GitHub. Import on Vercel, set root directory to `apps/web`, add the two env vars. That's it.

---

## Roadmap

- [x] Landing page + waitlist
- [x] Signature verifier (EIP-191)
- [x] Dashboard skeleton
- [ ] Wallet connect (RainbowKit)
- [ ] Live sandbox (Base fork)
- [ ] Full trace viewer
- [ ] $PROBE token + allocation for early access
- [ ] SIGNA marketplace export

---

Built on Base · 2026
