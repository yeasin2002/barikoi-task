'use client'

import MapShell from '@/components/map/map-shell'

export default function HomePage() {
  return <MapShell mapKey={process.env.NEXT_PUBLIC_BARIKOI_MAP_KEY ?? ''} />
}
