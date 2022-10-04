import React, { useState } from "react";
import * as THREE from "three";
import { useLoader, useThree, useFrame } from "@react-three/fiber";

import PlaneFixed from "../PlaneFixed/PlaneFixed";
import PlaneMove from "../PlaneMove/PlaneMove";

import fakeData from "../../assets/fakeData/data";

function Box(props) {
  const [showBoxIndex, setShowBoxIndex] = useState(1);
  let hotspots = fakeData[showBoxIndex - 1].hotspots;
  const images = props.images;

  const textures = useLoader(THREE.TextureLoader, images);

  return (
    <>
      <mesh position={props.position} rotation={props.rotation}>
        <boxBufferGeometry attach="geometry" args={props.args} />
        {textures.map((texture, index) => (
          <meshStandardMaterial
            key={index}
            attachArray="material"
            map={texture}
            side={THREE.DoubleSide}
          />
        ))}
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[1000, 1000, 1000]} />
        <meshStandardMaterial
          attach="material"
          side={THREE.DoubleSide}
          opacity={0}
          transparent
        />
        {hotspots.map((hotspot, index) => (
          <PlaneFixed
            key={index}
            hotspot={hotspot}
            setShowBoxIndex={setShowBoxIndex}
          />
        ))}
        <PlaneMove />
      </mesh>
    </>
  );
}

export default Box;
