"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useMemo } from "react";

// ✅ ၁။ Import လုပ်တဲ့အခါ error တက်ရင် path ကို သေချာပြန်စစ်ပါ။ 
// Public folder ထဲကဟာကို တိုက်ရိုက်ယူရင် "/" နဲ့ စရုံပါပဲ။
// ဒါမှမဟုတ် ပုံတွေကို static string အနေနဲ့ပဲ variable ထဲ ထည့်ထားလိုက်ပါ။

export default function StudioCanvas({ config }: { config: any }) {
  
  const selectedImageUrl = useMemo(() => {
    // config.flower.id နဲ့ config.wrapping.id တန်ဖိုးတွေ ရှိမရှိ အရင်စစ်ပါ
    const flowerId = config?.flower?.id || "red";
    const wrapId = config?.wrapping?.id || "classic";
    const id = `${flowerId}-${wrapId}`;

    // ✅ ပုံလမ်းကြောင်းတွေကို ဒီမှာ တစ်ခါတည်း တိုက်ရိုက် ရေးပေးလိုက်ပါ
    // public folder ထဲမှာ ရှိတာမို့ လမ်းကြောင်းအပြည့်အစုံ ရေးရပါမယ်
    switch (id) {
      case "red-classic":
        return "/images/Flowers/Rose/download (1).png";
      case "pink-modern":
        return "/images/Flowers/Lilie/download (1).png";
      case "yellow-minimal":
        return "/images/Flowers/Lotus Flower/download (1).png";
      default:
        return "/images/Flowers/Rose/download (1).png"; 
    }
  }, [config]);

  return (
    <div className="h-full w-full bg-[#F9F7F5]">
      <Canvas shadows>
        {/* ပုံ load လုပ်နေတုန်း ခဏစောင့်ပေးဖို့ Suspense ထည့်ထားပါတယ် */}
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
          <ambientLight intensity={1.5} />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <BouquetImage url={selectedImageUrl} />
          </Float>

          <ContactShadows position={[0, -1.8, 0]} opacity={0.3} scale={6} blur={2.5} />
          <OrbitControls enableZoom={true} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function BouquetImage({ url }: { url: string }) {
  // ✅ useLoader က URL String ကိုပဲ လက်ခံတာမို့ ပုံလမ်းကြောင်း (Path) ကိုပဲ ပို့ပေးရပါမယ်
  const texture = useLoader(THREE.TextureLoader, url);
  
  return (
    <mesh>
      <planeGeometry args={[3, 4]} /> 
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        side={THREE.DoubleSide} 
        alphaTest={0.5} 
      />
    </mesh>
  );
}