import React, { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { gsap } from "gsap";
import PlaneFixed from "./components/PlaneFixed/PlaneFixed";
import PlaneMove from "./components/PlaneMove/PlaneMove";
// import { ANIMS } from "./anims.const";

function SceneBox({ sceneData, showAnim, ...props }) {
  const meshRef = useRef();
  // const [scenes, setScenes] = useState(sceneData);
  // const [{ opacity, scale }, setSpring] = useState({ scale: 10, opacity: 0 });
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

  // show
  useEffect(() => {
    if (showAnim) {
      const animData = { scale: 10, opacity: 0.3 };
      gsap.to(animData, {
        scale: 1,
        opacity: 1,
        duration: 2,
        onUpdate: () => {
          // console.log(animData);
          meshRef.current.scale.set(
            animData.scale,
            animData.scale,
            animData.scale
          );
          meshRef.current.material.forEach((m) => {
            m.opacity = animData.opacity;
            m.needsUpdate = true;
          });
          // meshRef.current.opacity.set(animData.opacity);
          // setSpring({ scale: animData.scale, opacity: animData.opacity });
        },
        onComplete: () => {
          state.current = "show";
          setShowStep(true);
        },
      });
    } else {
      setShowStep(false);
      const animData = { scale: 1, opacity: 1 };
      gsap.to(animData, {
        scale: 10,
        opacity: 0.3,
        duration: 1000,
        onUpdate: () => {
          meshRef.current.scale.set(animData.scale);
          // meshRef.current.opacity.set(animData.opacity);
          // setSpring({ scale: animData.scale, opacity: animData.opacity });
        },
        onComplete: () => {
          state.current = "hide";
        },
      });
    }
  }, [showAnim]);

  // hide

  // const [{ opacity, scale }, api] = useSpring(() => ({
  //   from: { opacity: 0, scale: 10 },
  //   to: { opacity: 1, scale: 1 },
  //   config: { duration: 1500 },
  //   onRest: () => {
  //     if (!state.current) {
  //       console.log("showed");
  //       state.current = "show";
  //       setShowStep(true);
  //     } else {
  //       console.log("hidden");
  //       state.current = "";
  //       setShowStep(false);
  //     }
  //   },
  // }));

  // useEffect(() => {
  //   console.log("show lai");
  //   if (showAnim && state.current === "hide") {
  //     api.start({
  //       opacity: 1,
  //       scale: 1,
  //     });
  //   }
  // }, [showAnim, state]);

  const images = sceneData.images;
  const textures = useLoader(THREE.TextureLoader, images);

  const hotspots = sceneData.hotspots;
  console.log(hotspots);

  const handleSelectedStep = (sceneID) => {
    console.log("clicked");
    props.onClickStep(sceneID);
    // api.start({
    //   opacity: 0.3,
    // });
    // api.start({
    //   opacity: 0,
    //   scale: 10,
    //   config: { duration: 0 },
    // });
    console.log("done hide");
  };

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[1100, 1100, 1100]} />
        {textures.map((texture, index) => (
          <meshStandardMaterial
            key={index}
            attachArray="material"
            map={texture}
            side={THREE.DoubleSide}
            transparent
            // opacity={1}
          />
        ))}
      </mesh>

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
