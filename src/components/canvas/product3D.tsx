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
          // 💡 Texture ရဲ့ alpha (ကြည်လင်မှု) ကို ပိုကောင်းအောင် alphaTest ထည့်ထားသည်
          alphaTest={0.01}
        />
      </mesh>
    </Float>
  );
}

export default function Product3D({ imageUrl, modelPath }: { imageUrl?: string, modelPath?: string }) {
  const finalUrl = modelPath || imageUrl || "/images/threeD1.png";

  return (
    <div className="h-full w-full cursor-grab active:cursor-grabbing">
      {/* 💡 gl={{ alpha: true }} ကိုထည့်ခြင်းဖြင့် နောက်ခံကို ကြည်လင်စေပါသည် */}
      <Canvas shadows gl={{ alpha: true, antialias: true }}>
        {/* 💡 အဖြူရောင်နောက်ခံ <color> tag ကို ဖယ်ထုတ်လိုက်ပါသည် */}
        
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={1} /> {/* 💡 အလင်းကို နည်းနည်း ပိုမြှင့်ထားသည် */}
          
          <FloatingImage url={finalUrl} />

          <ContactShadows 
            position={[0, -1.8, 0]} 
            opacity={0.4} 
            scale={8} 
            blur={2.5} 
            far={4} 
          />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}