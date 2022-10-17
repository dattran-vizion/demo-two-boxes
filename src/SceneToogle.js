import React, { useCallback, useState } from "react";
// import * as THREE from "three";
// import { useThree } from "@react-three/fiber";

import SceneBox from "./SceneBox";

const SceneToggle = ({ scenes }) => {
  const [sceneA, setSceneA] = useState(scenes[0]);
  const [sceneB, setSceneB] = useState(null);

  const [showAnim, setShowAnim] = useState(true);
  const [currScene, setCurrentScene] = useState("sceneA");
  const [sceneAPos, setSceneAPos] = useState([0, 0, 0]);
  const [sceneBPos, setSceneBPos] = useState([0, 0, 0]);

  const handleClickStep = useCallback(
    (sceneID, stepPos) => {
      const targetScene = scenes.find((scene) => scene.id === sceneID);
      if (currScene === "sceneA") {
        setSceneBPos([...stepPos]);
        setSceneB(targetScene);
        setCurrentScene("sceneB");
      } else {
        setSceneAPos([...stepPos]);
        setSceneA(targetScene);
        setCurrentScene("sceneA");
      }
      setShowAnim(!showAnim);
    },
    [currScene, showAnim, scenes]
  );

  return (
    <>
      <SceneBox
        sceneData={sceneA}
        showAnim={showAnim}
        rotation={[0, 0, 0]}
        position={sceneAPos}
        positionNext={sceneBPos}
        onClickStep={handleClickStep}
      />
      {sceneB && (
        <SceneBox
          sceneData={sceneB}
          showAnim={!showAnim}
          rotation={[0, 0, 0]}
          position={sceneBPos}
          positionNext={sceneAPos}
          onClickStep={handleClickStep}
        />
      )}
    </>
  );
};

export default SceneToggle;
