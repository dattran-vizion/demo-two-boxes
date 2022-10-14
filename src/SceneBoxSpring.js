import React, { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

import PlaneFixed from "./components/PlaneFixed/PlaneFixed";
import PlaneMove from "./components/PlaneMove/PlaneMove";
// import { ANIMS } from "./anims.const";

function SceneBox({ sceneData, showAnim, ...props }) {
  // const [scenes, setScenes] = useState(sceneData);
  const state = useRef("");
  const [showStep, setShowStep] = useState(false);
  // const transitions = useTransition(showAnim, {
  //   from: { opacity: 0, scale: 10 },
  //   enter: { opacity: 1, scale: 1 },
  //   leave: { opacity: 0, scale: 10 },
  //   // delay: 200,
  //   config: { duration: 1000 },
  //   onRest: () => setShowStep(true),
  // });

  const isStepVisible = useMemo(
    () => showAnim && showStep,
    [showAnim, showStep]
  );

  const [{ opacity, scale }, api] = useSpring(() => ({
    from: { opacity: 0, scale: 10 },
    to: { opacity: 1, scale: 1 },
    config: { duration: 1500 },
    onRest: () => {
      if (!state.current) {
        console.log("showed");
        state.current = "show";
        setShowStep(true);
      } else {
        console.log("hidden");
        state.current = "";
        setShowStep(false);
      }
    },
  }));

  useEffect(() => {
    console.log("show lai");
    if (showAnim && state.current === "hide") {
      api.start({
        opacity: 1,
        scale: 1,
      });
    }
  }, [showAnim, state]);

  const images = sceneData.images;
  const textures = useLoader(THREE.TextureLoader, images);

  const hotspots = sceneData.hotspots;
  console.log(hotspots);

  const handleSelectedStep = (sceneID) => {
    console.log("clicked");
    props.onClickStep(sceneID);
    api.start({
      opacity: 0.3,
    });
    api.start({
      opacity: 0,
      scale: 10,
      config: { duration: 0 },
    });
    console.log("done hide");
  };

  return (
    <group>
      <animated.mesh position={[0, 0, 0]} rotation={[0, 0, 0]} scale={scale}>
        <boxBufferGeometry attach="geometry" args={[1100, 1100, 1100]} />
        {textures.map((texture, index) => (
          <animated.meshStandardMaterial
            key={index}
            attachArray="material"
            map={texture}
            side={THREE.DoubleSide}
            transparent
            opacity={opacity}
          />
        ))}
      </animated.mesh>

      {isStepVisible ? (
        <mesh position={[0, 0, 0]}>
          <boxBufferGeometry attach="geometry" args={[1000, 1000, 1000]} />
          <meshStandardMaterial
            attach="material"
            side={THREE.BackSide}
            transparent
            visible={false}
          />

          <>
            {hotspots.map((hotspot, index) => (
              <PlaneFixed
                key={index}
                hotspot={hotspot}
                handleSelectedStep={handleSelectedStep}
              />
            ))}
            <PlaneMove boxWidth={1000} />
          </>
        </mesh>
      ) : null}
    </group>
  );
}

export default SceneBox;
