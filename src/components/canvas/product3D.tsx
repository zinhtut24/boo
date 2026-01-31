"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Float, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

function FloatingImage({ url }: { url: string }) {
  const texture = useLoader(THREE.TextureLoader, url || "/images/threeD1.png");

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh>
        <planeGeometry args={[3.2, 3.2]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true} 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </Float>
  );
}

export default function Product3D({ imageUrl, modelPath }: { imageUrl?: string, modelPath?: string }) {
  const finalUrl = modelPath || imageUrl || "/images/threeD1.png";

  return (
    <div className="h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas shadows>
        <color attach="background" args={["#FFF1F2"]} /> 

        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.8} />
          
          <FloatingImage url={finalUrl} />

          <ContactShadows 
            position={[0, -1.8, 0]} 
            opacity={0.3} 
            scale={8} 
            blur={2} 
            far={4} 
          />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}