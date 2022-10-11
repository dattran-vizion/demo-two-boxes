import React, { useState, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

import PlaneFixed from "../PlaneFixed/PlaneFixed";
import PlaneMove from "../PlaneMove/PlaneMove";

import fakeData from "../../assets/fakeData/data";

function Box(props) {
  const [showBoxIndex, setShowBoxIndex] = useState(1);
  let hotspots = fakeData[showBoxIndex - 1].hotspots;
  const images = props.images;

  const spring = useSpring({
    loop: false,
    delay: 2000,
    from: {
      opacity: props.opacityStart,
      scale: props.scaleStart,
    },
    to: {
      opacity: props.opacityEnd,
      scale: props.scaleEnd,
    },
    config: {
      duration: 1000,
    },
    onRest: () => props.setShowBox(false),
  });

  const textures = useLoader(THREE.TextureLoader, images);

  return (
    <>
      <animated.mesh
        position={[0, 0, 0]}
        rotation={props.rotation}
        scale={spring.scale}
      >
        <boxBufferGeometry attach="geometry" args={props.args} />
        {textures.map((texture, index) => (
          <animated.meshStandardMaterial
            key={index}
            attachArray="material"
            map={texture}
            side={THREE.DoubleSide}
            transparent
            opacity={spring.opacity}
          />
        ))}
      </animated.mesh>

      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[1000, 1000, 1000]} />
        <meshStandardMaterial
          attach="material"
          side={THREE.BackSide}
          transparent
          visible={false}
        />

        {hotspots.map((hotspot, index) => (
          <PlaneFixed key={index} hotspot={hotspot} />
        ))}
        <PlaneMove />
      </mesh>
    </>
  );
}

export default Box;
