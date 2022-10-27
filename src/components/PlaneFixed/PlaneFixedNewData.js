import React, { useMemo, useState, useRef, memo } from "react";
import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { degToRad, radToDeg } from "three/src/math/MathUtils";

import CircleFixed from "../../images/circleFixed.png";
import { useCallback } from "react";

const theOrigin = { x: 0, y: 0, z: 0 };

function cosTwoVectors(a, b) {
  return (
    (a.x * b.x + a.y * b.y + a.z * b.z) /
    (Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2)) *
      Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2) + Math.pow(b.z, 2)))
  );
}

function vector(theFirst, theLast) {
  return {
    x: theLast.x - theFirst.x,
    y: theLast.y - theFirst.y,
    z: theLast.z - theFirst.z,
  };
}

function getRotationDirection(firstVector, lastVector) {
  return {
    x: firstVector.y * lastVector.z - firstVector.z * lastVector.y,
    y: firstVector.z * lastVector.x - firstVector.x * lastVector.z,
    z: firstVector.x * lastVector.y - firstVector.y * lastVector.x,
  };
}

function PlaneFixed({ step, handleSelectedStep }) {
  const rotationYRef = useRef(0);
  const { camera, scene } = useThree();
  const circleFixed = useLoader(TextureLoader, CircleFixed);
  const { sceneID, position, cameraPosition, targetSceneCameraPosition } = step;
  const [cameraPosX, cameraPosY, cameraPosZ] = cameraPosition;
  const [
    targetSceneCameraPositionX,
    targetSceneCameraPositionY,
    targetSceneCameraPositionZ,
  ] = targetSceneCameraPosition;

  // Determine the projection of the step on the xz plane of the coordinate of the box.
  const angleRotaion = useMemo(() => {
    const [stepX, stepY, stepZ] = position;
    const stepPoint = { x: stepX, y: stepY, z: stepZ };
    const vecToProjectionOfStepOnXZ = { ...stepPoint, y: 0 };
    const unitVectorZAxis = { x: 0, y: 0, z: 1 };
    const cosAngle = cosTwoVectors(vecToProjectionOfStepOnXZ, unitVectorZAxis);
    const angle = Math.acos(cosAngle);
    let angleRotate = 0;
    if (stepX < 0) {
      angleRotate = -angle + Math.PI;
    } else if (stepX > 0) {
      angleRotate = angle + Math.PI;
    } else if (stepX === 0) {
      if (stepZ > 0) {
        angleRotate = Math.PI;
      } else if (stepZ < 0) {
        angleRotate = 0;
      }
    }
    return angleRotate;
  }, [position]);

  const rotation = useMemo(
    () => [-Math.PI / 2, 0, angleRotaion],
    [angleRotaion]
  );

  const onClick = useCallback(
    (e) => {
      const cameraPosVec = vector(theOrigin, {
        x: cameraPosX,
        y: cameraPosY,
        z: cameraPosZ,
      });
      const targetSceneCamPos = vector(theOrigin, {
        x: targetSceneCameraPositionX,
        y: targetSceneCameraPositionY,
        z: targetSceneCameraPositionZ,
      });
      const camPosVec = {
        x: cameraPosVec.x,
        y: 0,
        z: cameraPosVec.z,
      };

      const stepVPVecOnXZ = {
        x: targetSceneCamPos.x,
        y: 0,
        z: targetSceneCamPos.z,
      };

      const crossProduct = getRotationDirection(camPosVec, stepVPVecOnXZ);
      console.log("crossProduct", crossProduct);

      let sceneRotation_y = 0;

      // Use cross product to determine rotation direction.
      if (crossProduct.y < 0) {
        sceneRotation_y = Math.acos(
          cosTwoVectors(camPosVec, stepVPVecOnXZ)
        );
      } else if (cosTwoVectors(camPosVec, stepVPVecOnXZ) > 0) {
        sceneRotation_y = -Math.acos(
          cosTwoVectors(camPosVec, stepVPVecOnXZ)
        );
      } else {
        console.log("Two vectors are parallel");
      }

      console.log("sceneRotation_y", radToDeg(sceneRotation_y));

      const sceneRotation = [0, rotationYRef.current + sceneRotation_y, 0];
      handleSelectedStep(sceneID, position, sceneRotation);
    },
    [
      handleSelectedStep,
      camera,
      scene,
      sceneID,
      position,
      targetSceneCameraPosition,
    ]
  );

  return (
    <mesh onClick={onClick} rotation={rotation} position={position}>
      {/* <axesHelper args={[100, 100, 100]} /> */}
      <planeBufferGeometry attach="geometry" args={[75, 75]} />
      <meshBasicMaterial
        attach="material"
        map={circleFixed}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
}

export default memo(PlaneFixed);
