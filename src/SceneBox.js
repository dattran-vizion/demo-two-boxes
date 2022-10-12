import React, { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import PlaneFixed from "./components/PlaneFixed/PlaneFixed";
import PlaneMove from "./components/PlaneMove/PlaneMove";
// import { ANIMS } from "./anims.const";

const createBox = (images) => {
  const geometry = new THREE.BoxGeometry(1100, 1100, 1100);
  const materials = images.map((img) => {
    const material = new THREE.MeshStandardMaterial({
      side: THREE.BackSide,
      transparent: true,
      opacity: 0,
      color: 0xffffff,
    });
    material.map = new THREE.TextureLoader().load(img);
    return material;
  });
  const mesh = new THREE.Mesh(geometry, materials);
  mesh.position.set(0, 0, 0);
  mesh.rotation.set(0, 0, 0);
  mesh.scale.set(10, 10, 10);
  return mesh;
};

const updateBox = (mesh, opacity, scale) => {
  if (scale !== undefined) {
    mesh.scale.set(scale, scale, scale);
  }
  if (opacity !== undefined) {
    mesh.material.forEach((m) => {
      m.opacity = opacity;
      m.needsUpdate = true;
    });
  }
};

function SceneBox({ sceneData, showAnim, ...props }) {
  const meshRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (!meshRef.current) {
      meshRef.current = createBox(sceneData.images);
      scene.add(meshRef.current);
    }
  }, [scene, sceneData.images]);

  const [showStep, setShowStep] = useState(false);

  const isStepVisible = useMemo(
    () => showAnim && showStep,
    [showAnim, showStep]
  );

  // show
  useEffect(() => {
    if (showAnim) {
      const animData = {
        scale: 10,
        opacity: 0,
      };
      gsap.to(animData, {
        scale: 1,
        opacity: 1,
        duration: 5,
        onUpdate: () => {
          updateBox(meshRef.current, animData.opacity, animData.scale);
        },
        onComplete: () => {
          setTimeout(() => setShowStep(true), 1000);
        },
      });
    } else {
      setShowStep(false);
      const animData = { scale: 1, opacity: 1 };
      gsap.to(animData, {
        // scale: 10,
        opacity: 0.3,
        duration: 3,
        onUpdate: () => {
          updateBox(meshRef.current, animData.opacity);
        },
        onComplete: () => {
          updateBox(meshRef.current, 0, 10);
        },
      });
    }
  }, [showAnim]);

  const hotspots = sceneData.hotspots;

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
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[1000, 1000, 1000]} />
        <meshStandardMaterial
          attach="material"
          side={THREE.BackSide}
          transparent
          visible={false}
        />
        {isStepVisible ? (
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
        ) : null}
      </mesh>
    </group>
  );
}

export default SceneBox;
