import { useState } from 'react'

export default function ApiKeyInput({ value, onChange }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="api-key-box">
      <div className="api-key-row">
        <span className="api-key-label">Anthropic API Key</span>
        {value.trim() ? (
          <span className="api-key-status connected">Connected</span>
        ) : (
          <span className="api-key-status">Required to run analysis</span>
        )}
      </div>
      <div className="api-key-input-row">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="sk-ant-api03-..."
          autoComplete="off"
          spellCheck={false}
          className="api-key-input"
        />
        {value && (
          <button type="button" onClick={() => setVisible(v => !v)} className="api-key-btn">
            {visible ? 'Hide' : 'Show'}
          </button>
        )}
        {value && (
          <button type="button" onClick={() => onChange('')} className="api-key-btn">
            Clear
          </button>
        )}
      </div>
      <p className="api-key-note">
        Stored in your browser's memory only for this session — never persisted, logged, or sent anywhere except directly to api.anthropic.com.
        Don't have a key? Grab a free one at <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a>.
      </p>
    </div>
  )
}
