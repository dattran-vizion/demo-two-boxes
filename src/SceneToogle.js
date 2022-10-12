import React, { useCallback, useState } from "react";
import SceneBox from "./SceneBox";
import { ANIMS } from "./anims.const";

const SceneToggle = ({ scenes }) => {
  const [sceneA, setSceneA] = useState(scenes[0]);
  const [sceneB, setSceneB] = useState(null);
  // const [animA, setAnimA] = useState(ANIMS.DEFAULT);
  // const [animB, setAnimB] = useState(ANIMS.NONE);
  const [showAnim, setShowAnim] = useState(true);
  const [currScene, setCurrentScene] = useState("sceneA");
  const handleClickStep = useCallback(
    (sceneID) => {
      const targetScene = scenes.find((scene) => scene.id === sceneID);
      setShowAnim(!showAnim);
      if (currScene === "sceneA") {
        // setAnimA(ANIMS.HIDE);
        // setAnimB(ANIMS.SHOW);
        setSceneB(targetScene);
        setCurrentScene("sceneB");
      } else {
        // setAnimA(ANIMS.SHOW);
        // setAnimB(ANIMS.HIDE);
        setSceneA(targetScene);
        setCurrentScene("sceneA");
      }
    },
    [currScene, showAnim, scenes]
  );

  return (
    <>
      <SceneBox
        sceneData={sceneA}
        showAnim={showAnim}
        onClickStep={handleClickStep}
      />
      {sceneB && (
        <SceneBox
          sceneData={sceneB}
          showAnim={!showAnim}
          onClickStep={handleClickStep}
        />
      )}
    </>
  );
};

export default SceneToggle;
