"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import { useTranslations } from "next-intl";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  Box,
  Sphere,
  Environment,
  OrbitControls,
  Torus,
  Cone,
  Cylinder,
} from "@react-three/drei";
import type { Group, Mesh, Material, MeshStandardMaterial } from "three";
import { Color, Vector3 } from "three";

// Configuração de cores do tema
const themeColors = {
  light: {
    building: "#e5e7eb",
    buildingAccent: "#6366f1",
    roof: "#374151",
    window: "#3b82f6",
    door: "#1f2937",
    mainSign: "#8b5cf6",
    mainSignEmissive: "#a855f7",
    sideSign: "#ec4899",
    japaneseSign: "#10b981",
    cat: "#f472b6",
    catEyes: "#22c55e",
    vendingMachine1: "#3730a3",
    vendingMachine2: "#3730a3",
    vendingMachine3: "#3730a3",
    hologram: "#6366f1",
    neonRing: "#ec4899",
    particles: ["#f472b6", "#8b5cf6", "#06d6a0"],
    ground: "#d1d5db",
    streetMarkings: "#6366f1",
    lights: "#f59e0b",
    carBody: "#9ca3af",
    carLights: "#fef08a",
  },
  dark: {
    building: "#1a0b2e",
    buildingAccent: "#7c3aed",
    roof: "#0f0620",
    window: "#8b5cf6",
    door: "#111827",
    mainSign: "#7c3aed",
    mainSignEmissive: "#a855f7",
    sideSign: "#ec4899",
    japaneseSign: "#06d6a0",
    cat: "#e879f9",
    catEyes: "#00ff88",
    vendingMachine1: "#1e1b4b",
    vendingMachine2: "#1e1b4b",
    vendingMachine3: "#1e1b4b",
    hologram: "#8b5cf6",
    neonRing: "#ec4899",
    particles: ["#e879f9", "#8b5cf6", "#06d6a0"],
    ground: "#111827",
    streetMarkings: "#8b5cf6",
    lights: "#fbbf24",
    carBody: "#1f2937",
    carLights: "#a855f7",
  },
};

// Componente para um único carro cyberpunk
function CyberCar({
  initialPosition,
  isDark,
  speed = 2,
}: {
  initialPosition: [number, number, number];
  isDark: boolean;
  speed?: number;
}) {
  const carRef = useRef<Group>(null);
  const colors = isDark ? themeColors.dark : themeColors.light;

  useFrame((_, delta) => {
    if (carRef.current) {
      carRef.current.position.z += delta * speed;
      if (speed > 0 && carRef.current.position.z > 25) {
        carRef.current.position.z = -25;
      } else if (speed < 0 && carRef.current.position.z < -25) {
        carRef.current.position.z = 25;
      }
    }
  });

  return (
    <group ref={carRef} position={initialPosition}>
      <Box args={[1.2, 0.6, 2.5]} position={[0, 0.4, 0]}>
        <meshStandardMaterial
          color={colors.carBody}
          metalness={0.5}
          roughness={0.5}
        />
      </Box>
      <Box args={[1, 0.5, 1.5]} position={[0, 0.9, -0.2]}>
        <meshStandardMaterial color={colors.window} transparent opacity={0.4} />
      </Box>
      {/* Headlights */}
      <Box args={[0.3, 0.1, 0.1]} position={[-0.4, 0.4, 1.25]}>
        <meshStandardMaterial
          color={colors.carLights}
          emissive={colors.carLights}
          emissiveIntensity={2}
        />
      </Box>
      <Box args={[0.3, 0.1, 0.1]} position={[0.4, 0.4, 1.25]}>
        <meshStandardMaterial
          color={colors.carLights}
          emissive={colors.carLights}
          emissiveIntensity={2}
        />
      </Box>
      {/* Taillights */}
      <Box args={[0.4, 0.15, 0.1]} position={[0, 0.45, -1.25]}>
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={2}
        />
      </Box>
    </group>
  );
}

// Componente para gerenciar múltiplos carros
function MovingVehicles({ isDark }: { isDark: boolean }) {
  return (
    <group>
      <CyberCar initialPosition={[7, 0, -10]} isDark={isDark} speed={8} />
      <CyberCar initialPosition={[-7, 0, 15]} isDark={isDark} speed={-10} />
      <CyberCar initialPosition={[7, 0, 5]} isDark={isDark} speed={9} />
    </group>
  );
}

// Componente para um único robô patrulheiro
function PatrolRobot({
  isDark,
  initialPosition,
  patrolArea,
}: {
  isDark: boolean;
  initialPosition: Vector3;
  patrolArea: { min: Vector3; max: Vector3 };
}) {
  const robotRef = useRef<Group>(null);

  useFrame((state) => {
    if (robotRef.current) {
      const time = state.clock.getElapsedTime();
      const patrolRangeX = patrolArea.max.x - patrolArea.min.x;
      const patrolRangeZ = patrolArea.max.z - patrolArea.min.z;

      robotRef.current.position.x =
        patrolArea.min.x + (Math.sin(time * 0.5) * 0.5 + 0.5) * patrolRangeX;
      robotRef.current.position.z =
        patrolArea.min.z + (Math.cos(time * 0.5) * 0.5 + 0.5) * patrolRangeZ;
      robotRef.current.rotation.y = Math.sin(time * 0.5) * 0.5;
    }
  });

  return (
    <group ref={robotRef} position={initialPosition}>
      <Box args={[0.4, 0.6, 0.3]} position={[0, 0.3, 0]}>
        <meshStandardMaterial
          color={isDark ? "#2d1b69" : "#4c1d95"}
          emissive={isDark ? "#6b46c1" : "#8b5cf6"}
          emissiveIntensity={0.2}
        />
      </Box>
      <Sphere args={[0.15]} position={[0, 0.75, 0]}>
        <meshStandardMaterial
          color={isDark ? "#1a0b2e" : "#374151"}
          emissive={isDark ? "#8b5cf6" : "#6366f1"}
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Sphere args={[0.03]} position={[-0.08, 0.78, 0.12]}>
        <meshStandardMaterial
          color={isDark ? "#ff0066" : "#dc2626"}
          emissive={isDark ? "#ff0066" : "#dc2626"}
          emissiveIntensity={0.8}
        />
      </Sphere>
      <Sphere args={[0.03]} position={[0.08, 0.78, 0.12]}>
        <meshStandardMaterial
          color={isDark ? "#ff0066" : "#dc2626"}
          emissive={isDark ? "#ff0066" : "#dc2626"}
          emissiveIntensity={0.8}
        />
      </Sphere>
    </group>
  );
}

// Componente para gerenciar múltiplos robôs
function RoamingRobots({ isDark }: { isDark: boolean }) {
  return (
    <group>
      {/* Robô original perto da loja */}
      <PatrolRobot
        isDark={isDark}
        initialPosition={new Vector3(1, 0.2, 4)}
        patrolArea={{
          min: new Vector3(-2, 0.2, 4),
          max: new Vector3(2, 0.2, 6),
        }}
      />
      {/* Novo robô do outro lado da rua */}
      <PatrolRobot
        isDark={isDark}
        initialPosition={new Vector3(-2, 0.2, -5)}
        patrolArea={{
          min: new Vector3(-4, 0.2, -6),
          max: new Vector3(4, 0.2, -4),
        }}
      />
      {/* Novo robô na calçada distante */}
      <PatrolRobot
        isDark={isDark}
        initialPosition={new Vector3(6, 0.2, 2)}
        patrolArea={{
          min: new Vector3(6, 0.2, -2),
          max: new Vector3(8, 0.2, 2),
        }}
      />
    </group>
  );
}

// Componente para Semáforo Animado
function TrafficLight({
  position,
  isDark,
}: {
  position: [number, number, number];
  isDark: boolean;
}) {
  const colors = isDark ? themeColors.dark : themeColors.light;
  const redLight = useRef<Mesh>(null);
  const yellowLight = useRef<Mesh>(null);
  const greenLight = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const cycle = Math.floor((time * 0.5) % 8); // Ciclo de 8 segundos

    const lowIntensity = isDark ? 0.1 : 0.05;
    const highIntensity = isDark ? 1.5 : 0.8;

    // Reset all lights
    if (redLight.current)
      (redLight.current.material as MeshStandardMaterial).emissiveIntensity =
        lowIntensity;
    if (yellowLight.current)
      (yellowLight.current.material as MeshStandardMaterial).emissiveIntensity =
        lowIntensity;
    if (greenLight.current)
      (greenLight.current.material as MeshStandardMaterial).emissiveIntensity =
        lowIntensity;

    // Animate lights based on cycle
    if (cycle < 4) {
      // Green
      if (greenLight.current)
        (
          greenLight.current.material as MeshStandardMaterial
        ).emissiveIntensity = highIntensity;
    } else if (cycle < 5) {
      // Yellow
      if (yellowLight.current)
        (
          yellowLight.current.material as MeshStandardMaterial
        ).emissiveIntensity = highIntensity;
    } else {
      // Red
      if (redLight.current)
        (redLight.current.material as MeshStandardMaterial).emissiveIntensity =
          highIntensity;
    }
  });

  return (
    <group position={position}>
      <Cylinder args={[0.1, 0.12, 6]} position={[0, 3, 0]}>
        <meshStandardMaterial color="#374151" />
      </Cylinder>
      <Box args={[0.3, 1.2, 0.3]} position={[0, 5.5, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      <Sphere ref={redLight} args={[0.2]} position={[0, 6, 0]}>
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" />
      </Sphere>
      <Sphere ref={yellowLight} args={[0.2]} position={[0, 5.5, 0]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" />
      </Sphere>
      <Sphere ref={greenLight} args={[0.2]} position={[0, 5, 0]}>
        <meshStandardMaterial
          color={colors.catEyes}
          emissive={colors.catEyes}
        />
      </Sphere>
    </group>
  );
}

// Konbini Building
function KonbiniBuilding({ isDark }: { isDark: boolean }) {
  const colors = isDark ? themeColors.dark : themeColors.light;
  const buildingRef = useRef<Group>(null);
  const mainSignRef = useRef<Mesh>(null);
  const sideSignRef = useRef<Mesh>(null);
  const catRef = useRef<Group>(null);
  const vendingMachine1Ref = useRef<Mesh>(null);
  const vendingMachine2Ref = useRef<Mesh>(null);
  const vendingMachine3Ref = useRef<Mesh>(null);
  const neonRingRef = useRef<Mesh>(null);
  const hologramRef = useRef<Group>(null);
  const antennaRef = useRef<Group>(null);
  const doorLightRef = useRef<Mesh>(null);
  const droneRef = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (buildingRef.current) {
      buildingRef.current.rotation.y = Math.sin(time * 0.3) * 0.01;
    }
    if (mainSignRef.current?.material) {
      const material = mainSignRef.current.material as Material & {
        emissiveIntensity: number;
      };
      material.emissiveIntensity =
        (isDark ? 0.6 : 0.3) + Math.sin(time * 2) * 0.2;
    }
    if (sideSignRef.current) {
      sideSignRef.current.rotation.z = Math.sin(time * 1.5) * 0.1;
    }
    if (catRef.current) {
      catRef.current.position.y = 5.4 + Math.sin(time * 1.5) * 0.15;
      catRef.current.rotation.y = time * 0.3;
    }
    if (vendingMachine1Ref.current?.material) {
      const material = vendingMachine1Ref.current.material as Material & {
        emissive: Color;
      };
      const intensity1 = (isDark ? 0.3 : 0.1) + Math.sin(time * 2.5) * 0.2;
      material.emissive = new Color(0x00ff88).multiplyScalar(intensity1);
    }
    if (vendingMachine2Ref.current?.material) {
      const material = vendingMachine2Ref.current.material as Material & {
        emissive: Color;
      };
      const intensity2 = (isDark ? 0.3 : 0.1) + Math.sin(time * 3.2) * 0.2;
      material.emissive = new Color(0xff0088).multiplyScalar(intensity2);
    }
    if (vendingMachine3Ref.current?.material) {
      const material = vendingMachine3Ref.current.material as Material & {
        emissive: Color;
      };
      const intensity3 = (isDark ? 0.3 : 0.1) + Math.sin(time * 2.8) * 0.2;
      material.emissive = new Color(0x0088ff).multiplyScalar(intensity3);
    }
    if (hologramRef.current) {
      hologramRef.current.rotation.y = time * 0.8;
      hologramRef.current.position.y = 3.5 + Math.sin(time * 2) * 0.1;
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(time * 0.5) * 0.2;
    }
    if (neonRingRef.current) {
      neonRingRef.current.rotation.x = time * 1.2;
      neonRingRef.current.rotation.z = time * 0.8;
    }
    if (doorLightRef.current?.material) {
      const material = doorLightRef.current.material as Material & {
        emissiveIntensity: number;
      };
      material.emissiveIntensity =
        (isDark ? 0.8 : 0.4) + Math.sin(time * 3) * 0.3;
    }
    if (droneRef.current) {
      droneRef.current.position.y = 6 + Math.sin(time * 2) * 0.3;
      droneRef.current.position.x = -4 + Math.sin(time * 0.3) * 2;
      droneRef.current.rotation.y = time * 0.5;
      droneRef.current.children.forEach((child, index) => {
        if (index >= 1 && index <= 4) {
          child.rotation.y = time * 15;
        }
      });
    }
  });

  return (
    <group ref={buildingRef} position={[0, 0.2, 0]}>
      {/* Estrutura e detalhes realistas */}
      <Box args={[7.2, 0.4, 5.7]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color={isDark ? "#0a0a0a" : "#6b7280"} />
      </Box>
      <Box args={[7, 4, 5.5]} position={[0, 2.4, 0]}>
        <meshStandardMaterial color={colors.building} roughness={0.6} />
      </Box>
      <Box args={[7.2, 0.5, 5.7]} position={[0, 4.65, 0]}>
        <meshStandardMaterial color={colors.roof} />
      </Box>
      <Box args={[1.5, 0.8, 1.2]} position={[2.5, 5.0, -1.8]}>
        <meshStandardMaterial color="#4b5563" />
      </Box>
      <Cylinder
        args={[0.4, 0.4, 1]}
        position={[2.5, 5.9, -1.8]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#374151" />
      </Cylinder>
      <Cylinder args={[0.06, 0.06, 4]} position={[-3.3, 2.4, -2.7]}>
        <meshStandardMaterial color="#4b5563" />
      </Cylinder>
      <Cylinder args={[0.06, 0.06, 4]} position={[3.3, 2.4, -2.7]}>
        <meshStandardMaterial color="#4b5563" />
      </Cylinder>

      {/* Elementos originais (reposicionados e animados) */}
      <Box args={[5, 2.5, 0.1]} position={[0, 2.5, 2.7]}>
        <meshStandardMaterial
          color={colors.window}
          transparent
          opacity={isDark ? 0.3 : 0.2}
          emissive={colors.window}
          emissiveIntensity={isDark ? 0.1 : 0.05}
        />
      </Box>
      <Box args={[1.2, 2.8, 0.1]} position={[-2.5, 2.1, 2.71]}>
        <meshStandardMaterial color={colors.door} />
      </Box>
      <Sphere ref={doorLightRef} args={[0.1]} position={[-2.5, 3.6, 2.8]}>
        <meshStandardMaterial
          color={colors.catEyes}
          emissive={colors.catEyes}
          emissiveIntensity={isDark ? 0.8 : 0.4}
        />
      </Sphere>
      <group position={[0, 3.8, 2.8]}>
        <Box ref={mainSignRef} args={[5, 1, 0.2]}>
          <meshStandardMaterial
            color={colors.mainSign}
            emissive={colors.mainSignEmissive}
            emissiveIntensity={isDark ? 0.6 : 0.3}
          />
        </Box>
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          KONBINI CODE
        </Text>
      </group>
      <group
        ref={sideSignRef}
        position={[3.6, 3, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <Box args={[2, 0.6, 0.15]}>
          <meshStandardMaterial
            color={colors.sideSign}
            emissive={colors.sideSign}
            emissiveIntensity={isDark ? 0.5 : 0.2}
          />
        </Box>
        <Text
          position={[0, 0, 0.08]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          24/7
        </Text>
      </group>
      <group position={[-3.6, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <Box args={[1.5, 0.5, 0.1]}>
          <meshStandardMaterial
            color={colors.japaneseSign}
            emissive={colors.japaneseSign}
            emissiveIntensity={isDark ? 0.4 : 0.2}
          />
        </Box>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          コンビニ
        </Text>
      </group>
      <group ref={catRef} position={[0, 5.4, 0]}>
        <Sphere args={[0.4]}>
          <meshStandardMaterial
            color={colors.cat}
            emissive={colors.cat}
            emissiveIntensity={0.2}
          />
        </Sphere>
        <Sphere args={[0.3]} position={[0, 0.5, 0]}>
          <meshStandardMaterial
            color={colors.cat}
            emissive={colors.cat}
            emissiveIntensity={0.2}
          />
        </Sphere>
        <Cone args={[0.12, 0.3]} position={[-0.2, 0.7, 0]}>
          <meshStandardMaterial
            color={colors.cat}
            emissive={colors.cat}
            emissiveIntensity={0.2}
          />
        </Cone>
        <Cone args={[0.12, 0.3]} position={[0.2, 0.7, 0]}>
          <meshStandardMaterial
            color={colors.cat}
            emissive={colors.cat}
            emissiveIntensity={0.2}
          />
        </Cone>
        <Sphere args={[0.06]} position={[-0.12, 0.55, 0.25]}>
          <meshStandardMaterial
            color={colors.catEyes}
            emissive={colors.catEyes}
            emissiveIntensity={0.8}
          />
        </Sphere>
        <Sphere args={[0.06]} position={[0.12, 0.55, 0.25]}>
          <meshStandardMaterial
            color={colors.catEyes}
            emissive={colors.catEyes}
            emissiveIntensity={0.8}
          />
        </Sphere>
      </group>
      <Box
        ref={vendingMachine1Ref}
        args={[0.8, 2.2, 0.8]}
        position={[3.0, 1.5, 2.2]}
      >
        <meshStandardMaterial color={colors.vendingMachine1} />
      </Box>
      <Box
        ref={vendingMachine2Ref}
        args={[0.8, 2.2, 0.8]}
        position={[4.0, 1.5, 2.2]}
      >
        <meshStandardMaterial color={colors.vendingMachine2} />
      </Box>
      <Box
        ref={vendingMachine3Ref}
        args={[0.8, 2.2, 0.8]}
        position={[5.0, 1.5, 2.2]}
      >
        <meshStandardMaterial color={colors.vendingMachine3} />
      </Box>
      <group ref={hologramRef} position={[-4.0, 3.5, 2.0]}>
        <Box args={[1, 1.5, 0.05]}>
          <meshStandardMaterial
            color={colors.hologram}
            transparent
            opacity={isDark ? 0.6 : 0.4}
            emissive={colors.hologram}
            emissiveIntensity={isDark ? 0.5 : 0.2}
          />
        </Box>
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.15}
          color={colors.catEyes}
          anchorX="center"
          anchorY="middle"
        >
          SPECIAL{"\n"}OFFER
        </Text>
      </group>
      <group ref={antennaRef} position={[1.5, 5.2, -0.5]}>
        <Cylinder args={[0.02, 0.02, 1]}>
          <meshStandardMaterial color="#64748b" />
        </Cylinder>
        <Cylinder
          args={[0.02, 0.02, 0.8]}
          position={[0.3, 0, 0]}
          rotation={[0, 0, Math.PI / 6]}
        >
          <meshStandardMaterial color="#64748b" />
        </Cylinder>
        <Sphere args={[0.03]} position={[0, 0.5, 0]}>
          <meshStandardMaterial
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={isDark ? 0.8 : 0.4}
          />
        </Sphere>
      </group>
      <group ref={droneRef} position={[-4, 6, 1]}>
        <Box args={[0.4, 0.15, 0.4]}>
          <meshStandardMaterial
            color={colors.door}
            emissive={colors.japaneseSign}
            emissiveIntensity={0.2}
          />
        </Box>
        <Cylinder args={[0.1, 0.1, 0.03]} position={[-0.15, 0.1, -0.15]}>
          <meshStandardMaterial color="#64748b" />
        </Cylinder>
        <Cylinder args={[0.1, 0.1, 0.03]} position={[0.15, 0.1, -0.15]}>
          <meshStandardMaterial color="#64748b" />
        </Cylinder>
        <Cylinder args={[0.1, 0.1, 0.03]} position={[-0.15, 0.1, 0.15]}>
          <meshStandardMaterial color="#64748b" />
        </Cylinder>
        <Cylinder args={[0.1, 0.1, 0.03]} position={[0.15, 0.1, 0.15]}>
          <meshStandardMaterial color="#64748b" />
        </Cylinder>
        <Sphere args={[0.05]} position={[0, -0.1, 0]}>
          <meshStandardMaterial
            color="#dc2626"
            emissive="#dc2626"
            emissiveIntensity={0.8}
          />
        </Sphere>
      </group>
      <Torus
        ref={neonRingRef}
        args={[0.5, 0.05, 8, 16]}
        position={[-1.5, 5.0, 0.5]}
      >
        <meshStandardMaterial
          color={colors.neonRing}
          emissive={colors.neonRing}
          emissiveIntensity={isDark ? 0.8 : 0.4}
        />
      </Torus>
    </group>
  );
}

// Ambiente de rua com mais detalhes
function StreetEnvironment({ isDark }: { isDark: boolean }) {
  const colors = isDark ? themeColors.dark : themeColors.light;
  return (
    <group>
      {/* Chão / Estrada */}
      <Box args={[40, 0.2, 60]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color={colors.ground} roughness={0.9} />
      </Box>

      {/* Calçadas */}
      <Box args={[40, 0.2, 12]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color={isDark ? "#1f2937" : "#9ca3af"} />
      </Box>

      {/* Marcas da Rua */}
      <Box args={[0.2, 0.02, 40]} position={[5, 0.02, 0]}>
        <meshStandardMaterial
          color={colors.streetMarkings}
          emissive={colors.streetMarkings}
          emissiveIntensity={isDark ? 0.2 : 0.1}
        />
      </Box>
      <Box args={[0.2, 0.02, 40]} position={[-5, 0.02, 0]}>
        <meshStandardMaterial
          color={colors.streetMarkings}
          emissive={colors.streetMarkings}
          emissiveIntensity={isDark ? 0.2 : 0.1}
        />
      </Box>

      {/* Postes de Luz */}
      <group position={[-6, 0.2, 8]}>
        <Cylinder args={[0.1, 0.1, 5]} position={[0, 2.5, 0]}>
          <meshStandardMaterial color="#374151" />
        </Cylinder>
        <Box args={[0.2, 0.2, 1.5]} position={[0, 5, 0.75]}>
          <meshStandardMaterial color="#374151" />
        </Box>
        <Sphere args={[0.25]} position={[0, 5, 1.5]}>
          <meshStandardMaterial
            color={colors.lights}
            emissive={colors.lights}
            emissiveIntensity={isDark ? 0.8 : 0.4}
          />
        </Sphere>
      </group>
      <group position={[6, 0.2, 8]}>
        <Cylinder args={[0.1, 0.1, 5]} position={[0, 2.5, 0]}>
          <meshStandardMaterial color="#374151" />
        </Cylinder>
        <Box args={[0.2, 0.2, 1.5]} position={[0, 5, 0.75]}>
          <meshStandardMaterial color="#374151" />
        </Box>
        <Sphere args={[0.25]} position={[0, 5, 1.5]}>
          <meshStandardMaterial
            color={colors.lights}
            emissive={colors.lights}
            emissiveIntensity={isDark ? 0.8 : 0.4}
          />
        </Sphere>
      </group>

      {/* Semáforos */}
      <TrafficLight position={[-4.5, 0.2, -10]} isDark={isDark} />
      <TrafficLight position={[4.5, 0.2, 10]} isDark={isDark} />

      {/* Mobiliário Urbano e Detalhes */}
      <Cylinder args={[0.3, 0.3, 0.8]} position={[4, 0.6, -2]}>
        <meshStandardMaterial color="#374151" />
      </Cylinder>
      <Cylinder args={[0.01, 0.5, 0.02]} position={[0, 0.21, 6]}>
        <meshStandardMaterial color="#4b5563" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <group position={[-4, 0.2, -3]}>
        <Box args={[2, 0.2, 0.8]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color={colors.door} />
        </Box>
        <Box args={[0.2, 0.6, 0.2]} position={[-0.9, 0.2, 0]}>
          <meshStandardMaterial color={colors.door} />
        </Box>
        <Box args={[0.2, 0.6, 0.2]} position={[0.9, 0.2, 0]}>
          <meshStandardMaterial color={colors.door} />
        </Box>
      </group>
    </group>
  );
}

// Partículas Flutuantes
function FloatingParticles({ isDark }: { isDark: boolean }) {
  const particlesRef = useRef<Group>(null);
  const colors = isDark ? themeColors.dark : themeColors.light;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 45,
          Math.random() * 12,
          (Math.random() - 0.5) * 45,
        ] as [number, number, number],
        speed: Math.random() * 0.02 + 0.01,
        color:
          colors.particles[Math.floor(Math.random() * colors.particles.length)],
        size: Math.random() * 0.08 + 0.03,
      });
    }
    return temp;
  }, [colors.particles]);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += particles[i].speed;
        if (particle.position.y > 12) particle.position.y = -1;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <Sphere key={i} args={[p.size]} position={p.position}>
          <meshStandardMaterial
            color={p.color}
            transparent
            opacity={isDark ? 0.6 : 0.4}
            emissive={p.color}
            emissiveIntensity={isDark ? 0.3 : 0.1}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Componente Principal
export default function KonbiniCode3D() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const t = useTranslations("Animate3DSection");
  return (
    <section className="hidden md:block py-16 lg:py-24 max-w-6xl mx-auto mb-24">
      <h3 className="text-3xl font-bold mb-2 transition-all duration-500 text-foreground text-start">
        {t("title")}
      </h3>
      <p
        className="text-base text-muted-foreground mt-4 mb-10 text-start leading-relaxed"
        dangerouslySetInnerHTML={{ __html: typeof window !== 'undefined' && DOMPurify.sanitize ? DOMPurify.sanitize(t("description")) : t("description") }}
      />
      <div
        className={`w-full h-[600px] bg-transparent rounded-lg overflow-hidden relative transition-all duration-500 cursor-grab ${
          isDark
            ? "shadow-2xl shadow-purple-500/20"
            : "shadow-xl shadow-gray-300/50"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Canvas camera={{ position: [0, 8, 20], fov: 50 }}>
          <fog attach="fog" args={[isDark ? "#0f0620" : "#a3a3a3", 25, 60]} />
          <ambientLight intensity={isDark ? 0.1 : 0.3} />
          <directionalLight
            position={[10, 15, 5]}
            intensity={isDark ? 0.4 : 0.6}
            color={isDark ? "#8b5cf6" : "#6366f1"}
            castShadow
          />
          <pointLight
            position={[0, 8, 5]}
            intensity={isDark ? 1.0 : 0.5}
            color={isDark ? "#e879f9" : "#ec4899"}
          />
          <Environment preset={isDark ? "night" : "city"} />
          <KonbiniBuilding isDark={isDark} />
          <StreetEnvironment isDark={isDark} />
          <MovingVehicles isDark={isDark} />
          <RoamingRobots isDark={isDark} />
          <FloatingParticles isDark={isDark} />
          <OrbitControls
            enabled={isHovered}
            enablePan={false}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={10}
            maxDistance={40}
            autoRotate={!isHovered}
            autoRotateSpeed={0.4}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>

        <div
          className={`absolute bottom-4 right-4 text-xs pointer-events-none transition-colors duration-500`}
        >
          <p className="text-foreground">{t("tooltip")}</p>
        </div>
      </div>
    </section>
  );
}
