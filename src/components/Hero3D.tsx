'use client';

import { Canvas } from '@react-three/fiber';
import { Float, Icosahedron, TorusKnot } from '@react-three/drei';

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />

      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <Icosahedron args={[1.3, 0]} position={[-1.4, 0.4, 0]}>
          <meshStandardMaterial color="#E5A13B" flatShading />
        </Icosahedron>
      </Float>

      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1}>
        <TorusKnot args={[0.7, 0.22, 128, 16]} position={[1.6, -0.5, -1]}>
          <meshStandardMaterial color="#223A5E" flatShading />
        </TorusKnot>
      </Float>
    </Canvas>
  );
}
