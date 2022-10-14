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

<<<<<<< Updated upstream
  const images = sceneData.images;
  const textures = useLoader(THREE.TextureLoader, images);
=======
  const isStepVisible = useMemo(
    () => showAnim && showStep,
    [showAnim, showStep]
  );

  // show
  useEffect(() => {
    if (showAnim) {
      const animData = {
        scale: SCALE_VARIANTS.BIG,
        opacity: 0.7,
        positionX: (position[0] * SCALE_VARIANTS.BIG) / 2 - 1,
        positionZ: (position[2] * SCALE_VARIANTS.BIG) / 2 - 1,
      };
      gsap.to(animData, {
        scale: SCALE_VARIANTS.DEFAULT,
        opacity: 1,
        positionX: 0,
        positionZ: 0,
        duration: 2,
        onUpdate: () => {
          updateBox(meshRef.current, animData.opacity, animData.scale, [
            animData.positionX,
            0,
            animData.positionZ,
          ]);
        },
        onComplete: () => {
          setTimeout(() => setShowStep(true), 1000);
        },
      });
    } else {
      setShowStep(false);
      const animData = { scale: 1, opacity: 1, positionX: 0, positionZ: 0 };
      gsap.to(animData, {
        opacity: 0.7,
        positionX: positionNext[0] * -0.7,
        positionZ: positionNext[2] * -0.7,
        duration: 1,
        onUpdate: () => {
          // updateBox(meshRef.current, animData.opacity);
          updateBox(meshRef.current, animData.opacity, undefined, [
            animData.positionX,
            0,
            animData.positionZ,
          ]);
        },
        onComplete: () => {
          updateBox(meshRef.current, 0, 10);
        },
      });
    }
  }, [showAnim]);
>>>>>>> Stashed changes

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
