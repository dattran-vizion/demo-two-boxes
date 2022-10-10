import React, { useState, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

import PlaneFixed from "./PlaneFixed/PlaneFixed";
import PlaneMove from "./PlaneMove/PlaneMove";

function Scene(props) {
  // const [showBoxIndex, setShowBoxIndex] = useState(1);

  const [activeAnimation, setActiveAnimation] = useState(false);
  const sceneData = props.scene;
  const animation = props.animation;

  const images = sceneData.sceneData.images;
  const textures = useLoader(THREE.TextureLoader, images);

  const hotspots = sceneData.sceneData.hotspots;

  const spring = useSpring({
    // loop: false,
    // delay: 2000,
    // from: {
    //   opacity: animation.opacityStart,
    //   scale: animation.scaleStart,
    // },
    // to: {
    //   opacity: animation.opacityEnd,
    //   scale: animation.scaleEnd,
    // },

    opacity: !activeAnimation ? animation.opacityStart : animation.opacityEnd,
    scale: !activeAnimation ? animation.scaleStart : animation.scaleEnd,
    config: {
      duration: 1000,
    },
    onRest: () => props.changeCurrentScene("nextScene"),
  });

  const handleSelectedHotspot = (index) => {
    console.log("clicked");
    setActiveAnimation(!activeAnimation);
  };

  return (
    <>
      <animated.mesh
        position={[0, 0, 0]}
        rotation={sceneData.rotation}
        scale={spring.scale}
      >
        <boxBufferGeometry attach="geometry" args={sceneData.args} />
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
          <PlaneFixed
            key={index}
            hotspot={hotspot}
            handleSelectedHotspot={handleSelectedHotspot}
          />
        ))}
        <PlaneMove />
      </mesh>
    </>
  );
}

export default Scene;
