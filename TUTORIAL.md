# 🧠 Getting Started with Syra AI — The Intelligence Layer for Solana Trading

> **Syra AI** is an open-source AI trading intelligence agent for the Solana ecosystem. It combines real-time market data, on-chain signals (holder flows, smart money, DEX activity), and AI-driven sentiment analysis to deliver clear, actionable insights for traders and builders.

---

## 📌 What is Syra AI?

Syra is **not** a trading bot — it's an **intelligence layer**. Instead of executing trades for you, Syra provides:

- **Real-time sentiment analysis** — aggregated from 50+ news & social sources
- **On-chain intelligence** — whale tracking, smart money flows, holder analysis
- **Risk scoring** — volatility, liquidity, and rug-pull risk assessment
- **AI-driven research** — structured trade outlooks with reasoning, not just signals
- **Technical indicators** — RSI, MACD, EMA, support/resistance levels

Think of Syra as an AI analyst that watches everything happening on Solana and tells you what matters.

---

## 🚀 Three Ways to Use Syra

### 1. Syra Agent (Natural Language)
The easiest way to get started. Visit **[agent.syraa.fun](https://agent.syraa.fun)** and ask questions in plain English:
- "What's the sentiment on SOL right now?"
- "Show me whale movements in the last 24 hours"
- "Analyze JUP for me"

### 2. API Playground (Interactive Testing)
Head to **[playground.syraa.fun](https://playground.syraa.fun)** to test API endpoints interactively. No coding required — just select an endpoint, set parameters, and see the response.

### 3. API Integration (Build Your Own)
For developers who want to integrate Syra intelligence into their apps, bots, or workflows. Full documentation at **[docs.syraa.fun](https://docs.syraa.fun)**.

---

## 🔗 How the Syra API Works (x402 Protocol)

Syra uses the **x402 payment protocol** — a trustless, pay-per-request model built on Solana. No API keys, no accounts, no subscriptions. You pay only for what you use.

### The Payment Flow

```
Step 1: Send Request
────────────────────
GET https://api.syraa.fun/v2/news
Body: { "ticker": "SOL" }

Step 2: Receive 402 Response
────────────────────────────
HTTP 402 Payment Required
{
  "price": 0.01,
  "currency": "USD",
  "network": "solana",
  "paymentMethod": "x402"
}

Step 3: Submit Payment
──────────────────────
Complete a micropayment on Solana (USDC/SOL)
Headers: PAYMENT-SIGNATURE, PAYMENT-TOKEN

Step 4: Get Your Data ✓
───────────────────────
HTTP 200 OK
{
  "data": [
    {
      "title": "Solana DEX Volume Hits ATH",
      "sentiment": "bullish",
      "source": "CoinDesk"
    }
  ]
}
```

**Why x402?**
- ✅ No API keys to manage or leak
- ✅ No accounts or subscriptions
- ✅ Perfect for AI agents (machine-to-machine payments)
- ✅ Micropayments — pay cents per request
- ✅ Trustless — purely on-chain verification

---

## 📊 Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/news` | Latest crypto news & headlines |
| `POST` | `/news` | News for a specific ticker |
| `GET` | `/sentiment` | Market sentiment analysis |
| `GET` | `/trending-headline` | Trending headlines aggregate |
| `GET` | `/sundown-digest` | End-of-day market summary |
| `GET` | `/nansen` | Nansen smart money data |
| `GET` | `/dexscreener` | DEX pair analytics |
| `GET` | `/jupiter` | Jupiter DEX integration |
| `GET` | `/rugcheck` | Rug pull risk assessment |
| `GET` | `/bubblemaps` | Token holder visualization |

Base URL: `https://api.syraa.fun/v2`

---

## 🛠 Quick Start: Fetching News with JavaScript

Here's a simple example of how you'd call the Syra API:

```javascript
// Step 1: Make the initial request
const response = await fetch('https://api.syraa.fun/v2/news', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ticker: 'SOL' })
});

// Step 2: Handle the 402 payment response
if (response.status === 402) {
  const paymentInfo = await response.json();
  console.log('Payment required:', paymentInfo);

  // Step 3: Complete payment using Solana wallet
  // (Use your preferred Solana SDK to sign the transaction)
  const paymentProof = await processPayment(paymentInfo);

  // Step 4: Retry with payment proof
  const dataResponse = await fetch('https://api.syraa.fun/v2/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'PAYMENT-SIGNATURE': paymentProof.signature,
      'PAYMENT-TOKEN': paymentProof.token
    },
    body: JSON.stringify({ ticker: 'SOL' })
  });

  const data = await dataResponse.json();
  console.log('News data:', data);
}
```

---

## 🤖 Using Syra as an MCP Server

Syra can be integrated as a **Model Context Protocol (MCP)** server, meaning any MCP-compatible AI client (Claude, Cursor, etc.) can use Syra's tools directly. Check the [GitHub repo](https://github.com/ikhwanhsn/syra_agent) for the `mcp-server` directory.

---

## 🔍 What Makes Syra Different?

| Feature | Typical Bots | Syra AI |
|---------|-------------|---------|
| Output | Buy/Sell signals only | Structured research with reasoning |
| Data | Limited sources | 50+ sources + on-chain signals |
| Payment | Monthly subscription | Pay-per-request (x402) |
| Access | Single platform | API + Agent + Playground + Telegram |
| Intelligence | Basic TA | AI sentiment + risk + whale tracking |
| Open Source | Usually closed | ✅ MIT Licensed |

---

## 📎 Resources

- 🌐 **Product**: [syraa.fun](https://syraa.fun)
- 📖 **Documentation**: [docs.syraa.fun](https://docs.syraa.fun)
- 🎮 **API Playground**: [playground.syraa.fun](https://playground.syraa.fun)
- 🤖 **Syra Agent**: [agent.syraa.fun](https://agent.syraa.fun)
- 💬 **Telegram Bot**: [@syra_trading_bot](https://t.me/syra_trading_bot)
- 💻 **GitHub**: [ikhwanhsn/syra_agent](https://github.com/ikhwanhsn/syra_agent)
- 🐦 **Twitter**: [@syra_agent](https://x.com/syra_agent)

---

*This tutorial and accompanying dashboard were built as a community contribution to showcase Syra AI's capabilities. All data in the dashboard is simulated for demonstration purposes. For real-time intelligence, use the [Syra Agent](https://agent.syraa.fun) or [API Playground](https://playground.syraa.fun).*
