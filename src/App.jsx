import { useState } from 'react'
import './App.css'
import ApiKeyInput from './components/ApiKeyInput'

const SAMPLE_INPUT = `Patient: J. Reyes, 34
Visit reason: lower back pain

"I've had this lower back pain for about three weeks now, started after I was moving some boxes at home. It's a sharp pain on the right side, mostly when I bend forward or twist. It's been getting worse honestly, not better. I've been taking ibuprofen which helps a bit but it comes right back. It's also started messing with my sleep, hard to find a comfortable position at night. I sit at a desk most of the day for work which probably isn't helping. No previous back problems that I remember, though I did have my appendix out a few years ago. Not on any regular medications besides the ibuprofen when it's bad."`

function App() {
  const [apiKey, setApiKey] = useState('')
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadSample = () => setInput(SAMPLE_INPUT)

  const analyze = async () => {
    if (!input.trim() || !apiKey.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: `You are a clinical intake assistant. Read the patient intake text below and return ONLY valid JSON (no markdown, no explanation) with this exact structure:

{
  "summary": "2-3 sentence plain summary of what was captured",
  "captured_clearly": ["list of clearly stated facts"],
  "missing_information": ["list of important missing info, e.g. current medications, allergies, family history"],
  "inconsistencies": ["list of any contradictions in the patient's own statements, or empty array if none"],
  "follow_up_question": "one specific, clinically useful follow-up question staff could ask"
}

Patient intake text:
"""
${input}
"""`
          }]
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error.message || 'API error')
      }

      const text = data.content[0].text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : text)
      setResult(parsed)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AI Patient Intake Assistant</h1>
        <p className="subtitle">Structures patient intake, flags gaps, drafts follow-up questions — before clinical review.</p>
      </header>

      <ApiKeyInput value={apiKey} onChange={setApiKey} />

      <div className="sample-data-notice">
        This is a public demo — please use the sample data or your own fictional text only. Do not paste real patient information.
      </div>

      <div className="panel">
        <div className="panel-header">
          <label>Patient intake (free text)</label>
          <button className="link-btn" onClick={loadSample}>Load sample</button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type patient intake text here..."
          rows={8}
        />
        <button className="primary-btn" onClick={analyze} disabled={loading || !input.trim() || !apiKey.trim()}>
          {loading ? 'Analyzing...' : 'Analyze Intake'}
        </button>
      </div>

      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="results">
          <div className="result-card summary-card">
            <h3>Summary</h3>
            <p>{result.summary}</p>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <h3>✓ Captured Clearly</h3>
              <ul>
                {result.captured_clearly.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className="result-card warning-card">
              <h3>⚠ Missing Information</h3>
              <ul>
                {result.missing_information.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            {result.inconsistencies && result.inconsistencies.length > 0 && (
              <div className="result-card warning-card">
                <h3>⚠ Inconsistencies</h3>
                <ul>
                  {result.inconsistencies.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>

          <div className="result-card followup-card">
            <h3>Suggested Follow-Up Question</h3>
            <p className="followup-text">"{result.follow_up_question}"</p>
            <p className="disclaimer">A staff member reviews and decides whether to send this. Nothing is sent automatically.</p>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Human review required before any action is taken. This tool does not diagnose or make clinical recommendations.</p>
      </footer>
    </div>
  )
}

export default App
