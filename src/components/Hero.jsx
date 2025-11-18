import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[420px] sm:h-[520px] md:h-[620px]">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Gradient overlay for text readability (doesn't block Spline interaction) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/40 to-slate-900" />
      </div>
      <div className="absolute inset-0 flex items-end">
        <div className="w-full max-w-6xl mx-auto px-6 pb-10">
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Cross‑Platform Social Content Generator
            </h1>
            <p className="mt-3 sm:mt-4 text-slate-200/90 max-w-3xl">
              Turn any idea into ready‑to‑post drafts for LinkedIn, Twitter/X, and Instagram.
              Pick a tone, get tailored copy, plus auto‑sized visuals for each platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;