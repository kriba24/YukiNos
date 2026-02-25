import MapHeroClient from './components/MapHeroClient';

const LEADERBOARD = [
  { rank: 1, handle: 'ghost_rx7', time: '1:27.43', delta: '—', rec: true },
  { rank: 2, handle: 'neon_drift', time: '1:28.91', delta: '+1.48', rec: false },
  { rank: 3, handle: 'tofu_run', time: '1:29.07', delta: '+1.64', rec: false },
  { rank: 4, handle: 'mid_night_s', time: '1:30.22', delta: '+2.79', rec: false },
  { rank: 5, handle: 'akina_86', time: '1:31.44', delta: '+4.01', rec: false },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">
      {/* ─── Nav ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.07] backdrop-blur-sm bg-[#080808]/80">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-mono font-bold text-lg tracking-widest text-white">YUKINOS</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#leaderboard" className="hover:text-white transition-colors">Leaderboard</a>
            <a href="#tracks" className="hover:text-white transition-colors">Tracks</a>
          </div>
          <button className="text-sm border border-white/20 hover:border-[#00FF88]/60 hover:text-[#00FF88] text-white/70 rounded-full px-4 py-1.5 transition-colors">
            Create Track
          </button>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="h-[calc(100vh-56px)] grid md:grid-cols-[45fr_55fr]">
        {/* Left panel */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 space-y-8">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 w-fit bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-full px-3 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00FF88]" />
            </span>
            <span className="text-[#00FF88] text-xs font-mono tracking-widest uppercase">1,284 runs today</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight text-white">
              Turn any road into a{' '}
              <span className="text-[#00FF88]">racetrack.</span>
            </h1>
          </div>

          {/* Body */}
          <p className="text-base lg:text-lg text-white/50 max-w-md leading-relaxed">
            Draw a circuit on real streets, record your times with your phone, and see how you stack up on anonymous global leaderboards. No registration needed.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-[#00FF88] hover:bg-[#00FF88]/90 text-black font-semibold rounded-full px-6 py-3 text-sm transition-colors">
              Start for free
            </button>
            <button className="border border-white/15 hover:border-white/30 text-white/70 hover:text-white rounded-full px-6 py-3 text-sm transition-colors">
              Watch demo
            </button>
          </div>

          {/* Stat strip */}
          <div className="flex gap-8 pt-2 border-t border-white/[0.07]">
            <div>
              <p className="text-2xl font-bold font-mono text-white">4,200+</p>
              <p className="text-xs text-white/40 mt-0.5">Tracks</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-white">890K</p>
              <p className="text-xs text-white/40 mt-0.5">Runs</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-white">62</p>
              <p className="text-xs text-white/40 mt-0.5">Countries</p>
            </div>
          </div>
        </div>

        {/* Right panel — map */}
        <div className="hidden md:block relative">
          <MapHeroClient />
        </div>
      </section>

      {/* ─── How it works ────────────────────────────────────────────── */}
      <section id="how" className="py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#00FF88] text-xs font-mono uppercase tracking-widest mb-4">How it works</p>
          <h2 className="text-3xl font-bold mb-16 max-w-sm">Three steps to your first lap.</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Draw your track',
                body: 'Tap points on any real road using the map editor. YukiNos snaps your line to street geometry automatically.',
              },
              {
                num: '02',
                title: 'Record a run',
                body: 'Open the app on your phone, hit record, and drive. GPS timestamps every split. Lap time is saved the moment you cross the finish.',
              },
              {
                num: '03',
                title: 'Climb the board — anonymously',
                body: 'Your time is published under a random handle. No name, no profile pic. Just the gap to the record.',
              },
            ].map((card) => (
              <div
                key={card.num}
                className="bg-[#0c0c0c] border border-white/[0.07] rounded-2xl p-7 space-y-4 hover:border-white/[0.13] transition-colors"
              >
                <span className="text-[#00FF88]/40 font-mono text-sm">{card.num}</span>
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Leaderboard ─────────────────────────────────────────────── */}
      <section id="leaderboard" className="py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#00FF88] text-xs font-mono uppercase tracking-widest mb-4">Leaderboard</p>
          <h2 className="text-3xl font-bold mb-3">Shinjuku Circuit — Tokyo</h2>
          <p className="text-white/40 text-sm mb-10">3.2 km · Updated 2 min ago</p>

          <div className="bg-[#0c0c0c] border border-white/[0.07] rounded-2xl overflow-hidden max-w-2xl">
            {/* Header */}
            <div className="grid grid-cols-[2rem_1fr_auto_auto] gap-4 px-5 py-3 border-b border-white/[0.07]">
              <span className="text-white/25 text-xs font-mono">#</span>
              <span className="text-white/25 text-xs font-mono">DRIVER</span>
              <span className="text-white/25 text-xs font-mono">TIME</span>
              <span className="text-white/25 text-xs font-mono">GAP</span>
            </div>

            {LEADERBOARD.map((entry) => (
              <div
                key={entry.rank}
                className={`grid grid-cols-[2rem_1fr_auto_auto] gap-4 items-center px-5 py-3.5 border-b border-white/[0.04] last:border-b-0 ${
                  entry.rec ? 'bg-[#00FF88]/[0.04]' : ''
                }`}
              >
                <span className="text-white/30 text-xs font-mono">{entry.rank}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm font-mono">{entry.handle}</span>
                  {entry.rec && (
                    <span className="text-[9px] font-mono bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30 rounded px-1.5 py-0.5 tracking-widest uppercase">
                      REC
                    </span>
                  )}
                </div>
                <span className={`text-sm font-mono tabular-nums ${entry.rec ? 'text-[#00FF88]' : 'text-white/70'}`}>
                  {entry.time}
                </span>
                <span className="text-white/30 text-xs font-mono tabular-nums">{entry.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA strip ───────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Pick a road.{' '}
            <span className="text-[#00FF88]">Set a time.</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            No account required to drive. Create a free account to save your tracks and own the record permanently.
          </p>
          <button className="bg-[#00FF88] hover:bg-[#00FF88]/90 text-black font-semibold rounded-full px-8 py-3.5 text-sm transition-colors">
            Start for free
          </button>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.07] py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="font-mono font-bold text-sm tracking-widest text-white/60">YUKINOS</span>
          <span className="text-white/25 text-xs font-mono">© 2026</span>
        </div>
      </footer>
    </div>
  );
}
