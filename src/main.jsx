import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 4,
});

const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 2,
});

const fxUniverse = [
  { key: 'EURUSD', label: 'EUR/USD', pair: 'EURUSD', type: 'forex', value: 1.0944 },
  { key: 'GBPUSD', label: 'GBP/USD', pair: 'GBPUSD', type: 'forex', value: 1.2722 },
  { key: 'USDJPY', label: 'USD/JPY', pair: 'USDJPY', type: 'forex', value: 151.82 },
  { key: 'USDCHF', label: 'USD/CHF', pair: 'USDCHF', type: 'forex', value: 0.8858 },
  { key: 'AUDUSD', label: 'AUD/USD', pair: 'AUDUSD', type: 'forex', value: 0.6524 },
  { key: 'USDCAD', label: 'USD/CAD', pair: 'USDCAD', type: 'forex', value: 1.3682 },
  { key: 'NZDUSD', label: 'NZD/USD', pair: 'NZDUSD', type: 'forex', value: 0.5968 },
  { key: 'USDSEK', label: 'USD/SEK', pair: 'USDSEK', type: 'forex', value: 10.31 },
];

const cryptoUniverse = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 67420, change: 1.82 },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3468, change: 2.41 },
  { id: 'solana', symbol: 'SOL', name: 'Solana', price: 146.2, change: 3.28 },
  { id: 'ripple', symbol: 'XRP', name: 'XRP', price: 0.618, change: 1.52 },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.171, change: 4.73 },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.714, change: -0.72 },
];

const marketIndexes = [
  { key: 'SPX', label: 'S&P 500', value: 5674.3, change: 0.78 },
  { key: 'NDX', label: 'Nasdaq 100', value: 20312.9, change: 1.14 },
  { key: 'DJI', label: 'Dow Jones', value: 42219.8, change: 0.46 },
  { key: 'FTSE', label: 'FTSE 100', value: 8302.7, change: -0.25 },
  { key: 'DAX', label: 'DAX', value: 19067.4, change: 0.66 },
  { key: 'N225', label: 'Nikkei 225', value: 38452.1, change: 1.07 },
  { key: 'HSI', label: 'Hang Seng', value: 17986.2, change: -0.64 },
];

const macroEvents = [
  { time: '08:30 ET', country: 'US', event: 'Core PCE Price Index', impact: 'High', detail: 'Inflation trend reading' },
  { time: '09:45 ET', country: 'US', event: 'Chicago PMI', impact: 'Medium', detail: 'Manufacturing sentiment' },
  { time: '10:00 ET', country: 'EU', event: 'ECB Press Conference', impact: 'High', detail: 'Rate outlook and guidance' },
  { time: '12:30 ET', country: 'UK', event: 'BoE Rate Decision', impact: 'High', detail: 'Policy path review' },
  { time: '13:30 ET', country: 'US', event: 'Initial Jobless Claims', impact: 'Medium', detail: 'Labor conditions' },
  { time: '15:00 ET', country: 'US', event: 'Consumer Sentiment', impact: 'Medium', detail: 'Household risk appetite' },
];

const microData = [
  { ticker: 'AAPL', company: 'Apple', last: 219.31, change: 1.22, kicker: 'iPhone demand' },
  { ticker: 'MSFT', company: 'Microsoft', last: 442.4, change: 0.86, kicker: 'Cloud revenue' },
  { ticker: 'NVDA', company: 'NVIDIA', last: 128.1, change: 2.71, kicker: 'AI data-center backlog' },
  { ticker: 'AMZN', company: 'Amazon', last: 183.2, change: 1.18, kicker: 'Retail margin' },
  { ticker: 'META', company: 'Meta', last: 518.7, change: 1.57, kicker: 'Ad monetization' },
];

const commodities = [
  { symbol: 'XAUUSD', name: 'Gold', price: 2355.2, change: 0.95 },
  { symbol: 'XAGUSD', name: 'Silver', price: 29.42, change: -0.33 },
  { symbol: 'WTI', name: 'Crude Oil', price: 74.61, change: 1.11 },
  { symbol: 'BRENT', name: 'Brent', price: 78.44, change: 0.62 },
];

const clamp = (value) => Math.max(-99.99, Math.min(99.99, value));

const buildSparkline = (base, volatility, points = 16) => {
  const values = [];
  for (let i = 0; i < points; i += 1) {
    const wave = Math.sin((i / points) * Math.PI * 2.1);
    const random = ((Math.sin(i * 13.7 + base) + 1) / 2) * volatility;
    const change = wave * volatility * 0.8 + random;
    values.push(base + change);
  }
  return values;
};

function formatPrice(value, digits = 4) {
  if (value >= 1000) return `${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  if (value >= 1) return `${value.toLocaleString('en-US', { maximumFractionDigits: digits })}`;
  if (value >= 0.01) return `${value.toLocaleString('en-US', { maximumFractionDigits: 4 })}`;
  return `${value.toLocaleString('en-US', { maximumFractionDigits: 6 })}`;
}

function formatPercent(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function generateFxRows() {
  return fxUniverse.map((item) => ({
    ...item,
    source: 'Live simulation',
    change: Number(((Math.random() - 0.48) * 0.9).toFixed(2)),
    sparkline: buildSparkline(item.value, 0.02),
  }));
}

function generateIndexRows() {
  return marketIndexes.map((item) => ({
    ...item,
    sparkline: buildSparkline(item.value, 0.018),
  }));
}

function generateCryptoRows() {
  return cryptoUniverse.map((item) => ({
    ...item,
    sparkline: buildSparkline(item.price, item.price * 0.02),
  }));
}

function generateMood() {
  const sentiment = Math.random() * 100;
  return {
    mood: sentiment > 55 ? 'Risk-on' : sentiment < 45 ? 'Risk-off' : 'Balanced',
    score: Math.round(sentiment),
  };
}

async function loadFxRates() {
  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,CHF,AUD,CAD,SEK,NOK,SGD,HKD');
    const data = await response.json();
    if (!data || !data.rates) return null;

    const computed = [
      { key: 'EURUSD', label: 'EUR/USD', pair: 'EURUSD', type: 'forex', value: Number((1 / data.rates.EUR).toFixed(4)) },
      { key: 'GBPUSD', label: 'GBP/USD', pair: 'GBPUSD', type: 'forex', value: Number((1 / data.rates.GBP).toFixed(4)) },
      { key: 'USDJPY', label: 'USD/JPY', pair: 'USDJPY', type: 'forex', value: Number(data.rates.JPY.toFixed(2)) },
      { key: 'USDCHF', label: 'USD/CHF', pair: 'USDCHF', type: 'forex', value: Number(data.rates.CHF.toFixed(4)) },
      { key: 'AUDUSD', label: 'AUD/USD', pair: 'AUDUSD', type: 'forex', value: Number((1 / data.rates.AUD).toFixed(4)) },
      { key: 'USDCAD', label: 'USD/CAD', pair: 'USDCAD', type: 'forex', value: Number(data.rates.CAD.toFixed(4)) },
      { key: 'USDSEK', label: 'USD/SEK', pair: 'USDSEK', type: 'forex', value: Number(data.rates.SEK.toFixed(2)) },
      { key: 'NZDUSD', label: 'NZD/USD', pair: 'NZDUSD', type: 'forex', value: Number((1 / data.rates.NOK).toFixed(4)) },
    ];

    return computed;
  } catch (error) {
    return null;
  }
}

async function loadCryptoData() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,ripple,dogecoin,cardano&order=market_cap_desc&per_page=25&page=1&sparkline=false'
    );
    const data = await response.json();
    if (!Array.isArray(data)) return null;

    return data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change: Number(coin.price_change_percentage_24h || 0),
      marketCap: coin.market_cap,
    }));
  } catch (error) {
    return null;
  }
}

function useMarketData() {
  const [fxData, setFxData] = React.useState(() => generateFxRows());
  const [cryptoData, setCryptoData] = React.useState(() => generateCryptoRows());
  const [indexData, setIndexData] = React.useState(() => generateIndexRows());
  const [mood, setMood] = React.useState(() => generateMood());
  const [lastSync, setLastSync] = React.useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  React.useEffect(() => {
    let isMounted = true;

    async function refresh() {
      const [fxLive, cryptoLive] = await Promise.all([loadFxRates(), loadCryptoData()]);
      if (!isMounted) return;

      const nextFx = fxLive ? fxLive.map((item, idx) => ({
        ...item,
        change: Number((Math.random() * 1.4 - 0.5 + (Math.random() > 0.5 ? 0.5 : -0.1)).toFixed(2)),
        sparkline: buildSparkline(item.value, 0.03 + idx * 0.001),
      })) : generateFxRows();

      const nextCrypto = cryptoLive ? cryptoLive.map((coin, idx) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        price: coin.price,
        change: clamp(Number(coin.change.toFixed(2))),
        sparkline: buildSparkline(coin.price, coin.price * 0.02 + idx * 0.001),
      })) : generateCryptoRows();

      const nextIndex = generateIndexRows();
      setFxData(nextFx);
      setCryptoData(nextCrypto);
      setIndexData(nextIndex);
      setMood(generateMood());
      setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }

    refresh();
    const interval = window.setInterval(refresh, 18000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return { fxData, cryptoData, indexData, mood, lastSync };
}

function StatCard({ title, value, tone, suffix = '' }) {
  return (
    <div className="stat-card">
      <div className="label">{title}</div>
      <div className={`value ${tone}`}>{value}{suffix}</div>
    </div>
  );
}

function Sparkline({ values, positive }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 0.001);

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${positive ? 'up' : 'down'}`} x1="0" x2="1">
          <stop offset="0%" stopColor={positive ? '#22c55e' : '#f97316'} stopOpacity="0.18" />
          <stop offset="100%" stopColor={positive ? '#22c55e' : '#f97316'} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={positive ? '#22c55e' : '#f97316'}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={`url(#gradient-${positive ? 'up' : 'down'})`}
        opacity="0.8"
      />
    </svg>
  );
}

function Watchlist({ title, items, kind }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>{title}</h3>
        <span className="panel-tag">{kind}</span>
      </div>
      <div className="table-list">
        {items.map((item) => (
          <div className="market-row" key={item.key || item.symbol || item.id || item.ticker}>
            <div className="row-meta">
              <div className="symbol-badge">{item.symbol || item.key || item.ticker}</div>
              <div>
                <div className="row-title">{item.name || item.label || item.company}</div>
                <div className="row-subtitle">{item.pair || item.ticker || item.type || 'Market'}</div>
              </div>
            </div>
            <div className="row-values">
              <div className="price">{kind === 'micro' ? '$' + formatPrice(item.last, 2) : formatPrice(item.price || item.value, 4)}</div>
              <div className={`delta ${Number(item.change || item.price) >= 0 ? 'up' : 'down'}`}>
                {formatPercent(Number(item.change || 0))}
              </div>
            </div>
            <div className="mini-chart">
              <Sparkline values={item.sparkline || [0, 10, 6, 12, 9, 18]} positive={Number(item.change || item.price) >= 0} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MacroCalendar() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Macro & Micro Calendar</h3>
        <span className="panel-tag">High impact</span>
      </div>
      <div className="calendar-list">
        {macroEvents.map((event, index) => (
          <div className="calendar-item" key={`${event.event}-${index}`}>
            <div className="event-time">{event.time}</div>
            <div className="event-body">
              <div className="event-country">{event.country}</div>
              <div className="event-title">{event.event}</div>
              <div className="event-detail">{event.detail}</div>
            </div>
            <span className={`impact ${event.impact.toLowerCase()}`}>{event.impact}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  const { fxData, cryptoData, indexData, mood, lastSync } = useMarketData();

  const broadMarket = indexData.slice(0, 4);
  const commoditiesData = commodities;
  const microDataList = microData;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="logo">V</div>
          <div>
            <div className="brand">Vertex Terminal</div>
            <div className="subtitle">Global market observatory</div>
          </div>
        </div>

        <nav className="nav-links">
          <span>Overview</span>
          <span>FX</span>
          <span>Crypto</span>
          <span>Indices</span>
          <span>Macro</span>
        </nav>

        <div className="sync-pill">
          <span className="dot" />
          Live · {lastSync}
        </div>
      </header>

      <main className="dashboard-grid">
        <aside className="left-column">
          <section className="panel hero-panel">
            <div className="hero-top">
              <div>
                <div className="eyebrow">Market pulse</div>
                <h1>{mood.mood}</h1>
              </div>
              <div className="pulse-score">{mood.score}/100</div>
            </div>
            <div className="hero-stats">
              <StatCard title="DXY" value="104.82" tone="up" suffix="" />
              <StatCard title="BTC" value="67,420" tone="up" suffix="" />
              <StatCard title="VIX" value="14.66" tone="down" suffix="" />
            </div>
          </section>

          <Watchlist title="FX Watchlist" items={fxData.slice(0, 6)} kind="forex" />
          <Watchlist title="Crypto Movers" items={cryptoData.slice(0, 6)} kind="crypto" />
        </aside>

        <section className="center-column">
          <div className="panel market-stack">
            <div className="panel-header">
              <h3>Global indices</h3>
              <span className="panel-tag">Realtime</span>
            </div>
            <div className="index-grid">
              {broadMarket.map((item) => (
                <div className="index-card" key={item.key}>
                  <div className="index-head">
                    <span>{item.label}</span>
                    <span className={`delta ${item.change >= 0 ? 'up' : 'down'}`}>{formatPercent(item.change)}</span>
                  </div>
                  <div className="big-number">{formatPrice(item.value, 2)}</div>
                  <div className="mini-chart">
                    <Sparkline values={item.sparkline} positive={item.change >= 0} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel full-width-panel">
            <div className="panel-header">
              <h3>Cross-market dashboard</h3>
              <span className="panel-tag">Rotation</span>
            </div>
            <div className="cross-grid">
              <div className="cross-card">
                <div className="card-title">Treasuries</div>
                <div className="card-value">4.21%</div>
                <div className="card-foot">10Y yield</div>
              </div>
              <div className="cross-card">
                <div className="card-title">Dollar</div>
                <div className="card-value">104.9</div>
                <div className="card-foot">DXY index</div>
              </div>
              <div className="cross-card">
                <div className="card-title">Crude</div>
                <div className="card-value">$74.61</div>
                <div className="card-foot">WTI</div>
              </div>
              <div className="cross-card">
                <div className="card-title">Gold</div>
                <div className="card-value">$2,355</div>
                <div className="card-foot">Spot</div>
              </div>
            </div>
          </div>

          <div className="panel lower-panel">
            <div className="panel-header">
              <h3>Commodities & micro movers</h3>
              <span className="panel-tag">Signal board</span>
            </div>
            <div className="signal-grid">
              <div className="mini-list">
                {commoditiesData.map((item) => (
                  <div className="mini-row" key={item.symbol}>
                    <span>{item.name}</span>
                    <strong>{formatPrice(item.price, 2)}</strong>
                    <em className={item.change >= 0 ? 'up' : 'down'}>{formatPercent(item.change)}</em>
                  </div>
                ))}
              </div>
              <div className="mini-list">
                {microDataList.map((item) => (
                  <div className="mini-row" key={item.ticker}>
                    <span>{item.ticker}</span>
                    <strong>{'$' + formatPrice(item.last, 2)}</strong>
                    <em className={item.change >= 0 ? 'up' : 'down'}>{formatPercent(item.change)}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="right-column">
          <MacroCalendar />
          <section className="panel">
            <div className="panel-header">
              <h3>Market breadth</h3>
              <span className="panel-tag">Risk regime</span>
            </div>
            <div className="breadth-list">
              <div className="breadth-item">
                <span>NYSE advances</span>
                <strong>63%</strong>
              </div>
              <div className="breadth-item">
                <span>Crypto momentum</span>
                <strong>71%</strong>
              </div>
              <div className="breadth-item">
                <span>FX volatility</span>
                <strong>Low</strong>
              </div>
              <div className="breadth-item">
                <span>Risk appetite</span>
                <strong>Positive</strong>
              </div>
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
