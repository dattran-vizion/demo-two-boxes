import React, { useMemo, useState, useRef, memo } from "react";
import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { degToRad, radToDeg } from "three/src/math/MathUtils";

import CircleFixed from "../../images/circleFixed.png";
import { useCallback } from "react";

const raycaster = new THREE.Raycaster();
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

function PlaneFixed({ step, handleSelectedStep }) {
  const { camera, scene } = useThree();
  const { sceneID, position, viewpoint } = step;
  const [viewpointX, viewpointY, viewpointZ] = viewpoint;
  const circleFixed = useLoader(TextureLoader, CircleFixed);

  // Determine the projection of the step on the xz plane of the coordinate of the box.
  const angleRotaion = useMemo(() => {
    const [stepX, stepY, stepZ] = position;
    const stepPoint = { x: stepX, y: stepY, z: stepZ };
    const vecToProjectionOfStepOnXZ = vector(theOrigin, stepPoint);
    const unitVectorZAxis = vector(theOrigin, { x: 0, y: 0, z: 1 });
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

  function getCurrViewPoint(camera, scene) {
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    console.log("intersects", intersects);
    return {
      x: intersects[0].point.x,
      y: intersects[0].point.y,
      z: intersects[0].point.z,
    };
  }

  const onClick = useCallback(
    (e) => {
      const currVP = getCurrViewPoint(camera, scene);
      const currViewpointVec = vector(theOrigin, currVP);
      const stepViewpointVec = vector(theOrigin, {
        x: viewpointX,
        y: viewpointY,
        z: viewpointZ,
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
      const sceneRotation_x = Math.acos(
        cosTwoVectors(currVPVecOnYZ, stepVPVecOnYZ)
      );

      console.log("sceneRotation_x", radToDeg(sceneRotation_x));

      const sceneRotation_y = Math.acos(
        cosTwoVectors(currVPVecOnXZ, stepVPVecOnXZ)
      );

      console.log("sceneRotation_y", radToDeg(sceneRotation_y));

      const sceneRotation_z = Math.acos(
        cosTwoVectors(currVPVecOnXY, stepVPVecOnXY)
      );

      console.log("sceneRotation_z", radToDeg(sceneRotation_z));

      const sceneRotation = [0, -sceneRotation_y, 0];
      handleSelectedStep(sceneID, position, sceneRotation);
    },
    [handleSelectedStep, camera, scene, sceneID, position, viewpoint]
  );

  return (
    <mesh onClick={onClick} rotation={rotation} position={position}>
      <axesHelper args={[100, 100, 100]} />
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
