import React, { useCallback, useState } from "react";
import SceneBox from "./SceneBox";
import { ANIMS } from "./anims.const";

const SceneToggle = ({ scenes }) => {
  const [sceneA, setSceneA] = useState(scenes[0]);
  const [sceneB, setSceneB] = useState(null);
  const [animA, setAnimA] = useState(ANIMS.DEFAULT);
  const [animB, setAnimB] = useState(ANIMS.NONE);
  const [currScene, setCurrentScene] = useState("sceneA");
  const [showStep, setShowStep] = useState(true);

  const handleClickStep = useCallback(
    (sceneID) => {
      if (currScene === "sceneA") {
        // setAnimA(ANIMS.HIDE);
        // setAnimB(ANIMS.SHOW);
        setSceneB(scenes[sceneID]);
        setCurrentScene("sceneB");
        setShowStep(!showStep);
      } else {
        // setAnimA(ANIMS.SHOW);
        // setAnimB(ANIMS.HIDE);
        setSceneA(scenes[sceneID]);
        setCurrentScene("sceneA");
      }
    },
    [currScene]
  );

  return (
    <>
      <SceneBox
        sceneData={sceneA}
        anims={animA}
        onClickStep={handleClickStep}
        showStep={showStep}
      />
      {sceneB && (
        <SceneBox
          sceneData={sceneB}
          anims={animB}
          onClickStep={handleClickStep}
          showStep={!showStep}
        />
      )}
    </>
  );
};

export default SceneToggle;
