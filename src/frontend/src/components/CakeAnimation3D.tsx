import { Button } from "@/components/ui/button";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type * as THREE from "three";

const CANDLE_ANGLES = [0, 72, 144, 216, 288];
const FLOWER_ANGLES = [0, 90, 180, 270];

function CakeMesh({ extraRotation }: { extraRotation: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (0.4 + extraRotation);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.8, 32]} />
        <meshStandardMaterial color="#F5D0C8" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.78, 0]}>
        <torusGeometry args={[1.35, 0.08, 16, 64]} />
        <meshStandardMaterial color="#F7F2EA" roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 0.7, 32]} />
        <meshStandardMaterial color="#D3BEEA" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <torusGeometry args={[0.95, 0.07, 16, 64]} />
        <meshStandardMaterial color="#F7F2EA" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.6, 32]} />
        <meshStandardMaterial color="#D7E8DF" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.12, 32]} />
        <meshStandardMaterial color="#F7F2EA" roughness={0.2} />
      </mesh>

      {CANDLE_ANGLES.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const r = 0.35;
        const x = Math.cos(rad) * r;
        const z = Math.sin(rad) * r;
        return (
          <group key={angle} position={[x, 1.0, z]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
              <meshStandardMaterial
                color={angle % 144 === 0 ? "#E7B3AA" : "#BFA6DC"}
              />
            </mesh>
            <mesh position={[0, 0.22, 0]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial
                color="#FFF176"
                emissive="#FFA000"
                emissiveIntensity={2}
              />
            </mesh>
          </group>
        );
      })}

      {FLOWER_ANGLES.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const r = 0.42;
        return (
          <mesh
            key={angle}
            position={[Math.cos(rad) * r, 0.92, Math.sin(rad) * r]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={angle % 180 === 0 ? "#C7A0A0" : "#5F8F80"}
              roughness={0.5}
            />
          </mesh>
        );
      })}

      <mesh position={[0, -1.65, 0]}>
        <cylinderGeometry args={[1.7, 1.7, 0.08, 32]} />
        <meshStandardMaterial color="#BFA6DC" roughness={0.3} />
      </mesh>
    </group>
  );
}

export function CakeAnimation3D() {
  const [extraRotation, setExtraRotation] = useState(0);

  return (
    <div className="bg-lavender rounded-xl p-4 flex flex-col items-center gap-3">
      <h3 className="font-serif font-semibold text-espresso text-center">
        3D Cake View
      </h3>
      <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-b from-pale-mint/30 to-lavender/30">
        <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
          <pointLight position={[-5, 5, -5]} intensity={0.4} color="#D3BEEA" />
          <CakeMesh extraRotation={extraRotation} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={0.5}
            maxPolarAngle={1.8}
          />
        </Canvas>
      </div>
      <div className="flex items-center gap-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setExtraRotation((p) => Math.max(0, p - 1))}
          className="rounded-full border-lavender-dark"
          data-ocid="cake3d.rotate_left_button"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-sans text-sm text-espresso">Rotate</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setExtraRotation((p) => p + 1)}
          className="rounded-full border-lavender-dark"
          data-ocid="cake3d.rotate_right_button"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
