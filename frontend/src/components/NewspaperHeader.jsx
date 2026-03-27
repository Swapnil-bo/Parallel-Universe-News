import { useState, useEffect } from 'react'

const UNIVERSE_MOTTOS = [
  "All The News From Timelines That Never Were",
  "Delivering Truth Across The Multiverse Since ∞",
  "Your Trusted Source For Alternate Reality Journalism",
  "Because Every Timeline Deserves A Free Press",
  "Fair & Balanced Across All Known Universes",
]

const NewspaperHeader = ({ event, universeId }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [motto, setMotto] = useState(UNIVERSE_MOTTOS[0])

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Rotate motto when a new universe is loaded
  useEffect(() => {
    if (event) {
      const idx = Math.abs(
        event.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
      ) % UNIVERSE_MOTTOS.length
      setMotto(UNIVERSE_MOTTOS[idx])
    }
  }, [event])

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

  return (
    <header className="masthead px-4">

      {/* ── Top ticker bar ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-xs mb-3 px-2 max-w-6xl mx-auto">
        <span className="byline">{formatDate(currentTime)}</span>
        <span className="byline hidden sm:block">
          ✦ Est. In A Universe Not Too Different From Yours ✦
        </span>
        <span className="byline font-mono">{formatTime(currentTime)}</span>
      </div>

      <hr className="section-rule max-w-6xl mx-auto" />

      {/* ── Masthead title ───────────────────────────────────────────── */}
      <div className="my-3">
        <h1 className="masthead-font masthead-title">
          The Multiverse Courier
        </h1>
        <p className="byline text-ink-muted mt-1 tracking-widest text-xs">
          ✦ {motto} ✦
        </p>
      </div>

      <hr className="section-rule max-w-6xl mx-auto" />

      {/* ── Meta bar ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 px-2 max-w-6xl mx-auto">

        {/* Price / edition */}
        <div className="byline text-xs space-x-3">
          <span>Vol. MMXXVI</span>
          <span>·</span>
          <span>Multiverse Edition</span>
          <span>·</span>
          <span>Price: Free (In This Timeline)</span>
        </div>

        {/* Universe ID tag */}
        {universeId ? (
          <div className="flex items-center gap-2 animate-fadeIn">
            <span className="universe-tag">{universeId}</span>
            <span className="byline text-xs text-ink-muted hidden sm:block">
              Divergence confirmed
            </span>
          </div>
        ) : (
          <div className="universe-tag opacity-40">UNIVERSE-????</div>
        )}

        {/* Divergence event pill */}
        {event && (
          <div className="flex items-center gap-2 animate-fadeIn">
            <span className="byline text-xs text-ink-muted">Divergence:</span>
            <span
              className="byline text-xs px-2 py-0.5 bg-ink text-newsprint max-w-xs truncate"
              title={event}
            >
              {event.length > 50 ? event.slice(0, 50) + '…' : event}
            </span>
          </div>
        )}
      </div>

      {/* ── Breaking news banner (shown only when headlines exist) ───── */}
      {event && (
        <div className="mt-3 bg-ink text-newsprint py-1.5 px-4 animate-fadeIn">
          <div className="max-w-6xl mx-auto flex items-center gap-3 overflow-hidden">
            <span className="text-accent font-black text-xs tracking-widest uppercase shrink-0">
              ⚡ Breaking
            </span>
            <div className="overflow-hidden whitespace-nowrap">
              <span
                className="text-xs font-medium inline-block"
                style={{
                  animation: 'marquee 18s linear infinite'
                }}
              >
                ALTERNATE TIMELINE DETECTED — Divergence point: "{event}" — All reports sourced from verified multiverse correspondents — Read below for full coverage ——
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </header>
  )
}

export default NewspaperHeader
