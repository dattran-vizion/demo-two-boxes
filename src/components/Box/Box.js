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
      position: props.start,
      opacity: props.opacityStart,
      scale: props.scaleStart,
    },
    to: {
      position: props.end,
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
        position={spring.position}
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
      {/* 
      <mesh position={[1000, 1000, 0]}>
        <boxBufferGeometry attach="geometry" args={props.args} />
        <meshStandardMaterial
          attach="material"
          side={THREE.DoubleSide}
          color="red"
          opacity={0}
        />
      </mesh> */}

      {/* {hotspots.map((hotspot, index) => (
        <PlaneFixed key={index} hotspot={hotspot} />
      ))}
      <PlaneMove /> */}
    </>
  );
}

export default Box;
