'use client';

import dynamic from 'next/dynamic';

const MapHero = dynamic(() => import('./MapHero'), { ssr: false });

export default function MapHeroClient() {
  return <MapHero />;
}
