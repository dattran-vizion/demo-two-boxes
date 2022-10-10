import React, { memo } from "react";
import { DoubleSide } from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

import CircleFixed from "../../images/circleFixed.png";

function PlaneFixed(props) {
  const { boxID, hotspot, rotation, scale } = props.hotspot;

  console.log("boxID", boxID);
  console.log("hotspot", hotspot);
  console.log("rotation", rotation);
  console.log("scale", scale);

  const circleFixed = useLoader(TextureLoader, CircleFixed);

  return (
    <mesh
      onClick={() => props.handleSelectedHotspot()}
      rotation={rotation}
      position={hotspot}
      scale={scale}
    >
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshBasicMaterial
        attach="material"
        map={circleFixed}
        side={DoubleSide}
        transparent={true}
      />
    </mesh>
  );
}

export default memo(PlaneFixed);
