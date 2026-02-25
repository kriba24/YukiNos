'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const TRACK_COORDS: [number, number][] = [
  [139.6917, 35.6938],
  [139.6980, 35.6945],
  [139.7021, 35.6921],
  [139.7035, 35.6878],
  [139.7008, 35.6842],
  [139.6952, 35.6831],
  [139.6899, 35.6857],
  [139.6878, 35.6901],
  [139.6895, 35.6932],
  [139.6917, 35.6938],
];

const LAP_MS = 90_000;
const ANIM_FRAMES = 480;

function lerpCoord(
  a: [number, number],
  b: [number, number],
  t: number
): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function positionAlongTrack(progress: number): [number, number] {
  const segments = TRACK_COORDS.length - 1;
  const scaled = progress * segments;
  const idx = Math.min(Math.floor(scaled), segments - 1);
  const t = scaled - idx;
  return lerpCoord(TRACK_COORDS[idx], TRACK_COORDS[idx + 1], t);
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  const centis = Math.floor((ms % 1000) / 10);
  return `${min}:${String(sec).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
}

export default function MapHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [139.6957, 35.6888],
      zoom: 13.5,
      pitch: 30,
      bearing: -15,
      interactive: false,
      antialias: true,
    });

    map.on('load', () => {
      // Fly to reveal
      map.flyTo({
        center: [139.6957, 35.6888],
        zoom: 14.2,
        pitch: 50,
        bearing: -15,
        duration: 2800,
        essential: true,
      });

      // Track line source
      map.addSource('track', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: TRACK_COORDS },
          properties: {},
        },
      });

      // Glow layer
      map.addLayer({
        id: 'track-glow',
        type: 'line',
        source: 'track',
        paint: {
          'line-color': '#00FF88',
          'line-width': 18,
          'line-opacity': 0.18,
          'line-blur': 8,
        },
      });

      // Crisp line
      map.addLayer({
        id: 'track-line',
        type: 'line',
        source: 'track',
        paint: {
          'line-color': '#00FF88',
          'line-width': 3,
          'line-opacity': 0.9,
        },
      });

      // Racer source
      map.addSource('racer', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: TRACK_COORDS[0] },
          properties: {},
        },
      });

      // Pulse halo
      map.addLayer({
        id: 'racer-pulse',
        type: 'circle',
        source: 'racer',
        paint: {
          'circle-radius': 22,
          'circle-color': '#00FF88',
          'circle-opacity': 0.15,
          'circle-blur': 1,
        },
      });

      // Racer dot
      map.addLayer({
        id: 'racer-dot',
        type: 'circle',
        source: 'racer',
        paint: {
          'circle-radius': 7,
          'circle-color': '#00FF88',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });

      let frame = 0;
      let startTime = performance.now();

      function animate() {
        const elapsed = performance.now() - startTime;
        const lapProgress = (elapsed % LAP_MS) / LAP_MS;
        const animProgress = (frame % ANIM_FRAMES) / ANIM_FRAMES;

        const pos = positionAlongTrack(lapProgress);

        (map.getSource('racer') as mapboxgl.GeoJSONSource).setData({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: pos },
          properties: {},
        });

        // Direct DOM mutation for timer — no React re-render
        if (timerRef.current) {
          timerRef.current.textContent = formatTime(elapsed % LAP_MS);
        }

        frame++;
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    });

    return () => map.remove();
  }, [token]);

  if (!token) {
    return (
      <div className="relative h-full w-full flex items-center justify-center bg-[#0c0c0c]">
        <div className="text-center space-y-3 px-8">
          <div className="w-12 h-12 rounded-full border-2 border-[#00FF88]/30 flex items-center justify-center mx-auto">
            <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
          </div>
          <p className="text-white/40 text-sm font-mono">
            Set <code className="text-[#00FF88]/70">NEXT_PUBLIC_MAPBOX_TOKEN</code> to enable live map
          </p>
        </div>

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(#00FF88 1px, transparent 1px), linear-gradient(90deg, #00FF88 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Map container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Left-edge gradient fade to blend with page background */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none z-10" />

      {/* Top-right: record notification badge */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FF88]" />
        </span>
        <span className="text-white/80 text-xs font-mono tracking-wide">NEW RECORD SET</span>
      </div>

      {/* Bottom-right: track info + timer */}
      <div className="absolute bottom-5 right-5 z-20 space-y-2">
        <div className="bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl p-4 min-w-[200px]">
          <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-3">Live Session</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-mono mb-4">
            <div>
              <p className="text-white/30 text-[9px] uppercase tracking-wider">Distance</p>
              <p className="text-white/80">3.2 km</p>
            </div>
            <div>
              <p className="text-white/30 text-[9px] uppercase tracking-wider">Record</p>
              <p className="text-[#00FF88]">1:27.43</p>
            </div>
            <div>
              <p className="text-white/30 text-[9px] uppercase tracking-wider">Runs</p>
              <p className="text-white/80">1,284</p>
            </div>
            <div>
              <p className="text-white/30 text-[9px] uppercase tracking-wider">City</p>
              <p className="text-white/80">Tokyo</p>
            </div>
          </div>

          {/* Live timer */}
          <div className="border-t border-white/10 pt-3 flex items-baseline gap-2">
            <span className="text-white/30 text-[9px] font-mono uppercase tracking-wider">Current</span>
            <span ref={timerRef} className="text-white font-mono text-xl tracking-tight tabular-nums">
              0:00.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
