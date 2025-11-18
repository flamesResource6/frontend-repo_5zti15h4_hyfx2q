import { useState } from 'react'

const TONES = [
  { id: 'professional', label: 'Professional' },
  { id: 'witty', label: 'Witty' },
  { id: 'urgent', label: 'Urgent' },
]

function PlatformCard({ title, size, content, loading }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-white font-semibold">{title}</h3>
        <span className="text-xs text-slate-300">{size}</span>
      </div>
      <div className="p-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-wide text-slate-300">Draft</label>
          <textarea
            className="mt-2 w-full h-40 md:h-56 bg-slate-900/60 text-slate-100 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
            value={content?.text || ''}
            readOnly
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wide text-slate-300">Visual</label>
          <div className="mt-2 aspect-[4/3] md:aspect-auto">
            {loading ? (
              <div className="w-full h-40 md:h-56 animate-pulse bg-slate-800 rounded-lg" />
            ) : (
              content?.image_url && (
                <img
                  src={content.image_url}
                  alt={`${title} preview`}
                  className="w-full h-40 md:h-56 object-cover rounded-lg border border-white/10"
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Generator() {
  const [idea, setIdea] = useState('')
  const [tone, setTone] = useState('professional')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleGenerate = async () => {
    if (!idea.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, tone }),
      })
      if (!res.ok) throw new Error('Failed to generate')
      const data = await res.json()
      setResult(data)
    } catch (e) {
      console.error(e)
      alert('Something went wrong generating content.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative z-10 -mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your idea (e.g., Launching an AI newsletter for founders)"
              className="w-full bg-slate-800/70 border border-white/10 rounded-xl px-4 h-12 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
            />
            <div className="flex items-center gap-2">
              {TONES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`h-12 px-4 rounded-xl border transition ${tone === t.id ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-800/70 text-slate-200 border-white/10 hover:border-blue-400/40'}`}
                >
                  {t.label}
                </button>
              ))}
              <button
                onClick={handleGenerate}
                className="h-12 px-5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-cyan-500"
              >
                Generate
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid gap-6">
          <PlatformCard
            title="LinkedIn"
            size="1200×627 (1.91:1)"
            content={result?.linkedin}
            loading={loading}
          />
          <PlatformCard
            title="Twitter / X"
            size="1200×675 (16:9)"
            content={result?.twitter}
            loading={loading}
          />
          <PlatformCard
            title="Instagram"
            size="1080×1350 (4:5)"
            content={result?.instagram}
            loading={loading}
          />
        </div>
      </div>
    </section>
  )
}

export default Generator