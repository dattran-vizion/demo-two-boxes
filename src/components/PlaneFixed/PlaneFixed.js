import React, { memo } from "react";
import { DoubleSide } from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import gsap from "gsap";

import CircleFixed from "../../images/circleFixed.png";

function PlaneFixed(props) {
  const { boxID, hotspot, rotation, scale } = props.hotspot;
  const circleFixed = useLoader(TextureLoader, CircleFixed);

  const { camera } = useThree();

  const handleClick = (e) => {
    console.log("Point", e.point);
    let newPos = e.point;
    newPos.y = camera.position.y;

    gsap.to(camera.position, {
      x: newPos.x,
      y: newPos.y,
      z: newPos.z,
      duration: 1.5,
    });

    props.setShowBoxIndex(boxID);
  };

  return (
    <mesh
      onClick={(e) => handleClick(e)}
      rotation={rotation}
      position={hotspot}
      scale={scale}
    >
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshBasicMaterial
        attach="material"
        map={circleFixed}
        transparent
        opacity={1}
        side={DoubleSide}
      />
    </mesh>
  );
}

export default memo(PlaneFixed);
