'use client'

import { useCallback, useRef, useState } from 'react'
import Viewer, { type ViewerHandle } from '@/components/Viewer'
import ControlPanel from '@/components/ControlPanel'

const DEFAULTS = {
  labelScale: 0.5,
  labelRotation: 0,
  labelX: 0,
  labelY: 0.05,
  bottleColor: '#f8fafc',
  capColor: '#0f172a',
}

export default function HomePage() {
  const viewerRef = useRef<ViewerHandle>(null)

  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [labelScale, setLabelScale] = useState(DEFAULTS.labelScale)
  const [labelRotation, setLabelRotation] = useState(DEFAULTS.labelRotation)
  const [labelX, setLabelX] = useState(DEFAULTS.labelX)
  const [labelY, setLabelY] = useState(DEFAULTS.labelY)
  const [bottleColor, setBottleColor] = useState(DEFAULTS.bottleColor)
  const [capColor, setCapColor] = useState(DEFAULTS.capColor)
  const [isExporting, setIsExporting] = useState(false)

  const handleDownload = useCallback(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    setIsExporting(true)

    requestAnimationFrame(() => {
      try {
        const dataUrl = viewer.capture(3)
        if (!dataUrl) throw new Error('Canvas capture returned null')

        const stamp = new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/[:T]/g, '-')

        const link = document.createElement('a')
        link.href = dataUrl
        link.download = `mockup-${stamp}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (err) {
        console.error('[export] failed', err)
        alert('রেন্ডার ফাইলটি এক্সপোর্ট করা সম্ভব হয়নি।')
      } finally {
        setIsExporting(false)
      }
    })
  }, [])

  const handleReset = useCallback(() => {
    setLabelScale(DEFAULTS.labelScale)
    setLabelRotation(DEFAULTS.labelRotation)
    setLabelX(DEFAULTS.labelX)
    setLabelY(DEFAULTS.labelY)
    setBottleColor(DEFAULTS.bottleColor)
    setCapColor(DEFAULTS.capColor)
  }, [])

  return (
    <main className="flex h-[100dvh] w-full flex-col-reverse overflow-hidden bg-neutral-950 lg:flex-row">
      <aside className="h-[48%] w-full shrink-0 overflow-y-auto border-t border-white/10 bg-neutral-900/70 backdrop-blur lg:h-full lg:w-[350px] lg:border-r lg:border-t-0">
        <ControlPanel
          imageUrl={imageUrl}
          onImageChange={setImageUrl}
          labelScale={labelScale}
          onLabelScaleChange={setLabelScale}
          labelRotation={labelRotation}
          onLabelRotationChange={setLabelRotation}
          labelX={labelX}
          onLabelXChange={setLabelX}
          labelY={labelY}
          onLabelYChange={setLabelY}
          bottleColor={bottleColor}
          onBottleColorChange={setBottleColor}
          capColor={capColor}
          onCapColorChange={setCapColor}
          onDownload={handleDownload}
          onReset={handleReset}
          isExporting={isExporting}
        />
      </aside>

      <section className="relative min-h-0 flex-1">
        <Viewer
          ref={viewerRef}
          imageUrl={imageUrl}
          labelScale={labelScale}
          labelRotation={labelRotation}
          labelX={labelX}
          labelY={labelY}
          bottleColor={bottleColor}
          capColor={capColor}
        />

        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-black/5 bg-white/70 px-3 py-1.5 text-[11px] font-medium tracking-wide text-neutral-600 shadow-sm backdrop-blur">
          Drag to orbit · Scroll to zoom
        </div>

        {!imageUrl && (
          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900/80 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur">
            Upload a PNG logo to see it wrapped on the bottle
          </div>
        )}
      </section>
    </main>
  )
}
