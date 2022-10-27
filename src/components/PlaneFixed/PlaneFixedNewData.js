import React, { useMemo, useState, useRef, memo } from "react";
import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { degToRad, radToDeg } from "three/src/math/MathUtils";

import CircleFixed from "../../images/circleFixed.png";
import { useCallback } from "react";

const theOrigin = { x: 0, y: 0, z: 0 };
const theFirstCameraPosition = [-153.96278, -43.453156, -500.0];

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
  const { camera, scene } = useThree();
  const { sceneID, position, cameraPosition, targetSceneCameraPosition } = step;
  const [cameraPosX, cameraPosY, cameraPosZ] = cameraPosition;
  const [
    targetSceneCameraPositionX,
    targetSceneCameraPositionY,
    targetSceneCameraPositionZ,
  ] = targetSceneCameraPosition;
  const circleFixed = useLoader(TextureLoader, CircleFixed);

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
      const currViewpointVec = vector(theOrigin, {
        x: theFirstCameraPosition[0],
        y: theFirstCameraPosition[1],
        z: theFirstCameraPosition[2],
      });
      const stepViewpointVec = vector(theOrigin, {
        x: targetSceneCameraPositionX,
        y: targetSceneCameraPositionY,
        z: targetSceneCameraPositionZ,
      });
      const currVPVecOnXZ = {
        x: currViewpointVec.x,
        y: 0,
        z: currViewpointVec.z,
      };
      const currVPVecOnYZ = {
        x: 0,
        y: currViewpointVec.y,
        z: currViewpointVec.z,
      };
      const currVPVecOnXY = {
        x: currViewpointVec.x,
        y: currViewpointVec.y,
        z: 0,
      };
      const stepVPVecOnXZ = {
        x: stepViewpointVec.x,
        y: 0,
        z: stepViewpointVec.z,
      };
      const stepVPVecOnYZ = {
        x: 0,
        y: stepViewpointVec.y,
        z: stepViewpointVec.z,
      };
      const stepVPVecOnXY = {
        x: stepViewpointVec.x,
        y: stepViewpointVec.y,
        z: 0,
      };

      const crossProduct = getRotationDirection(currVPVecOnXZ, stepVPVecOnXZ);
      let sceneRotation_y = 0;

      // Use cross product to determine rotation direction.
      if (crossProduct.y < 0) {
        sceneRotation_y = Math.acos(
          cosTwoVectors(currVPVecOnXZ, stepVPVecOnXZ)
        );
      } else if (cosTwoVectors(currVPVecOnXZ, stepVPVecOnXZ) > 0) {
        sceneRotation_y = -Math.acos(
          cosTwoVectors(currVPVecOnXZ, stepVPVecOnXZ)
        );
      } else {
        console.log("Two vectors are parallel");
      }

      const sceneRotation = [0, sceneRotation_y, 0];
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
    <mesh
      onClick={onClick}
      rotation={[-Math.PI / 2, 0, angleRotaion]}
      position={position}
    >
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
