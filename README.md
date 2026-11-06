:root {
  color-scheme: dark;
  --bg: #08111e;
  --bg-2: #0d1728;
  --bg-3: #121f30;
  --panel: rgba(17, 25, 39, 0.85);
  --panel-light: rgba(18, 31, 48, 0.72);
  --border: rgba(148, 163, 184, 0.16);
  --text: #e5edf7;
  --muted: #90a5c3;
  --up: #22c55e;
  --down: #f97316;
  --neutral: #a5b4cf;
  --accent: #38bdf8;
  --shadow: 0 18px 40px rgba(8, 15, 29, 0.45);
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.16), transparent 20%),
    radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 24%),
    var(--bg);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button, input, select {
  font: inherit;
}

.app-shell {
  max-width: 1560px;
  margin: 0 auto;
  padding: 20px 18px 32px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 18px;
  margin-bottom: 18px;
  background: rgba(15, 24, 38, 0.72);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #0ea5e9, #1d4ed8);
  font-weight: 800;
  font-size: 1.3rem;
}

.brand {
  font-size: 1.05rem;
  font-weight: 700;
}

.subtitle {
  color: var(--muted);
  font-size: 0.72rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--muted);
  font-size: 0.8rem;
}

.nav-links span {
  opacity: 0.8;
}

.sync-pill {
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.28);
  padding: 9px 12px;
  border-radius: 999px;
  color: #d6f9e2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--up);
  box-shadow: 0 0 14px rgba(34, 197, 94, 0.6);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.15fr 1.9fr 1.05fr;
  gap: 18px;
}

.left-column, .center-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.panel {
  background: rgba(16, 25, 39, 0.82);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.hero-panel {
  padding: 18px;
}

.hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.eyebrow {
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.68rem;
  margin-bottom: 10px;
}

.hero-top h1 {
  margin: 0;
  font-size: clamp(2rem, 2vw, 2.5rem);
}

.pulse-score {
  padding: 11px 14px;
  border-radius: 12px;
  background: rgba(56, 189, 248, 0.07);
  color: var(--accent);
  border: 1px solid rgba(56, 189, 248, 0.22);
  font-weight: 600;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.stat-card {
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(15, 23, 32, 0.8);
  border: 1px solid var(--border);
}

.label {
  color: var(--muted);
  font-size: 0.7rem;
  margin-bottom: 4px;
}

.value {
  font-weight: 700;
  font-size: 1.1rem;
}

.value.up,
.delta.up,
.impact.high,
.impact.medium,
.impact.low {
  color: var(--up);
}

.value.down,
.delta.down {
  color: var(--down);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 15px 16px 12px;
  border-bottom: 1px solid var(--border);
}

.panel-header h3 {
  margin: 0;
  font-size: 0.95rem;
}

.panel-tag {
  padding: 6px 8px;
  border-radius: 999px;
  font-size: 0.68rem;
  border: 1px solid var(--border);
  color: var(--muted);
  background: rgba(148, 163, 184, 0.05);
}

.table-list {
  padding: 10px 12px 12px;
}

.market-row {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) 90px;
  gap: 8px;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
}

.market-row:last-child {
  border-bottom: none;
}

.row-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.symbol-badge {
  min-width: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 9px;
  background: rgba(56, 189, 248, 0.08);
  color: #dfeefe;
  font-size: 0.68rem;
  font-weight: 700;
}

.row-title {
  font-weight: 600;
  line-height: 1.2;
}

.row-subtitle {
  color: var(--muted);
  font-size: 0.68rem;
}

.row-values {
  text-align: right;
}

.price {
  font-weight: 700;
  font-size: 0.95rem;
}

.delta {
  font-size: 0.72rem;
  font-weight: 600;
}

.mini-chart {
  width: 90px;
  height: 38px;
}

.mini-chart svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.market-stack,
.full-width-panel,
.lower-panel {
  padding-bottom: 8px;
}

.index-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 14px;
}

.index-card {
  padding: 14px 14px 10px;
  border-radius: 14px;
  background: rgba(15, 23, 32, 0.7);
  border: 1px solid var(--border);
}

.index-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 0.78rem;
  margin-bottom: 12px;
}

.big-number {
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  font-weight: 700;
  margin-bottom: 10px;
}

.cross-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  padding: 14px;
}

.cross-card {
  padding: 16px 14px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: rgba(12, 21, 31, 0.7);
}

.card-title {
  color: var(--muted);
  font-size: 0.74rem;
  margin-bottom: 8px;
}

.card-value {
  font-weight: 700;
  font-size: 1.3rem;
}

.card-foot {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.7rem;
}

.signal-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 14px;
}

.mini-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mini-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 10px;
  background: rgba(15, 23, 32, 0.52);
}

.mini-row span {
  font-weight: 600;
}

.mini-row strong {
  font-size: 0.88rem;
}

.mini-row em {
  font-style: normal;
  font-size: 0.72rem;
  font-weight: 700;
}

.up { color: var(--up); }
.down { color: var(--down); }

.calendar-list {
  padding: 12px 14px 14px;
}

.calendar-item {
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  padding: 10px 8px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
}

.calendar-item:last-child {
  border-bottom: none;
}

.event-time {
  font-size: 0.72rem;
  color: var(--muted);
}

.event-country {
  color: var(--muted);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.event-title {
  font-weight: 600;
  margin-top: 2px;
}

.event-detail {
  margin-top: 4px;
  color: var(--muted);
  font-size: 0.74rem;
}

.impact {
  padding: 6px 8px;
  border-radius: 999px;
  font-size: 0.62rem;
  border: 1px solid currentColor;
  background: rgba(34, 197, 94, 0.05);
}

.impact.high { background: rgba(34, 197, 94, 0.08); }
.impact.medium { background: rgba(59, 130, 246, 0.08); }
.impact.low { background: rgba(249, 115, 22, 0.08); }

.breadth-list {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.breadth-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 10px;
  background: rgba(15, 23, 32, 0.62);
}

.breadth-item span {
  color: var(--muted);
}

@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .app-shell {
    padding-left: 12px;
    padding-right: 12px;
  }

  .topbar {
    padding: 12px 14px;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-stats,
  .cross-grid,
  .signal-grid,
  .index-grid {
    grid-template-columns: 1fr;
  }

  .market-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .calendar-item {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }
}
