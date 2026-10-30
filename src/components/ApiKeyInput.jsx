import { useState } from 'react'
import { PROVIDERS, switchProvider, endpointHost } from '../lib/llmClient'

// Bring-your-own-model settings: pick an API style, paste a key, optionally change endpoint/model.
export default function ApiKeyInput({ value, onChange, requiredText = 'Required to run analysis', note = '' }) {
  const [visible, setVisible] = useState(false)
  const set = (patch) => onChange({ ...value, ...patch })
  const fieldStyle = { width: '100%', boxSizing: 'border-box', marginTop: 4 }

  return (
    <div className="api-key-box">
      <div className="api-key-row">
        <span className="api-key-label">Your LLM API key</span>
        {value.apiKey.trim() ? (
          <span className="api-key-status connected">Connected</span>
        ) : (
          <span className="api-key-status">{requiredText}</span>
        )}
      </div>

      <div style={{ marginBottom: 8 }}>
        <select
          className="api-key-input"
          style={fieldStyle}
          value={value.provider}
          onChange={(e) => onChange(switchProvider(value, e.target.value))}
          aria-label="API style"
        >
          {Object.entries(PROVIDERS).map(([id, p]) => (
            <option key={id} value={id}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="api-key-input-row">
        <input
          type={visible ? 'text' : 'password'}
          value={value.apiKey}
          onChange={(e) => set({ apiKey: e.target.value })}
          placeholder={PROVIDERS[value.provider].keyPlaceholder}
          autoComplete="off"
          spellCheck={false}
          className="api-key-input"
          aria-label="API key"
        />
        {value.apiKey && (
          <button type="button" onClick={() => setVisible((v) => !v)} className="api-key-btn">
            {visible ? 'Hide' : 'Show'}
          </button>
        )}
        {value.apiKey && (
          <button type="button" onClick={() => set({ apiKey: '' })} className="api-key-btn">
            Clear
          </button>
        )}
      </div>

      <details style={{ marginTop: 8 }}>
        <summary className="api-key-note" style={{ cursor: 'pointer', margin: 0, textAlign: 'left' }}>Endpoint &amp; model (advanced)</summary>
        <label className="api-key-note" style={{ display: 'block', marginTop: 6, textAlign: 'left' }}>
          Base URL
          <input className="api-key-input" style={fieldStyle} value={value.baseUrl} spellCheck={false}
            onChange={(e) => set({ baseUrl: e.target.value })} />
        </label>
        <label className="api-key-note" style={{ display: 'block', marginTop: 6, textAlign: 'left' }}>
          Model
          <input className="api-key-input" style={fieldStyle} value={value.model} spellCheck={false}
            onChange={(e) => set({ model: e.target.value })} />
        </label>
      </details>

      <p className="api-key-note">
        Works with any model behind an OpenAI-compatible or Anthropic-style API — hosted or a local Llama server.
        Your key stays in this browser tab's memory only — never persisted or logged, and sent only to{' '}
        <strong>{endpointHost(value)}</strong>. {note}
      </p>
    </div>
  )
}
