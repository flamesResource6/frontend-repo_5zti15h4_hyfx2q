import Hero from './components/Hero'
import Generator from './components/Generator'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Hero />
      <Generator />
      <footer className="mt-10 py-10 text-center text-slate-400">
        Built with a playful 3D vibe. Remember to review and tweak drafts before posting.
      </footer>
    </div>
  )
}

export default App