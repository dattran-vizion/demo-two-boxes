import React, { useMemo, memo } from "react";
import { DoubleSide } from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

import CircleFixed from "../../images/circleFixed.png";
import { useCallback } from "react";

function PlaneFixed({ hotspot, handleSelectedStep }) {
  const { sceneID, position } = hotspot;

  // Determine the projection of the step on the xz plane of the coordinate of the box.
  const angleRotaion = useMemo(() => {
    const [stepX, stepY, stepZ] = position;
    // const projectionOfStepOnXZPlane = [stepX, 0, stepZ];
    const vectorToProjectionOfStepOnXZPlane = { x: stepX, y: 0, z: stepZ };
    const unitVectorZAxis = { x: 0, y: 0, z: 1 };

    const cosTwoVectors =
      (stepX * 0 + stepY * 0 + stepZ * 1) /
      (Math.sqrt(
        Math.pow(vectorToProjectionOfStepOnXZPlane.x, 2) +
          Math.pow(vectorToProjectionOfStepOnXZPlane.y, 2) +
          Math.pow(vectorToProjectionOfStepOnXZPlane.z, 2)
      ) *
        Math.sqrt(
          Math.pow(unitVectorZAxis.x, 2) +
            Math.pow(unitVectorZAxis.y, 2) +
            Math.pow(unitVectorZAxis.z, 2)
        ));

    const angle = Math.acos(cosTwoVectors);
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

  const circleFixed = useLoader(TextureLoader, CircleFixed);

  const onClick = useCallback(
    (e) => {
      console.log(e);
      handleSelectedStep(sceneID, position);
    },
    [handleSelectedStep, sceneID, position]
  );

  return (
    <mesh onClick={onClick} rotation={rotation} position={position}>
      {/* <axesHelper args={[100, 100, 100]} /> */}
      <planeBufferGeometry attach="geometry" args={[75, 75]} />
      <meshBasicMaterial
        attach="material"
        map={circleFixed}
        side={DoubleSide}
        transparent={true}
      />
    </mesh>
  );
}

export default memo(PlaneFixed);
