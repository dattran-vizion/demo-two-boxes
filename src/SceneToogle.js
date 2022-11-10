import React, { useCallback, useState, useRef } from "react";
import { useEffect } from "react";
// import * as THREE from "three";
// import { useThree } from "@react-three/fiber";

// import SceneBox from "./SceneBox";
import SceneBox from "./SceneBoxNewData";

const SceneToggle = ({ scenes, handleClick }) => {
  // const SceneToggle = ({ scenes }) => {
  const [sceneA, setSceneA] = useState(scenes[0]);
  const [sceneB, setSceneB] = useState(null);

  const [showAnim, setShowAnim] = useState(true);
  const [currScene, setCurrentScene] = useState("sceneA");
  const [sceneAPos, setSceneAPos] = useState([0, 0, 0]);
  const [sceneBPos, setSceneBPos] = useState([0, 0, 0]);
  const [sceneARotation, setSceneARotation] = useState([0, 0, 0]);
  const [sceneBRotation, setSceneBRotation] = useState(null);
  const [currRotation, setCurrRotation] = useState(0);
  const prevRotation = useRef(null);

  useEffect(() => {
    prevRotation.current = currRotation;
  }, [currRotation]);

  const handleClickStep = useCallback(
    (sceneID, stepPos, sceneRotation) => {
      const targetScene = scenes.find((scene) => scene.id === sceneID);
      if (currScene === "sceneA") {
        setSceneBPos([...stepPos]);
        setSceneB(targetScene);
        setCurrentScene("sceneB");
        setCurrRotation(sceneRotation[1]);
        setSceneBRotation(sceneRotation);
      } else {
        setSceneAPos([...stepPos]);
        setSceneA(targetScene);
        setCurrentScene("sceneA");
        setCurrRotation(sceneRotation[1]);
        setSceneARotation(sceneRotation);
      }
      setShowAnim(!showAnim);
      // handleClick();
    },
    [currScene, showAnim, scenes]
  );

  return (
    <>
      <SceneBox
        sceneData={sceneA}
        showAnim={showAnim}
        rotation={sceneARotation}
        prevRotation={prevRotation.current}
        position={sceneAPos}
        positionNext={sceneBPos}
        onClickStep={handleClickStep}
      />
      {sceneB && (
        <SceneBox
          sceneData={sceneB}
          showAnim={!showAnim}
          rotation={sceneBRotation}
          prevRotation={prevRotation.current}
          position={sceneBPos}
          positionNext={sceneAPos}
          onClickStep={handleClickStep}
        />
      )}
    </>
  );
};

export default SceneToggle;
