import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

import PlaneFixed from "./components/PlaneFixed/PlaneFixed";
import PlaneMove from "./components/PlaneMove/PlaneMove";
import { ANIMS } from "./anims.const";

function SceneBox({ sceneData, anims, showStep, ...props }) {
  // const [springData, springApi] = useSpring(() => ({
  //   opacity: anims === ANIMS.DEFAULT ? 1 : anims === ANIMS.SHOW ? 0 : 1,
  //   scale: anims === ANIMS.DEFAULT ? 1 : anims === ANIMS.SHOW ? 10 : 1,
  // }));

  // useEffect(() => {
  //   if (anims === ANIMS.SHOW) {
  //     springApi.start({
  //       opacity: anims ? 1 : 0.3,
  //       scale: 1,
  //       config: {
  //         duration: 1000,
  //       },
  //     });
  //     springApi.stop();
  //     // setShowHotspot(false);
  //   } else if (anims === ANIMS.HIDE) {
  //     springApi.start({
  //       opacity: anims ? 0 : 1,
  //       scale: anims ? 10 : 1,
  //       config: {
  //         duration: 1000,
  //       },
  //     });
  //     // setShowHotspot(true);
  //     springApi.stop();
  //   }
  // }, [anims]);

  const images = sceneData.images;
  const textures = useLoader(THREE.TextureLoader, images);

  const hotspots = sceneData.hotspots;
  const [showHotspot, setShowHotspot] = useState(false);

  const handleSelectedHotspot = (sceneID) => {
    props.onClickStep(sceneID);
  };

  return (
    <>
      <animated.mesh
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        // scale={springData.scale}
      >
        <boxBufferGeometry attach="geometry" args={[1100, 1100, 1100]} />
        {textures.map((texture, index) => (
          <animated.meshStandardMaterial
            key={index}
            attachArray="material"
            map={texture}
            side={THREE.DoubleSide}
            transparent
            // opacity={springData.opacity}
          />
        ))}
      </animated.mesh>

      {showStep && (
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
      )}
    </>
  );
}

export default SceneBox;
