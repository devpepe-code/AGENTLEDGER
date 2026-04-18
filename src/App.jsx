import { useState } from 'react'
import './App.css'

const AGENTS = [
  { id: 1, name: 'ResearchBot', status: 'active', tasks: 12, success: 11, lastRun: '2 min ago', model: 'claude-opus-4-7' },
  { id: 2, name: 'DataPipeline', status: 'active', tasks: 45, success: 43, lastRun: '5 min ago', model: 'claude-sonnet-4-6' },
  { id: 3, name: 'CodeReviewer', status: 'idle', tasks: 8, success: 8, lastRun: '1 hr ago', model: 'claude-sonnet-4-6' },
  { id: 4, name: 'SupportAgent', status: 'error', tasks: 33, success: 29, lastRun: '30 min ago', model: 'claude-haiku-4-5' },
  { id: 5, name: 'ContentWriter', status: 'active', tasks: 21, success: 20, lastRun: '8 min ago', model: 'claude-opus-4-7' },
  { id: 6, name: 'Scheduler', status: 'idle', tasks: 100, success: 99, lastRun: '2 hr ago', model: 'claude-haiku-4-5' },
]

const LOGS = [
  { id: 1, agent: 'ResearchBot', event: 'Task completed: "Summarize Q1 reports"', time: '14:32:01', type: 'success' },
  { id: 2, agent: 'DataPipeline', event: 'Batch processed: 500 records ingested', time: '14:31:48', type: 'success' },
  { id: 3, agent: 'SupportAgent', event: 'Tool call failed: API timeout', time: '14:30:12', type: 'error' },
  { id: 4, agent: 'ContentWriter', event: 'Task started: "Blog post draft"', time: '14:29:55', type: 'info' },
  { id: 5, agent: 'DataPipeline', event: 'Checkpoint saved at record 250', time: '14:29:20', type: 'info' },
  { id: 6, agent: 'ResearchBot', event: 'Tool use: web_search("AI trends 2026")', time: '14:28:44', type: 'info' },
]

function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}><span className="status-dot" />{status}</span>
}

function MetricCard({ label, value, sub, color }) {
  return (
    <div className="metric-card" style={{ borderTopColor: color }}>
      <div className="metric-value" style={{ color }}>{value}</div>
      <div className="metric-label">{label}</div>
      {sub && <div className="metric-sub">{sub}</div>}
    </div>
  )
}

export default function App() {
  const [selected, setSelected] = useState(null)
  const active = AGENTS.filter(a => a.status === 'active').length
  const totalTasks = AGENTS.reduce((s, a) => s + a.tasks, 0)
  const totalSuccess = AGENTS.reduce((s, a) => s + a.success, 0)
  const successRate = Math.round((totalSuccess / totalTasks) * 100)

  return (
    <div className="app">
      <header className="header">
        <div className="header-brand">
          <div className="logo-mark">AL</div>
          <div>
            <div className="logo-text">AgentLedger</div>
            <div className="logo-sub">Agent Operations Dashboard</div>
          </div>
        </div>
        <div className="header-right">
          <span className="live-badge"><span className="pulse-dot" />Live</span>
          <span className="date-badge">Apr 17, 2026</span>
        </div>
      </header>

      <main className="main">
        <div className="metrics-row">
          <MetricCard label="Total Agents" value={AGENTS.length} sub="registered" color="#6366f1" />
          <MetricCard label="Active Now" value={active} sub={`${AGENTS.length - active} offline`} color="#22c55e" />
          <MetricCard label="Tasks Run" value={totalTasks} sub="all time" color="#f59e0b" />
          <MetricCard label="Success Rate" value={`${successRate}%`} sub={`${totalSuccess}/${totalTasks}`} color="#0ea5e9" />
        </div>

        <div className="content-grid">
          <section className="panel">
            <div className="panel-header">
              <h2>Agents</h2>
              <button className="btn-new">+ New Agent</button>
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th><th>Status</th><th>Model</th><th>Tasks</th><th>Success</th><th>Last Run</th>
                  </tr>
                </thead>
                <tbody>
                  {AGENTS.map(agent => (
                    <tr
                      key={agent.id}
                      className={selected === agent.id ? 'row-selected' : ''}
                      onClick={() => setSelected(selected === agent.id ? null : agent.id)}
                    >
                      <td className="td-name">{agent.name}</td>
                      <td><StatusBadge status={agent.status} /></td>
                      <td><code className="model-pill">{agent.model}</code></td>
                      <td>{agent.tasks}</td>
                      <td>
                        <div className="progress-wrap">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(agent.success / agent.tasks) * 100}%` }} />
                          </div>
                          <span className="progress-pct">{Math.round((agent.success / agent.tasks) * 100)}%</span>
                        </div>
                      </td>
                      <td className="td-muted">{agent.lastRun}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel logs-panel">
            <div className="panel-header">
              <h2>Activity Log</h2>
              <span className="log-count">{LOGS.length} events</span>
            </div>
            <div className="logs-list">
              {LOGS.map(log => (
                <div key={log.id} className={`log-entry log-${log.type}`}>
                  <div className="log-meta">
                    <span className="log-agent">{log.agent}</span>
                    <span className="log-time">{log.time}</span>
                  </div>
                  <div className="log-msg">{log.event}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}