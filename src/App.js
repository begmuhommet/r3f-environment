import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, OrbitControls, PerformanceMonitor, RandomizedLight } from '@react-three/drei'
import Env from './Env'

export default function App() {
  const [perfSucks, degrade] = useState(false)

  return (
    <Canvas
      shadows
      dpr={[1, perfSucks ? 1.5 : 2]}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
      camera={{ position: [20, 10, 0], fov: 26 }}>
      {/** PerfMon will detect performance issues */}
      <PerformanceMonitor onDecline={() => degrade(true)} />
      <color attach="background" args={['#f0f0f0']} />
      <group>
        {/*<Scene />*/}
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <AccumulativeShadows frames={100} alphaTest={0.85} opacity={0.8} color="red" scale={20} position={[0, -0.005, 0]}>
          <RandomizedLight amount={8} radius={6} ambient={0.5} intensity={1} position={[-1.5, 2.5, -2.5]} bias={0.001} />
        </AccumulativeShadows>
      </group>
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      <Env perfSucks={perfSucks} />
    </Canvas>
  )
}
