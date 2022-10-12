import React, { useState } from "react";
import * as THREE from "three";
import { useTransition, animated } from "@react-spring/three";
import { useLoader } from "@react-three/fiber";
import fakeData from "../assets/fakeData/data";
const firstScene = fakeData[0];

const Scene = () => {
  const [currScenes, setCurrScene] = useState([firstScene]);
  const transitions = useTransition(currScenes, {
    from: { opacity: 0, scale: 10 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 10 },
    config: { duration: 1000 },
  });

  const images = 

  const textures = useLoader(THREE.TextureLoader, images);

  return (
    <group>
        {transitions(({opacity, scale}, scene) => (
            <animated.mesh
            position={[0, 0, 0]}
            rotation={[0,0,0]}
            scale={scale}
          >
            <boxBufferGeometry attach="geometry" args={[1100,1100,1100]} />
            {textures.map((texture, index) => (
              <animated.meshStandardMaterial
                key={index}
                attachArray="material"
                map={texture}
                side={THREE.DoubleSide}
                transparent
                opacity={opacity}
              />
            ))}
          </animated.mesh>
        ))}
    </group>
  )
};
