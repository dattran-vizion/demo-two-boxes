import React, { memo } from "react";
import { DoubleSide } from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

import CircleFixed from "../../images/circleFixed.png";

function PlaneFixed(props) {
  const { sceneID, position, rotation, scale } = props.hotspot;

  const circleFixed = useLoader(TextureLoader, CircleFixed);

  return (
    <mesh
      onClick={() => props.handleSelectedStep(sceneID, position)}
      rotation={rotation}
      position={position}
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
