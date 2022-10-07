import * as THREE from "three";
import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

import PlaneFixed from "./PlaneFixed/PlaneFixed";
import PlaneMove from "./PlaneMove/PlaneMove";

import fakeData from "../assets/fakeData/data";

export default function Scene(props) {
  const mesh = useRef();
  const allScenes = {
    currentScene: new THREE.BoxGeometry(1100, 1100, 1100),
    nextScene: new THREE.BoxGeometry(3000, 3000, 3000),
  };

  const hotspots = props.hotspots;

  const images = props.images;
  const textures = useLoader(THREE.TextureLoader, images);

  return (
    <>
      <animated.mesh {...props} ref={mesh} rotation={props.rotation}>
        <primitive object={allScenes[props.scene]} attach={"geometry"} />
        {textures.map((texture, index) => (
          <meshStandardMaterial
            key={index}
            attachArray="material"
            map={texture}
            side={THREE.DoubleSide}
            transparent
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
