import React, { useMemo, useState, useRef, memo } from "react";
import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

import CircleFixed from "../../images/circleFixed.png";
import { useCallback } from "react";

const theOrigin = { x: 0, y: 0, z: 0 };

function getCrossProductTwoVectors(firstVector, lastVector) {
  return {
    x: firstVector.y * lastVector.z - firstVector.z * lastVector.y,
    y: firstVector.z * lastVector.x - firstVector.x * lastVector.z,
    z: firstVector.x * lastVector.y - firstVector.y * lastVector.x,
  };
}

function cosTwoVectors(a, b) {
  return (
    (a.x * b.x + a.y * b.y + a.z * b.z) /
    (Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2)) *
      Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2) + Math.pow(b.z, 2)))
  );
}

function calculateAngleBetweenVectors(a, b) {
  const cosAngle = cosTwoVectors(a, b);
  const angle = Math.acos(cosAngle);
  return angle;
}

function vector(theFirst, theLast) {
  return {
    x: theLast.x - theFirst.x,
    y: theLast.y - theFirst.y,
    z: theLast.z - theFirst.z,
  };
}

let rotationYPrev = 0;

function PlaneFixed({ step, handleSelectedStep }) {
  const { camera, scene } = useThree();
  const circleFixed = useLoader(TextureLoader, CircleFixed);
  const { sceneID, position, cameraPosition, targetSceneCameraPosition } = step;
  const [stepX, stepY, stepZ] = position;
  const [cameraPosX, cameraPosY, cameraPosZ] = cameraPosition;
  const [
    targetSceneCameraPositionX,
    targetSceneCameraPositionY,
    targetSceneCameraPositionZ,
  ] = targetSceneCameraPosition;

  // Determine the projection of the step on the xz plane of the coordinate of the box.
  const angleRotaion = useMemo(() => {
    const stepPoint = { x: stepX, y: stepY, z: stepZ };
    const vecToProjectionOfStepOnXZ = { ...stepPoint, y: 0 };
    const unitVectorZAxis = { x: 0, y: 0, z: 1 };
    const angle = calculateAngleBetweenVectors(
      vecToProjectionOfStepOnXZ,
      unitVectorZAxis
    );
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
      const camPosVec = {
        x: cameraPosX,
        y: 0,
        z: cameraPosZ,
      };

      const stepVPVecOnXZ = {
        x: targetSceneCameraPositionX,
        y: 0,
        z: targetSceneCameraPositionZ,
      };

      const crossProduct = getCrossProductTwoVectors(camPosVec, stepVPVecOnXZ);
      let sceneRotation_y = Math.acos(cosTwoVectors(camPosVec, stepVPVecOnXZ));

      // Use cross product to determine rotation direction.
      if (crossProduct.y < 0) {
        sceneRotation_y = Math.acos(cosTwoVectors(camPosVec, stepVPVecOnXZ));
      } else if (crossProduct.y > 0) {
        sceneRotation_y = -Math.acos(cosTwoVectors(camPosVec, stepVPVecOnXZ));
      } else {
        console.log("Two vectors are parallel");
      }

      rotationYPrev += sceneRotation_y;
      const sceneRotation = [0, rotationYPrev, 0];
      handleSelectedStep(sceneID, position, sceneRotation);
    },
    [
      handleSelectedStep,
      camera,
      scene,
      sceneID,
      position,
      targetSceneCameraPosition,
      cameraPosX,
      cameraPosY,
      cameraPosZ,
      targetSceneCameraPositionX,
      targetSceneCameraPositionY,
      targetSceneCameraPositionZ,
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
