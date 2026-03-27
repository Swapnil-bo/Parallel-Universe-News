import { useState } from 'react'

const PRESET_EVENTS = [
  { label: "🌐 No Internet", event: "The internet was never invented" },
  { label: "🧬 No Antibiotics", event: "Antibiotics were never discovered" },
  { label: "⚡ Tesla Won", event: "Nikola Tesla won the war of currents against Edison" },
  { label: "🌕 Soviet Moon", event: "The Soviet Union landed on the moon before America" },
  { label: "🦕 No Asteroid", event: "The asteroid that killed the dinosaurs never hit Earth" },
  { label: "🏛️ Rome Never Fell", event: "The Roman Empire never fell" },
  { label: "🧪 Einstein Failed", event: "Albert Einstein failed his physics degree" },
  { label: "🤖 No AI", event: "Artificial intelligence was never developed" },
  { label: "🌍 WW2 Never Happened", event: "World War 2 never happened" },
  { label: "🍎 No Apple Inc", event: "Steve Jobs never founded Apple" },
]

const MAX_CHARS = 300

const EventSelector = ({ onGenerate, isLoading }) => {
  const [inputValue, setInputValue]   = useState('')
  const [activePreset, setActivePreset] = useState(null)
  const [error, setError]             = useState('')

  const handlePresetClick = (preset) => {
    setInputValue(preset.event)
    setActivePreset(preset.label)
    setError('')
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setActivePreset(null)
    if (error) setError('')
  }

  const handleSubmit = () => {
    const trimmed = inputValue.trim()

    if (!trimmed) {
      setError('Please describe a historical event to change.')
      return
    }
    if (trimmed.length < 5) {
      setError('Event description is too short (min 5 characters).')
      return
    }
    if (trimmed.length > MAX_CHARS) {
      setError(`Event description is too long (max ${MAX_CHARS} characters).`)
      return
    }

    setError('')
    onGenerate(trimmed)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) handleSubmit()
  }

  const charsLeft = MAX_CHARS - inputValue.length
  const charsLeftColor =
    charsLeft < 20  ? 'text-red-600' :
    charsLeft < 60  ? 'text-yellow-600' :
    'text-ink-muted'

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* ── Section label ─────────────────────────────────────────────── */}
      <div className="ornament-divider">
        <span className="byline tracking-widest">Choose Your Divergence Point</span>
      </div>

      {/* ── Preset chips ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PRESET_EVENTS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetClick(preset)}
            disabled={isLoading}
            className={`preset-chip ${
              activePreset === preset.label
                ? 'bg-ink text-newsprint border-ink'
                : ''
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* ── Custom input ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-0">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="e.g. The printing press was never invented…"
            className="event-input"
            maxLength={MAX_CHARS}
            aria-label="Historical event to change"
          />
          {/* Character counter */}
          <span
            className={`absolute right-3 bottom-2.5 text-xs font-mono ${charsLeftColor}`}
          >
            {charsLeft}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !inputValue.trim()}
          className="generate-btn"
        >
          {isLoading ? (
            <span className="flex items-center gap-2 justify-center">
              <span
                className="inline-block w-3 h-3 border-2 border-newsprint border-t-transparent rounded-full"
                style={{ animation: 'spin 0.8s linear infinite' }}
              />
              Generating…
            </span>
          ) : (
            '⚡ Generate Headlines'
          )}
        </button>
      </div>

      {/* ── Error message ─────────────────────────────────────────────── */}
      {error && (
        <div className="error-box mt-3 animate-fadeIn">
          ⚠ {error}
        </div>
      )}

      {/* ── Hint text ─────────────────────────────────────────────────── */}
      {!error && (
        <p className="byline text-ink-muted text-xs mt-2 tracking-wide">
          Press Enter or click Generate — our multiverse correspondents will report back shortly.
        </p>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default EventSelector
