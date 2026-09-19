'use client'

import React from 'react'

interface ControlPanelProps {
  imageUrl: string | null
  onImageChange: (url: string | null) => void
  labelScale: number
  onLabelScaleChange: (v: number) => void
  labelRotation: number
  onLabelRotationChange: (v: number) => void
  labelX: number
  onLabelXChange: (v: number) => void
  labelY: number
  onLabelYChange: (v: number) => void
  bottleColor: string
  onBottleColorChange: (v: string) => void
  capColor: string
  onCapColorChange: (v: string) => void
  onDownload: () => void
  onReset: () => void
  isExporting: boolean
}

export default function ControlPanel({
  imageUrl,
  onImageChange,
  labelScale,
  onLabelScaleChange,
  labelRotation,
  onLabelRotationChange,
  labelX,
  onLabelXChange,
  labelY,
  onLabelYChange,
  bottleColor,
  onBottleColorChange,
  capColor,
  onCapColorChange,
  onDownload,
  onReset,
  isExporting,
}: ControlPanelProps) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageChange(URL.createObjectURL(file))
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 text-white">
      <div>
        <h1 className="text-xl font-bold text-emerald-400">Mockup Generator</h1>
        <p className="text-xs text-neutral-400">3D Product Label Studio</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-neutral-300">১. লোগো আপলোড</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="text-xs text-neutral-400 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-emerald-600"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold text-neutral-300">২. প্রোডাক্ট কালার</label>
        <div className="flex items-center justify-between text-xs">
          <span>বোতলের কালার:</span>
          <input
            type="color"
            value={bottleColor}
            onChange={(e) => onBottleColorChange(e.target.value)}
            className="h-6 w-10 cursor-pointer rounded border-0 bg-transparent"
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span>ক্যাপের কালার:</span>
          <input
            type="color"
            value={capColor}
            onChange={(e) => onCapColorChange(e.target.value)}
            className="h-6 w-10 cursor-pointer rounded border-0 bg-transparent"
          />
        </div>
      </div>

      {imageUrl && (
        <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
          <label className="text-xs font-semibold text-neutral-300">৩. পজিশন কাস্টমাইজ</label>
          
          <div className="flex flex-col gap-1 text-xs">
            <span>সাইজ (Scale): {labelScale.toFixed(2)}</span>
            <input
              type="range"
              min={0.1}
              max={1.2}
              step={0.01}
              value={labelScale}
              onChange={(e) => onLabelScaleChange(parseFloat(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <span>পজিশন Y: {labelY.toFixed(2)}</span>
            <input
              type="range"
              min={-0.5}
              max={0.5}
              step={0.01}
              value={labelY}
              onChange={(e) => onLabelYChange(parseFloat(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <span>রোটেশন: {labelRotation}°</span>
            <input
              type="range"
              min={-180}
              max={180}
              step={1}
              value={labelRotation}
              onChange={(e) => onLabelRotationChange(parseInt(e.target.value))}
            />
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
        <button
          onClick={onDownload}
          disabled={isExporting}
          className="w-full rounded-lg bg-emerald-500 py-2.5 text-xs font-bold text-neutral-950 transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {isExporting ? 'ডাউনলোড হচ্ছে…' : 'PNG রেন্ডার ডাউনলোড করুন'}
        </button>

        <button
          onClick={onReset}
          className="w-full rounded-lg border border-white/10 py-2 text-xs font-medium text-neutral-400 hover:bg-white/5"
        >
          রিসেট
        </button>
      </div>
    </div>
  )
}
