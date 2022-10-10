import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

import PlaneFixed from "./PlaneFixed/PlaneFixed";
import PlaneMove from "./PlaneMove/PlaneMove";
import { ANIMS } from "./anims.const";

function SceneBox({ sceneData, anims, animCompleted, ...props }) {
  // const [showBoxIndex, setShowBoxIndex] = useState(1);
  const [springData, setSpringData] = useSpring({
    opacity: anims === ANIMS.DEFAULT ? 1 : anims === ANIMS.SHOW ? 0 : 1,
    scale: anims === ANIMS.DEFAULT ? 1 : anims === ANIMS.SHOW ? 10 : 1,
  });

  useEffect(() => {
    const animPayload = {
      config: {
        duration: 1000,
      },
      onRest: () => {
        if (anims === ANIMS.HIDE) {
          setSpringData({
            scale: 10,
            opacity: 0,
            config: { duration: 0 },
          });
        }
        animCompleted();
        setShowHotspot(true);
      },
    };
    if (anims === ANIMS.SHOW) {
      animPayload.opacity = 1;
      animPayload.scale = 1;
    } else if (anims === ANIMS.HIDE) {
      animPayload.opacity = 0.3;
    }
    setSpringData(animPayload);
  }, [anims]);

  const [activeAnimation, setActiveAnimation] = useState(false);
  //   const animation = props.animation;

  const images = sceneData.images;
  const textures = useLoader(THREE.TextureLoader, images);

  const hotspots = sceneData.hotspots;
  const [showHotspot, setShowHotspot] = useState(false);

  //   const spring = useSpring({
  //     opacity: !activeAnimation ? animation.opacityStart : animation.opacityEnd,
  //     scale: !activeAnimation ? animation.scaleStart : animation.scaleEnd,
  //     config: {
  //       duration: 1000,
  //     },
  //     onRest: () => {
  //         animCompleted();
  //         props.changeCurrentScene("nextScene");
  //         setShowHotspot(true);
  //     },
  //   });

  const handleSelectedHotspot = (index) => {
    console.log("clicked");
    setActiveAnimation(!activeAnimation);
  };

  return (
    <>
      <animated.mesh
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={springData.scale}
      >
        <boxBufferGeometry attach="geometry" args={[]} />
        {textures.map((texture, index) => (
          <animated.meshStandardMaterial
            key={index}
            attachArray="material"
            map={texture}
            side={THREE.DoubleSide}
            transparent
            opacity={springData.opacity}
          />
        ))}
      </animated.mesh>

      {showHotspot ? (
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
          <PlaneMove boxWidth={1000} />
        </mesh>
      ) : null}
    </>
  );
}

export default SceneBox;
