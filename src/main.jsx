import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const fxUniverse = [
  { symbol: 'EURUSD', name: 'Euro / Dollar', price: 1.0944, change: 0.34 },
  { symbol: 'GBPUSD', name: 'Pound / Dollar', price: 1.2722, change: -0.18 },
  { symbol: 'USDJPY', name: 'Dollar / Yen', price: 151.82, change: 0.41 },
  { symbol: 'USDCHF', name: 'Dollar / Franc', price: 0.8858, change: 0.12 },
  { symbol: 'AUDUSD', name: 'Australian / Dollar', price: 0.6524, change: -0.27 },
  { symbol: 'USDCAD', name: 'Dollar / Canadian', price: 1.3682, change: 0.56 },
  { symbol: 'NZDUSD', name: 'New Zealand / Dollar', price: 0.5968, change: 0.13 },
  { symbol: 'USDSEK', name: 'Dollar / Krona', price: 10.31, change: -0.09 },
];

const cryptoUniverse = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67420, change: 1.82 },
  { symbol: 'ETH', name: 'Ethereum', price: 3468, change: 2.41 },
  { symbol: 'SOL', name: 'Solana', price: 146.2, change: 3.28 },
  { symbol: 'XRP', name: 'XRP', price: 0.618, change: 1.52 },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.171, change: 4.73 },
  { symbol: 'ADA', name: 'Cardano', price: 0.714, change: -0.72 },
];

const marketIndexes = [
  { symbol: 'SPX', name: 'S&P 500', value: 5674.3, change: 0.78 },
  { symbol: 'NDX', name: 'Nasdaq 100', value: 20312.9, change: 1.14 },
  { symbol: 'DJI', name: 'Dow Jones', value: 42219.8, change: 0.46 },
  { symbol: 'FTSE', name: 'FTSE 100', value: 8302.7, change: -0.25 },
  { symbol: 'DAX', name: 'DAX', value: 19067.4, change: 0.66 },
  { symbol: 'N225', name: 'Nikkei 225', value: 38452.1, change: 1.07 },
  { symbol: 'HSI', name: 'Hang Seng', value: 17986.2, change: -0.64 },
];

const macroEvents = [
  { time: '08:30 ET', country: 'US', title: 'Core PCE Price Index', impact: 'High', detail: 'Inflation trend reading' },
  { time: '09:45 ET', country: 'US', title: 'Chicago PMI', impact: 'Medium', detail: 'Manufacturing sentiment' },
  { time: '10:00 ET', country: 'EU', title: 'ECB Press Conference', impact: 'High', detail: 'Rate outlook and guidance' },
  { time: '12:30 ET', country: 'UK', title: 'BoE Rate Decision', impact: 'High', detail: 'Policy path review' },
  { time: '13:30 ET', country: 'US', title: 'Initial Jobless Claims', impact: 'Medium', detail: 'Labor conditions' },
  { time: '15:00 ET', country: 'US', title: 'Consumer Sentiment', impact: 'Medium', detail: 'Household risk appetite' },
];

const microData = [
  { symbol: 'AAPL', company: 'Apple', price: 219.31, change: 1.22 },
  { symbol: 'MSFT', company: 'Microsoft', price: 442.4, change: 0.86 },
  { symbol: 'NVDA', company: 'NVIDIA', price: 128.1, change: 2.71 },
  { symbol: 'AMZN', company: 'Amazon', price: 183.2, change: 1.18 },
  { symbol: 'META', company: 'Meta', price: 518.7, change: 1.57 },
];

const commodityData = [
  { symbol: 'XAUUSD', name: 'Gold', price: 2355.2, change: 0.95 },
  { symbol: 'XAGUSD', name: 'Silver', price: 29.42, change: -0.33 },
  { symbol: 'WTI', name: 'WTI Crude', price: 74.61, change: 1.11 },
  { symbol: 'BRENT', name: 'Brent Crude', price: 78.44, change: 0.62 },
];

const headlineFlows = [
  { label: 'Risk-on', value: '63%' },
  { label: 'FX Vol', value: 'Low' },
  { label: 'Treasury', value: '4.21%' },
  { label: 'VIX', value: '14.66' },
];

function formatPrice(value, digits = 4) {
  if (value >= 1000) return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (value >= 1) return value.toLocaleString('en-US', { maximumFractionDigits: digits });
  if (value >= 0.01) return value.toLocaleString('en-US', { maximumFractionDigits: 4 });
  return value.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

function formatChange(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function buildSparkline(base, amplitude, points = 18) {
  return Array.from({ length: points }, (_, index) => {
    const wave = Math.sin((index / points) * Math.PI * 2.6);
    const modifier = ((Math.sin(index * 3.7 + base) + 1) / 2) * amplitude;
    return base + wave * amplitude * 0.9 + modifier * 0.5;
  });
}

function generateChartSeries(base, volatility, count = 30) {
  const values = [];
  let current = base;
  for (let i = 0; i < count; i += 1) {
    const drift = (Math.sin(i * 0.9) * volatility) + (Math.cos(i * 0.45) * volatility * 0.6);
    current = current + drift;
    values.push(current);
  }
  return values.map((close, i) => {
    const prev = i > 0 ? values[i - 1] : close;
    const open = prev;
    const high = Math.max(open, close) + volatility * 0.9 + Math.random() * 0.4;
    const low = Math.min(open, close) - volatility * 0.8 - Math.random() * 0.35;
    return { open, close, high, low };
  });
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
          <div className="market-row" key={`${item.symbol}-${item.name || item.company}`}>
            <div className="row-meta">
              <div className="symbol-badge">{item.symbol}</div>
              <div>
                <div className="row-title">{item.name || item.company}</div>
                <div className="row-subtitle">{item.symbol}</div>
              </div>
            </div>
            <div className="row-values">
              <div className="price">{kind === 'crypto' ? `$${formatPrice(item.price, 2)}` : formatPrice(item.price || item.value, kind === 'index' ? 2 : 4)}</div>
              <div className={`delta ${item.change >= 0 ? 'up' : 'down'}`}>{formatChange(item.change)}</div>
            </div>
            <div className="mini-chart">
              <Sparkline values={buildSparkline(item.price || item.value, item.price ? item.price * 0.02 : 0.8, 18)} positive={item.change >= 0} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sparkline({ values, positive }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
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
      <polyline points={points} fill="none" stroke={positive ? '#7fdc7b' : '#ff7d6b'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PriceChart() {
  const series = React.useMemo(() => generateChartSeries(1.094, 0.003, 32), []);
  const width = 740;
  const height = 240;
  const padding = 18;
  const lowest = Math.min(...series.flatMap((bar) => [bar.low]));
  const highest = Math.max(...series.flatMap((bar) => [bar.high]));
  const range = highest - lowest || 0.001;

  const bars = series.map((bar, index) => {
    const x = padding + index * ((width - padding * 2) / series.length);
    const bodyWidth = 8;
    const openY = height - padding - ((bar.open - lowest) / range) * (height - padding * 2);
    const closeY = height - padding - ((bar.close - lowest) / range) * (height - padding * 2);
    const highY = height - padding - ((bar.high - lowest) / range) * (height - padding * 2);
    const lowY = height - padding - ((bar.low - lowest) / range) * (height - padding * 2);
    const isUp = bar.close >= bar.open;
    const barTop = Math.min(openY, closeY);
    const barHeight = Math.max(Math.abs(closeY - openY), 4);

    return {
      x,
      bodyWidth,
      barTop,
      barHeight,
      highY,
      lowY,
      isUp,
      index,
    };
  });

  return (
    <div className="chart-panel panel">
      <div className="panel-header chart-header">
        <div>
          <h3>EURUSD</h3>
          <div className="chart-pair">Spot FX · 1H · 24H</div>
        </div>
        <div className="chart-price-wrap">
          <span className="chart-price">1.0944</span>
          <span className="chart-change up">+0.34%</span>
        </div>
      </div>
      <svg className="price-chart" viewBox={`0 0 ${width} ${height}`}>
        {[0, 0.25, 0.5, 0.75, 1].map((step) => {
          const y = padding + (height - padding * 2) * step;
          return <line key={step} x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(148,163,184,0.18)" strokeDasharray="4 6" />;
        })}

        {bars.map((bar) => (
          <g key={bar.index}>
            <line x1={bar.x + bar.bodyWidth / 2} y1={bar.highY} x2={bar.x + bar.bodyWidth / 2} y2={bar.lowY} stroke={bar.isUp ? '#7fdc7b' : '#ff7d6b'} strokeWidth="1.2" />
            <rect
              x={bar.x - bar.bodyWidth / 2}
              y={bar.barTop}
              width={bar.bodyWidth}
              height={bar.barHeight}
              rx="1"
              fill={bar.isUp ? '#7fdc7b' : '#ff7d6b'}
              opacity="0.9"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function MacroCalendar() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Macro Calendar</h3>
        <span className="panel-tag">High impact</span>
      </div>
      <div className="calendar-list">
        {macroEvents.map((item, index) => (
          <div className="calendar-item" key={`${item.title}-${index}`}>
            <div className="event-time">{item.time}</div>
            <div className="event-body">
              <div className="event-country">{item.country}</div>
              <div className="event-title">{item.title}</div>
              <div className="event-detail">{item.detail}</div>
            </div>
            <span className={`impact ${item.impact.toLowerCase()}`}>{item.impact}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [lastSync, setLastSync] = React.useState('22:12:45');
  const fxFeed = fxUniverse;
  const cryptoFeed = cryptoUniverse;
  const indexFeed = marketIndexes;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

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
          <span>Flows</span>
        </nav>

        <div className="sync-pill">
          <span className="dot" />
          Live · {lastSync}
        </div>
      </header>

      <div className="ticker-strip">
        {marketIndexes.map((item) => (
          <div className="ticker-item" key={item.symbol}>
            <span>{item.symbol}</span>
            <strong>{formatPrice(item.value, 2)}</strong>
            <em className={item.change >= 0 ? 'up' : 'down'}>{formatChange(item.change)}</em>
          </div>
        ))}
      </div>

      <main className="dashboard-grid">
        <aside className="left-column">
          <section className="panel hero-panel">
            <div className="hero-top">
              <div>
                <div className="eyebrow">Signal</div>
                <h1>Risk-on</h1>
              </div>
              <div className="pulse-score">68/100</div>
            </div>
            <div className="hero-stats">
              <div className="stat-card">
                <div className="label">DXY</div>
                <div className="value up">104.82</div>
              </div>
              <div className="stat-card">
                <div className="label">BTC</div>
                <div className="value up">67,420</div>
              </div>
              <div className="stat-card">
                <div className="label">VIX</div>
                <div className="value down">14.66</div>
              </div>
            </div>
          </section>

          <Watchlist title="FX Board" items={fxFeed.slice(0, 6)} kind="fx" />
          <Watchlist title="Crypto Heat" items={cryptoFeed.slice(0, 6)} kind="crypto" />
        </aside>

        <section className="center-column">
          <PriceChart />

          <div className="panel market-grid-panel">
            <div className="panel-header">
              <h3>Global Indices</h3>
              <span className="panel-tag">Realtime</span>
            </div>
            <div className="index-grid">
              {indexFeed.map((item) => (
                <div className="index-card" key={item.symbol}>
                  <div className="index-head">
                    <span>{item.name}</span>
                    <span className={`delta ${item.change >= 0 ? 'up' : 'down'}`}>{formatChange(item.change)}</span>
                  </div>
                  <div className="big-number">{formatPrice(item.value, 2)}</div>
                  <div className="mini-chart">
                    <Sparkline values={buildSparkline(item.value, 20, 16)} positive={item.change >= 0} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel lower-panel">
            <div className="panel-header">
              <h3>Commodities & Micro Movers</h3>
              <span className="panel-tag">Signal board</span>
            </div>
            <div className="signal-grid">
              <div className="mini-list">
                {commodityData.map((item) => (
                  <div className="mini-row" key={item.symbol}>
                    <span>{item.name}</span>
                    <strong>{formatPrice(item.price, 2)}</strong>
                    <em className={item.change >= 0 ? 'up' : 'down'}>{formatChange(item.change)}</em>
                  </div>
                ))}
              </div>
              <div className="mini-list">
                {microData.map((item) => (
                  <div className="mini-row" key={item.symbol}>
                    <span>{item.symbol}</span>
                    <strong>{'$' + formatPrice(item.price, 2)}</strong>
                    <em className={item.change >= 0 ? 'up' : 'down'}>{formatChange(item.change)}</em>
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
              <h3>Market Flows</h3>
              <span className="panel-tag">Breadth</span>
            </div>
            <div className="breadth-list">
              {headlineFlows.map((item) => (
                <div className="breadth-item" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
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
