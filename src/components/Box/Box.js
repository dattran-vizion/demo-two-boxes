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
    // mass: 5,
    // tension: 400,
    // friction: 50,
    // precision: 0.0001,
    from: {
      position: props.start,
      opacity: props.opacityStart,
      // visible: props.visibleStart,
    },
    to: {
      position: props.end,
      opacity: props.opacityEnd,
      // visible: props.visible,
    },
    config: {
      duration: 3000,
    },
  });

  const textures = useLoader(THREE.TextureLoader, images);
  const mesh = useRef();

  return (
    <>
      <animated.mesh
        position={spring.position}
        rotation={props.rotation}
        // visible={spring.visible}
      >
        <boxBufferGeometry attach="geometry" args={props.args} />
        {textures.map((texture, index) => (
          <animated.meshStandardMaterial
            key={index}
            attachArray="material"
            map={texture}
            side={THREE.DoubleSide}
            opacity={spring.opacity}
            // color={0x00ff00}
            transparent={true}
          />
        ))}
      </animated.mesh>

      {/* {hotspots.map((hotspot, index) => (
        <PlaneFixed key={index} hotspot={hotspot} />
      ))}
      <PlaneMove /> */}
    </>
  );
}

export default Box;
