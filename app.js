/* ========================================
   SYRA AI — Trading Intelligence Dashboard
   Application Logic
   ======================================== */

// ── Simulated Data ──
const TOKENS = [
  { symbol: 'SOL', name: 'Solana', price: 148.32, change: 3.2, mcap: '68.4B', icon: '◎' },
  { symbol: 'JUP', name: 'Jupiter', price: 1.24, change: 5.8, mcap: '1.7B', icon: '🪐' },
  { symbol: 'BONK', name: 'Bonk', price: 0.000023, change: -2.1, mcap: '1.5B', icon: '🐕' },
  { symbol: 'RAY', name: 'Raydium', price: 4.87, change: 1.9, mcap: '1.3B', icon: '☀️' },
  { symbol: 'ORCA', name: 'Orca', price: 3.52, change: -0.5, mcap: '250M', icon: '🐋' },
  { symbol: 'WIF', name: 'dogwifhat', price: 1.78, change: 12.4, mcap: '1.8B', icon: '🎩' },
  { symbol: 'PYTH', name: 'Pyth Network', price: 0.38, change: 2.7, mcap: '1.4B', icon: '🔮' },
  { symbol: 'JTO', name: 'Jito', price: 3.15, change: -1.3, mcap: '780M', icon: '⚡' },
  { symbol: 'RENDER', name: 'Render', price: 7.42, change: 4.1, mcap: '3.8B', icon: '🎨' },
  { symbol: 'HNT', name: 'Helium', price: 8.94, change: 0.8, mcap: '1.6B', icon: '📡' },
];

const NEWS_ITEMS = [
  { title: 'Solana DEX Volume Hits New All-Time High of $4.2B Daily', desc: 'Decentralized exchange volume on Solana has surged to unprecedented levels, driven by Jupiter and Raydium. Smart money wallets are increasing allocation to SOL-based DeFi protocols.', source: 'CoinDesk', time: '12m ago', sentiment: 'bullish' },
  { title: 'Whale Alert: $15M USDC Moved to Jupiter for SOL Accumulation', desc: 'A known smart money wallet transferred $15 million USDC from Coinbase to Jupiter DEX, likely positioning for a major SOL buy.', source: 'Whale Alert', time: '28m ago', sentiment: 'bullish' },
  { title: 'x402 Protocol Adoption Surges Among AI Agent Builders', desc: 'The x402 payment standard is seeing rapid adoption as AI agents leverage trustless micropayments for API access. Syra AI leads with its pay-per-query intelligence API.', source: 'The Block', time: '1h ago', sentiment: 'bullish' },
  { title: 'SEC Signals Potential Solana ETF Review by Q3 2025', desc: 'Multiple asset managers have filed amended applications for a spot Solana ETF. Regulatory signals suggest a review process could begin before year-end.', source: 'Reuters', time: '2h ago', sentiment: 'bullish' },
  { title: 'Memecoin Market Cap Drops 8% as Risk-Off Sentiment Grows', desc: 'The total memecoin market capitalization declined sharply over the past 24 hours. Analysts point to profit-taking and rotation into blue-chip DeFi tokens.', source: 'DeFi Llama', time: '3h ago', sentiment: 'bearish' },
  { title: 'Pyth Network Expands to 200+ Data Feeds on Solana', desc: 'Oracle provider Pyth adds support for emerging Solana tokens, improving DeFi infrastructure.', source: 'Pyth Blog', time: '4h ago', sentiment: 'neutral' },
  { title: 'Smart Money Rotation: DeFi Tokens Outperform L1s This Week', desc: 'On-chain data shows large holders rotating from L1 tokens into DeFi governance tokens, particularly on Solana.', source: 'Nansen', time: '5h ago', sentiment: 'bullish' },
  { title: 'Solana TVL Crosses $12B Milestone', desc: 'Total value locked in Solana DeFi protocols has surpassed $12 billion, reflecting growing confidence in the ecosystem.', source: 'DeFi Llama', time: '6h ago', sentiment: 'bullish' },
];

const WHALE_MOVEMENTS = [
  { wallet: '7xKXt...9qZa', action: 'Bought SOL on Jupiter', amount: '$2.4M', token: 'SOL', time: '5m', icon: '🟢' },
  { wallet: 'DpYn2...h4Rm', action: 'Transferred to cold storage', amount: '$1.8M', token: 'USDC', time: '12m', icon: '🔵' },
  { wallet: '8mLq3...vX2K', action: 'Sold BONK on Raydium', amount: '$890K', token: 'BONK', time: '18m', icon: '🔴' },
  { wallet: 'Fy9Wz...nT5J', action: 'Bought JUP on Jupiter', amount: '$1.2M', token: 'JUP', time: '25m', icon: '🟢' },
  { wallet: 'Ck4Lr...pM8B', action: 'Deposited into Marinade', amount: '$3.1M', token: 'SOL', time: '34m', icon: '🟡' },
  { wallet: '2bQx7...aR6N', action: 'Bought WIF on Raydium', amount: '$560K', token: 'WIF', time: '42m', icon: '🟢' },
  { wallet: 'Hj5Ns...tY3W', action: 'Withdrew from Binance', amount: '$4.5M', token: 'SOL', time: '1h', icon: '🟢' },
  { wallet: '9pKm4...zD1V', action: 'Sold RAY on Orca', amount: '$720K', token: 'RAY', time: '1.5h', icon: '🔴' },
];

const DEX_PAIRS = [
  { pair: 'SOL/USDC', volume: '$1.2B', change: '+12.4%', positive: true },
  { pair: 'JUP/SOL', volume: '$342M', change: '+8.7%', positive: true },
  { pair: 'BONK/SOL', volume: '$218M', change: '-3.2%', positive: false },
  { pair: 'WIF/SOL', volume: '$189M', change: '+15.1%', positive: true },
  { pair: 'RAY/USDC', volume: '$156M', change: '+4.3%', positive: true },
];

const API_ENDPOINTS = [
  { method: 'GET', path: '/news', desc: 'Latest crypto news & headlines' },
  { method: 'POST', path: '/news', desc: 'News for a specific ticker' },
  { method: 'GET', path: '/sentiment', desc: 'Market sentiment analysis' },
  { method: 'GET', path: '/trending-headline', desc: 'Trending headlines' },
  { method: 'GET', path: '/sundown-digest', desc: 'End-of-day market summary' },
  { method: 'GET', path: '/nansen', desc: 'Nansen smart money data' },
  { method: 'GET', path: '/dexscreener', desc: 'DexScreener pair analytics' },
  { method: 'GET', path: '/jupiter', desc: 'Jupiter DEX integration' },
  { method: 'GET', path: '/rugcheck', desc: 'Rug pull risk assessment' },
  { method: 'GET', path: '/bubblemaps', desc: 'Token holder visualization' },
];

// ── Tab Navigation ──
document.querySelectorAll('.section-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('section-tab--active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('panel--active'));
    tab.classList.add('section-tab--active');
    const panelId = 'panel' + tab.dataset.panel.charAt(0).toUpperCase() + tab.dataset.panel.slice(1);
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.add('panel--active');
  });
});

document.getElementById('btnExplore')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
});

// ── Populate News Feed ──
function renderNews() {
  const container = document.getElementById('newsList');
  if (!container) return;
  container.innerHTML = NEWS_ITEMS.map(item => `
    <div class="news-item">
      <div class="news-item__sentiment news-item__sentiment--${item.sentiment}"></div>
      <div class="news-item__body">
        <div class="news-item__title">${item.title}</div>
        <div class="news-item__desc">${item.desc}</div>
        <div class="news-item__meta">
          <span class="news-item__source">${item.source}</span>
          <span>${item.time}</span>
          <span style="text-transform: capitalize; color: var(--${item.sentiment});">● ${item.sentiment}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Populate Top Mentions ──
function renderTopMentions() {
  const container = document.getElementById('topMentions');
  if (!container) return;
  const top5 = TOKENS.slice(0, 5);
  container.innerHTML = top5.map((t, i) => `
    <div class="whale-item" style="cursor: pointer;" onclick="selectToken('${t.symbol}')">
      <div style="font-size: 18px; font-weight: 700; color: var(--cyan); min-width: 24px;">${i + 1}</div>
      <div style="font-size: 20px;">${t.icon}</div>
      <div class="whale-item__info">
        <div style="font-weight: 600;">${t.symbol}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">${t.name}</div>
      </div>
      <div class="whale-item__amount">
        <div class="whale-item__value">$${t.price < 0.01 ? t.price.toFixed(6) : t.price.toFixed(2)}</div>
        <div class="whale-item__token ${t.change >= 0 ? 'text-bullish' : 'text-bearish'}">
          ${t.change >= 0 ? '▲' : '▼'} ${Math.abs(t.change)}%
        </div>
      </div>
    </div>
  `).join('');
}

// ── Populate Whale List ──
function renderWhales() {
  const container = document.getElementById('whaleList');
  if (!container) return;
  container.innerHTML = WHALE_MOVEMENTS.map(w => `
    <div class="whale-item">
      <div class="whale-item__icon">${w.icon}</div>
      <div class="whale-item__info">
        <div class="whale-item__wallet">${w.wallet}</div>
        <div class="whale-item__action">${w.action}</div>
      </div>
      <div class="whale-item__amount">
        <div class="whale-item__value">${w.amount}</div>
        <div class="whale-item__token">${w.token}</div>
      </div>
      <div class="whale-item__time">${w.time}</div>
    </div>
  `).join('');
}

// ── Populate DEX Activity ──
function renderDexActivity() {
  const container = document.getElementById('dexActivity');
  if (!container) return;
  container.innerHTML = DEX_PAIRS.map(d => `
    <div class="indicator" style="margin-bottom: 14px;">
      <span class="indicator__label" style="min-width: 110px; font-weight: 600; color: var(--text-primary);">${d.pair}</span>
      <div class="indicator__bar">
        <div class="indicator__fill" style="width: ${parseInt(d.volume) / 12}%; background: ${d.positive ? 'var(--bullish)' : 'var(--bearish)'}; transition: width 1.5s ease;"></div>
      </div>
      <span class="indicator__value" style="min-width: 70px;">${d.volume}</span>
      <span class="indicator__value ${d.positive ? 'text-bullish' : 'text-bearish'}" style="min-width: 60px;">${d.change}</span>
    </div>
  `).join('');
}

// ── Populate API Endpoints ──
function renderEndpoints() {
  const container = document.getElementById('endpointList');
  if (!container) return;
  container.innerHTML = API_ENDPOINTS.map(ep => `
    <div class="whale-item" style="padding: 10px 14px;">
      <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; min-width: 42px; text-align: center;
        background: ${ep.method === 'GET' ? 'var(--bullish-dim)' : 'var(--electric-blue-dim)'};
        color: ${ep.method === 'GET' ? 'var(--bullish)' : 'var(--electric-blue)'};">
        ${ep.method}
      </span>
      <span class="mono" style="font-size: 13px; color: var(--cyan);">${ep.path}</span>
      <span style="font-size: 12px; color: var(--text-secondary); margin-left: auto;">${ep.desc}</span>
    </div>
  `).join('');
}

// ── Token Search & Autocomplete ──
const searchInput = document.getElementById('tokenSearch');
const suggestionsBox = document.getElementById('searchSuggestions');

searchInput?.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) { suggestionsBox.classList.remove('search-box__suggestions--open'); return; }
  const matches = TOKENS.filter(t => t.symbol.toLowerCase().includes(query) || t.name.toLowerCase().includes(query));
  if (matches.length > 0) {
    suggestionsBox.innerHTML = matches.map(t => `
      <div class="suggestion-item" onclick="selectToken('${t.symbol}')">
        <span style="font-size: 18px;">${t.icon}</span>
        <span class="suggestion-item__symbol">${t.symbol}</span>
        <span class="suggestion-item__name">${t.name}</span>
      </div>
    `).join('');
    suggestionsBox.classList.add('search-box__suggestions--open');
  } else {
    suggestionsBox.classList.remove('search-box__suggestions--open');
  }
});

searchInput?.addEventListener('blur', () => {
  setTimeout(() => suggestionsBox?.classList.remove('search-box__suggestions--open'), 200);
});

function selectToken(symbol) {
  const token = TOKENS.find(t => t.symbol === symbol);
  if (!token) return;
  searchInput.value = `${token.symbol} — ${token.name}`;
  suggestionsBox?.classList.remove('search-box__suggestions--open');
  const analyzeTab = document.getElementById('tabAnalyze');
  if (analyzeTab && !analyzeTab.classList.contains('section-tab--active')) analyzeTab.click();
  renderTokenAnalysis(token);
}

function renderTokenAnalysis(token) {
  const container = document.getElementById('tokenAnalysis');
  if (!container) return;
  const sentiment = 45 + Math.floor(Math.random() * 40);
  const rsi = 30 + Math.floor(Math.random() * 50);
  const momentum = 20 + Math.floor(Math.random() * 60);
  const volatility = 15 + Math.floor(Math.random() * 50);
  const confidence = 55 + Math.floor(Math.random() * 35);
  const holders = (1000 + Math.floor(Math.random() * 50000)).toLocaleString();
  const volume24h = '$' + (Math.random() * 500 + 10).toFixed(1) + 'M';
  const sentimentColor = sentiment >= 60 ? 'var(--bullish)' : sentiment >= 40 ? 'var(--neutral)' : 'var(--bearish)';
  const sentimentLabel = sentiment >= 60 ? 'Bullish' : sentiment >= 40 ? 'Neutral' : 'Bearish';

  container.innerHTML = `
    <div class="token-header">
      <div class="token-header__icon">${token.icon}</div>
      <div>
        <div class="token-header__name">${token.name}</div>
        <div class="token-header__symbol">${token.symbol} · Mcap: ${token.mcap}</div>
      </div>
      <div class="token-header__price">
        <div class="token-header__price-value">$${token.price < 0.01 ? token.price.toFixed(6) : token.price.toFixed(2)}</div>
        <div class="token-header__price-change ${token.change >= 0 ? 'text-bullish' : 'text-bearish'}">
          ${token.change >= 0 ? '▲' : '▼'} ${Math.abs(token.change)}% (24h)
        </div>
      </div>
    </div>
    <div class="grid-3">
      <div class="card" style="text-align: center;">
        <div class="score-ring">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle class="score-ring__bg" cx="60" cy="60" r="52" />
            <circle class="score-ring__fill" cx="60" cy="60" r="52" stroke-dasharray="326.7" stroke-dashoffset="${326.7 - (326.7 * sentiment / 100)}" stroke="${sentimentColor}" />
          </svg>
          <div class="score-ring__value" style="color: ${sentimentColor};">${sentiment}</div>
        </div>
        <div class="score-ring__label">AI Sentiment</div>
        <div style="font-weight: 600; color: ${sentimentColor}; margin-top: 4px;">${sentimentLabel}</div>
      </div>
      <div class="card" style="text-align: center;">
        <div class="score-ring">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle class="score-ring__bg" cx="60" cy="60" r="52" />
            <circle class="score-ring__fill" cx="60" cy="60" r="52" stroke-dasharray="326.7" stroke-dashoffset="${326.7 - (326.7 * confidence / 100)}" stroke="var(--cyan)" />
          </svg>
          <div class="score-ring__value text-cyan">${confidence}</div>
        </div>
        <div class="score-ring__label">AI Confidence</div>
      </div>
      <div class="card" style="text-align: center;">
        <div style="font-size: 42px; margin-bottom: 8px;">${token.icon}</div>
        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Key Stats</div>
        <div style="text-align: left;">
          <div class="indicator"><span class="indicator__label" style="font-size: 12px;">Holders</span><span class="indicator__value" style="font-size: 13px;">${holders}</span></div>
          <div class="indicator"><span class="indicator__label" style="font-size: 12px;">Vol (24h)</span><span class="indicator__value" style="font-size: 13px;">${volume24h}</span></div>
          <div class="indicator"><span class="indicator__label" style="font-size: 12px;">RSI</span><span class="indicator__value" style="font-size: 13px; color: ${rsi > 70 ? 'var(--bearish)' : rsi < 30 ? 'var(--bullish)' : 'var(--neutral)'};">${rsi}</span></div>
        </div>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card__title" style="margin-bottom: 16px;"><span class="card__title-icon">📊</span> Technical Indicators</div>
      <div class="indicator"><span class="indicator__label">Sentiment</span><div class="indicator__bar"><div class="indicator__fill" style="width: ${sentiment}%; background: ${sentimentColor};"></div></div><span class="indicator__value" style="color: ${sentimentColor};">${sentiment}</span></div>
      <div class="indicator"><span class="indicator__label">RSI (14)</span><div class="indicator__bar"><div class="indicator__fill" style="width: ${rsi}%; background: ${rsi > 70 ? 'var(--bearish)' : rsi < 30 ? 'var(--bullish)' : 'var(--neutral)'};"></div></div><span class="indicator__value">${rsi}</span></div>
      <div class="indicator"><span class="indicator__label">Momentum</span><div class="indicator__bar"><div class="indicator__fill" style="width: ${momentum}%; background: ${momentum > 50 ? 'var(--bullish)' : 'var(--neutral)'};"></div></div><span class="indicator__value">${momentum}</span></div>
      <div class="indicator"><span class="indicator__label">Volatility</span><div class="indicator__bar"><div class="indicator__fill" style="width: ${volatility}%; background: ${volatility > 60 ? 'var(--bearish)' : 'var(--neutral)'};"></div></div><span class="indicator__value">${volatility}</span></div>
      <div class="indicator"><span class="indicator__label">AI Confidence</span><div class="indicator__bar"><div class="indicator__fill" style="width: ${confidence}%; background: var(--cyan);"></div></div><span class="indicator__value text-cyan">${confidence}%</span></div>
    </div>
    <div class="card mt-4" style="border-left: 3px solid var(--cyan);">
      <div class="card__title" style="margin-bottom: 12px;"><span class="card__title-icon">🤖</span> Syra AI Analysis</div>
      <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.7;">
        <strong style="color: var(--text-primary);">Summary:</strong> ${token.name} (${token.symbol}) is showing
        ${sentimentLabel.toLowerCase()} signals based on aggregated on-chain data, social sentiment, and technical indicators.
        ${sentiment >= 60
      ? `Smart money wallets have been accumulating ${token.symbol} over the past 48 hours. DEX volume is trending upward with buy pressure exceeding sell pressure by ${(momentum / 10).toFixed(1)}x. The current RSI of ${rsi} suggests ${rsi > 65 ? 'the token is approaching overbought territory — watch for a pullback' : 'room for continued upward movement'}.`
      : sentiment >= 40
        ? `Market activity for ${token.symbol} is relatively balanced. No strong directional signal detected. The RSI at ${rsi} indicates neutral momentum. Consider waiting for a clearer signal before entering a position.`
        : `Caution is advised for ${token.symbol}. On-chain metrics show declining holder count and increased sell pressure from large wallets. The RSI of ${rsi} indicates ${rsi < 30 ? 'oversold conditions — a bounce is possible' : 'weakening momentum'}.`
    }
      </p>
      <p style="font-size: 12px; color: var(--text-muted); margin-top: 12px;">
        ⚠️ This is a simulated analysis for demonstration purposes. Use <a href="https://agent.syraa.fun" target="_blank" style="color: var(--cyan);">Syra Agent</a> or the <a href="https://playground.syraa.fun" target="_blank" style="color: var(--cyan);">API Playground</a> for real intelligence.
      </p>
    </div>
  `;
  container.classList.add('token-analysis--visible');
}

// ── x402 Payment Flow Demo ──
let flowStep = 0;
function runFlowDemo() {
  const btn = document.getElementById('flowRunBtn');
  const steps = [document.getElementById('flowStep1'), document.getElementById('flowStep2'), document.getElementById('flowStep3'), document.getElementById('flowStep4')];
  if (flowStep >= steps.length) {
    steps.forEach(s => { s.classList.remove('flow-step--done', 'flow-step--active'); });
    steps[0].classList.add('flow-step--active');
    flowStep = 0;
    btn.textContent = '▶ Run Demo';
    return;
  }
  btn.disabled = true;
  if (flowStep > 0) { steps[flowStep - 1].classList.remove('flow-step--active'); steps[flowStep - 1].classList.add('flow-step--done'); }
  steps[flowStep].classList.add('flow-step--active');
  steps[flowStep].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  flowStep++;
  setTimeout(() => {
    btn.disabled = false;
    if (flowStep >= steps.length) { steps[flowStep - 1].classList.remove('flow-step--active'); steps[flowStep - 1].classList.add('flow-step--done'); btn.textContent = '↺ Reset Demo'; }
    else { btn.textContent = `▶ Step ${flowStep + 1} of 4`; }
  }, 600);
}

// ── Smart Money Flow Chart (Canvas) ──
function drawFlowChart() {
  const canvas = document.getElementById('flowChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  const padding = { top: 30, right: 20, bottom: 40, left: 50 };
  const chartW = w - padding.left - padding.right, chartH = h - padding.top - padding.bottom;
  const hours = 24, inflow = [], outflow = [];
  for (let i = 0; i < hours; i++) { inflow.push(Math.random() * 8 + 2); outflow.push(-(Math.random() * 6 + 1)); }
  const maxVal = 12, minVal = -8, range = maxVal - minVal;
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { const y = padding.top + (chartH * i / 4); ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(w - padding.right, y); ctx.stroke(); }
  const zeroY = padding.top + (chartH * maxVal / range);
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(padding.left, zeroY); ctx.lineTo(w - padding.right, zeroY); ctx.stroke(); ctx.setLineDash([]);
  const barWidth = chartW / hours * 0.6, barGap = chartW / hours;
  for (let i = 0; i < hours; i++) {
    const x = padding.left + i * barGap + barGap * 0.2;
    const inflowH = (inflow[i] / range) * chartH;
    ctx.fillStyle = 'rgba(0, 230, 118, 0.6)'; ctx.beginPath(); ctx.roundRect(x, zeroY - inflowH, barWidth * 0.45, inflowH, 2); ctx.fill();
    const outflowH = (Math.abs(outflow[i]) / range) * chartH;
    ctx.fillStyle = 'rgba(255, 82, 82, 0.5)'; ctx.beginPath(); ctx.roundRect(x + barWidth * 0.5, zeroY, barWidth * 0.45, outflowH, 2); ctx.fill();
  }
  ctx.fillStyle = 'rgba(138, 148, 166, 0.7)'; ctx.font = '10px Space Grotesk'; ctx.textAlign = 'center';
  for (let i = 0; i < hours; i += 4) { ctx.fillText(`${i}h`, padding.left + i * barGap + barGap / 2, h - 10); }
  ctx.textAlign = 'right';
  ctx.fillText('+$10M', padding.left - 6, padding.top + 10);
  ctx.fillText('$0', padding.left - 6, zeroY + 4);
  ctx.fillText('-$8M', padding.left - 6, h - padding.bottom - 2);
  ctx.font = '11px Space Grotesk'; ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(0, 230, 118, 0.8)'; ctx.fillRect(padding.left, 8, 10, 10); ctx.fillText('Inflow', padding.left + 14, 17);
  ctx.fillStyle = 'rgba(255, 82, 82, 0.7)'; ctx.fillRect(padding.left + 70, 8, 10, 10); ctx.fillText('Outflow', padding.left + 84, 17);
}

// ── Sentiment Gauge Canvas ──
function drawGaugeCanvas() {
  const canvas = document.getElementById('gaugeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 200 * dpr; canvas.height = 120 * dpr; ctx.scale(dpr, dpr);
  const cx = 100, cy = 105, r = 80, lineWidth = 14;
  ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI); ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = lineWidth; ctx.lineCap = 'round'; ctx.stroke();
  const gradient = ctx.createLinearGradient(0, cy, 200, cy);
  gradient.addColorStop(0, '#ff5252'); gradient.addColorStop(0.35, '#ffd740'); gradient.addColorStop(0.65, '#00e5ff'); gradient.addColorStop(1, '#00e676');
  ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI); ctx.strokeStyle = gradient; ctx.lineWidth = lineWidth; ctx.lineCap = 'round'; ctx.stroke();
  for (let i = 0; i <= 10; i++) {
    const angle = Math.PI + (Math.PI * i / 10);
    const innerR = r - lineWidth / 2 - 4, outerR = r - lineWidth / 2 - (i % 5 === 0 ? 12 : 7);
    ctx.beginPath();
    ctx.moveTo(cx + innerR * Math.cos(angle), cy + innerR * Math.sin(angle));
    ctx.lineTo(cx + outerR * Math.cos(angle), cy + outerR * Math.sin(angle));
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = i % 5 === 0 ? 2 : 1; ctx.stroke();
  }
}

// ── Simulate live data updates ──
function simulateLiveUpdates() {
  setInterval(() => {
    const priceEl = document.getElementById('solPrice');
    if (priceEl) { const base = 148.32; const fluctuation = (Math.random() - 0.5) * 2; priceEl.textContent = '$' + (base + fluctuation).toFixed(2); }
  }, 5000);
}

// ── Initialize Everything ──
document.addEventListener('DOMContentLoaded', () => {
  renderNews(); renderTopMentions(); renderWhales(); renderDexActivity(); renderEndpoints(); drawGaugeCanvas(); simulateLiveUpdates();
  setTimeout(() => { const needle = document.getElementById('gaugeNeedle'); if (needle) needle.style.setProperty('--needle-angle', '36deg'); }, 500);
  const whalesTab = document.getElementById('tabWhales');
  const chartDrawn = { done: false };
  whalesTab?.addEventListener('click', () => { if (!chartDrawn.done) { setTimeout(drawFlowChart, 100); chartDrawn.done = true; } });
  const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting && !chartDrawn.done) { drawFlowChart(); chartDrawn.done = true; } }); });
  const flowCanvas = document.getElementById('flowChart');
  if (flowCanvas) observer.observe(flowCanvas);
});
