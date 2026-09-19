'use client'

import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Decal, useTexture, ContactShadows, Center } from '@react-three/drei'
import * as THREE from 'three'

export interface ViewerHandle {
  capture: (multiplier?: number) => string | null
}

interface ViewerProps {
  imageUrl: string | null
  labelScale: number
  labelRotation: number
  labelX: number
  labelY: number
  bottleColor: string
  capColor: string
}

function BottleModel({
  imageUrl,
  labelScale,
  labelRotation,
  labelX,
  labelY,
  bottleColor,
  capColor,
}: ViewerProps) {
  const texture = useTexture(imageUrl || '/placeholder.png')

  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 2.2, 64]} />
        <meshStandardMaterial color={bottleColor} roughness={0.2} metalness={0.1} />
        
        {imageUrl && (
          <Decal
            position={[labelX, labelY, 0.81]}
            rotation={[0, 0, THREE.MathUtils.degToRad(labelRotation)]}
            scale={[labelScale * 1.5, labelScale * 1.5, 1]}
          >
            <meshBasicMaterial map={texture} transparent polygonOffset polygonOffsetFactor={-1} />
          </Decal>
        )}
      </mesh>

      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.3, 32]} />
        <meshStandardMaterial color={capColor} roughness={0.5} />
      </mesh>
    </group>
  )
}

const Viewer = forwardRef<ViewerHandle, ViewerProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useImperativeHandle(ref, () => ({
    capture: () => {
      if (!canvasRef.current) return null
      return canvasRef.current.toDataURL('image/png')
    },
  }))

  return (
    <Canvas
      ref={canvasRef}
      gl={{ preserveDrawingBuffer: true }}
      shadows
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      className="h-full w-full bg-neutral-950"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      
      <Center>
        <BottleModel {...props} />
      </Center>

      <ContactShadows position={[0, -1.3, 0]} opacity={0.6} scale={10} blur={1.5} far={4} />
      <OrbitControls makeDefault minDistance={2.5} maxDistance={7} />
    </Canvas>
  )
})

Viewer.displayName = 'Viewer'
export default Viewer
