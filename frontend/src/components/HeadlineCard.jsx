import { useState } from 'react'

const CATEGORY_STYLES = {
  POLITICS: { badge: 'badge-POLITICS', icon: '🏛️', label: 'Politics' },
  TECH:     { badge: 'badge-TECH',     icon: '💻', label: 'Technology' },
  SCIENCE:  { badge: 'badge-SCIENCE',  icon: '🔬', label: 'Science' },
  WORLD:    { badge: 'badge-WORLD',    icon: '🌍', label: 'World' },
  ECONOMY:  { badge: 'badge-ECONOMY',  icon: '📈', label: 'Economy' },
  CULTURE:  { badge: 'badge-CULTURE',  icon: '🎭', label: 'Culture' },
}

const DEFAULT_STYLE = { badge: 'badge-WORLD', icon: '📰', label: 'News' }

const formatTime = () => {
  const now = new Date()
  const mins = Math.floor(Math.random() * 59) + 1
  return `${mins}m ago`
}

const HeadlineCard = ({ headline, blurb, category, outlet, index = 0, featured = false }) => {
  const [expanded, setExpanded]   = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied]       = useState(false)

  const style = CATEGORY_STYLES[category?.toUpperCase()] || DEFAULT_STYLE
  const timeAgo = useState(() => formatTime())[0]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${headline}\n\n${blurb}\n\n— ${outlet}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article
      className={`
        headline-card animate-fadeInUp
        ${featured ? 'headline-card-featured' : ''}
      `}
      style={{ animationDelay: `${index * 0.07}s`, opacity: 0 }}
    >
      {/* ── Top row: badge + actions ─────────────────────────────────── */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`category-badge ${style.badge}`}>
            {style.icon} {style.label}
          </span>
          {featured && (
            <span className="category-badge border-ink text-ink text-xs">
              ★ Lead Story
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Bookmark */}
          <button
            onClick={() => setBookmarked(b => !b)}
            title={bookmarked ? 'Bookmarked' : 'Bookmark'}
            className="text-sm transition-transform hover:scale-125"
            aria-label="Bookmark article"
          >
            {bookmarked ? '🔖' : '📄'}
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className="text-xs byline border border-gray-300 px-1.5 py-0.5 hover:bg-ink hover:text-newsprint transition-colors"
            aria-label="Copy headline"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* ── Headline ─────────────────────────────────────────────────── */}
      <h2
        className={`
          playfair font-black leading-tight mb-3 cursor-pointer
          hover:text-accent transition-colors duration-200
          ${featured ? 'headline-xl' : 'headline-lg'}
        `}
        onClick={() => setExpanded(e => !e)}
        title="Click to expand"
      >
        {headline}
      </h2>

      <hr className="section-rule-thin mb-3" />

      {/* ── Blurb ─────────────────────────────────────────────────────── */}
      <p
        className={`blurb transition-all duration-300 ${
          expanded ? '' : 'line-clamp-3'
        }`}
      >
        {blurb}
      </p>

      {/* Read more toggle */}
      {blurb?.length > 180 && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="byline text-accent text-xs mt-1 hover:underline"
        >
          {expanded ? '▲ Show less' : '▼ Read more'}
        </button>
      )}

      {/* ── Footer: outlet + timestamp ────────────────────────────────── */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {/* Outlet avatar — first letter */}
          <div className="w-5 h-5 bg-ink text-newsprint flex items-center justify-center text-xs font-black shrink-0">
            {outlet?.charAt(0) || '?'}
          </div>
          <span className="byline text-ink-muted text-xs truncate max-w-[140px]" title={outlet}>
            {outlet}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="byline text-ink-muted text-xs">{timeAgo}</span>
          <span className="text-gray-300">·</span>
          <span className="byline text-xs text-accent">Alternate Timeline</span>
        </div>
      </div>
    </article>
  )
}

export default HeadlineCard
