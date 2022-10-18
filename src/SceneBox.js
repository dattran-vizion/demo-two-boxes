import React, { useState, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import { useThree, useLoader } from "@react-three/fiber";
import { gsap } from "gsap";
import PlaneFixed from "./components/PlaneFixed/PlaneFixed";
import PlaneMove from "./components/PlaneMove/PlaneMove";

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
    -1 * SCALE_VARIANTS.BIG,
    SCALE_VARIANTS.BIG,
    SCALE_VARIANTS.BIG
  ); // Texture reversed on the x axis

  // const gui = new GUI();
  // const sceneFolder = gui.addFolder("Scene");
  // sceneFolder.add(mesh.rotation, "x", -Math.PI, Math.PI, 0.01);
  // sceneFolder.add(mesh.rotation, "y", -Math.PI, Math.PI, 0.01);
  // sceneFolder.add(mesh.rotation, "z", -Math.PI, Math.PI, 0.01);
  // sceneFolder.open();
  return mesh;
};

const updateBox = (mesh, opacity, scale, position) => {
  if (scale !== undefined) {
    mesh.scale.set(-scale, scale, scale); // Texture reversed on the x axis
  }
  if (position !== undefined) {
    const [x, y, z] = position;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
  }
  if (opacity !== undefined) {
    mesh.material.forEach((m) => {
      m.opacity = opacity;
      m.needsUpdate = true;
    });
  }
};

// const updateBoxImages = (mesh, images) => {
//   mesh.material.forEach((m, index) => {
//     m.map = new THREE.TextureLoader().load(images[index]);
//     m.needsUpdate = true;
//   });
//   return mesh;
// };

function SceneBox({
  sceneData,
  showAnim,
  rotation,
  position,
  positionNext,
  ...props
}) {
  const meshRef = useRef();
  const { scene } = useThree();

  const images = sceneData.images;

  useEffect(() => {
    if (!meshRef.current) {
      meshRef.current = createBox(images, position, rotation);
      scene.add(meshRef.current);
    }
    // Update the pictures in the scene box
    // if (meshRef.current) {
    //   meshRef.current = updateBoxImages(meshRef.current, images);
    //   scene.add(meshRef.current);
    // }
    // gl.gammaOutput = true;
  }, [scene, images]);

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
        positionX: (position[0] * SCALE_VARIANTS.BIG) / 2 - 1,
        positionZ: (position[2] * SCALE_VARIANTS.BIG) / 2 - 1,
      };
      gsap.to(animData, {
        scale: SCALE_VARIANTS.DEFAULT,
        opacity: 1,
        positionX: 0,
        positionZ: 0,
        duration: 5,
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
        duration: 2,
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

  const hotspots = sceneData.hotspots;

  console.log("scene", scene);

  const handleSelectedStep = (sceneID, stepPos) => {
    console.log("clicked");
    props.onClickStep(sceneID, stepPos);
    console.log("done hide");
  };

  return (
    <group>
      {/* <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[1100, 1100, 1100]} />
        {textures.map((texture, index) => (
          <meshPhongMaterial
            key={index}
            attachArray="material"
            map={texture}
            side={THREE.DoubleSide}
            transparent
            opacity={1}
          />
        ))}
      </mesh> */}
      <mesh rotation={rotation}>
        <boxBufferGeometry attach="geometry" args={[1000, 1000, 1000]} />
        <meshBasicMaterial
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
