import React, { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import PlaneFixed from "./components/PlaneFixed/PlaneFixedNewData";

// import PlaneFixed from "./components/PlaneFixed/PlaneFixed";
// import PlaneMove from "./components/PlaneMove/PlaneMove";

const SCALE_VARIANTS = {
  DEFAULT: 1,
  BIG: 10,
};

const loader = new THREE.TextureLoader();

const createBox = (images, position, rotation) => {
  let [x, y, z] = position;

  const geometry = new THREE.BoxGeometry(1100, 1100, 1100);
  const materials = images.map((img) => {
    const material = new THREE.MeshPhongMaterial({
      map: loader.load(img),
      side: THREE.BackSide,
      transparent: true,
      opacity: 1,
      color: 0xffffff,
    });
    return material;
  });

  const mesh = new THREE.Mesh(geometry, materials);
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  mesh.scale.set(
    -1 * SCALE_VARIANTS.BIG, // Texture reversed on the x axis
    SCALE_VARIANTS.BIG,
    1 * SCALE_VARIANTS.BIG
  );
  return mesh;
};

const updateBox = (mesh, opacity, scale, position, rotation) => {
  if (scale !== undefined) {
    mesh.scale.set(-scale, scale, scale); // Texture reversed on the x axis
  }

  if (position !== undefined) {
    const [x, y, z] = position;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
  }

  if (rotation !== undefined) {
    const [rotation_x, rotation_y, rotation_z] = rotation;
    mesh.rotation.x = rotation_x;
    mesh.rotation.y = rotation_y;
    mesh.rotation.z = rotation_z;
  }

  if (opacity !== undefined) {
    mesh.material.forEach((m) => {
      m.opacity = opacity;
      m.needsUpdate = true;
    });
  }
};

const updateBoxImages = (mesh, images) => {
  mesh.material.forEach((m, index) => {
    m.map = new THREE.TextureLoader().load(images[index]);
    m.needsUpdate = true;
  });
  return mesh;
};

function SceneBox({
  sceneData,
  showAnim,
  rotation,
  prevRotation,
  position,
  positionNext,
  ...props
}) {
  const images = sceneData.images;
  const hotspots = sceneData.hotspots;
  const meshRef = useRef();
  const groupRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (!meshRef.current) {
      meshRef.current = createBox(images, position, rotation);
      scene.add(meshRef.current);
    }
    // Update the pictures in the scene box
    if (meshRef.current) {
      meshRef.current = updateBoxImages(meshRef.current, images);
      scene.add(meshRef.current);
    }
  }, [scene, images, position, rotation]);

  const [showStep, setShowStep] = useState(false);

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
        positionX:
          (position[0] * Math.cos(prevRotation) +
            position[2] * Math.sin(prevRotation)) *
          (SCALE_VARIANTS.BIG / 2 - 1),
        positionZ:
          (-position[0] * Math.sin(prevRotation) +
            position[2] * Math.cos(prevRotation)) *
          (SCALE_VARIANTS.BIG / 2 - 1),
      };
      gsap.to(animData, {
        scale: SCALE_VARIANTS.DEFAULT,
        opacity: 1,
        positionX: 0,
        positionZ: 0,
        duration: 1.5,
        onUpdate: () => {
          updateBox(
            meshRef.current,
            animData.opacity,
            animData.scale,
            [animData.positionX, 0, animData.positionZ],
            rotation
          );
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
        positionX:
          (positionNext[0] * Math.cos(rotation[1]) +
            positionNext[2] * Math.sin(rotation[1])) *
          -0.5,
        positionZ:
          (-positionNext[0] * Math.sin(rotation[1]) +
            positionNext[2] * Math.cos(rotation[1])) *
          -0.5,
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
  }, [showAnim, position, positionNext, rotation, prevRotation]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = rotation[0];
      groupRef.current.rotation.y = rotation[1];
      groupRef.current.rotation.z = rotation[2];
    }
  });

  const handleSelectedStep = (sceneID, stepPos, sceneRotation) => {
    props.onClickStep(sceneID, stepPos, sceneRotation);
  };

  return (
    <group ref={groupRef}>
      {/* <group> */}
      <mesh>
        <boxBufferGeometry attach="geometry" args={[1000, 1000, 1000]} />
        <meshBasicMaterial
          attach="material"
          side={THREE.BackSide}
          transparent
          visible={false}
        />
        {isStepVisible ? (
          <>
            {hotspots.map((step, index) => (
              <PlaneFixed
                key={index}
                step={step}
                handleSelectedStep={handleSelectedStep}
              />
            ))}
            {/* <PlaneMove boxWidth={1000} /> */}
          </>
        ) : null}
      </mesh>
    </group>
  );
}

export default SceneBox;
