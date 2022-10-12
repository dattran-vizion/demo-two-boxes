import React, { useState } from "react";
import Scene from "./Scene";
import fakeData from "../assets/fakeData/data";

export default function SceneHandler() {
  const [scene, setScene] = useState("currentScene");
  const [sceneIndex, setSceneIndex] = useState(0);

  let firstScene, secondScene, firstAnimation, secondAnimation;

  firstScene = {
    sceneData: fakeData[sceneIndex],
    rotation: [0, 0, 0],
    args: [1100, 1100, 1100],
  };

  firstAnimation = {
    opacityStart: 1,
    opacityEnd: 0.3,
    scaleStart: 1,
    scaleEnd: 11 / 30,
  };

  secondScene = {
    sceneData: fakeData[sceneIndex + 1],
    rotation: [0, 0.85 * Math.PI, 0],
    args: [3000, 3000, 3000],
  };

  secondAnimation = {
    opacityStart: 0,
    opacityEnd: 1,
    scaleStart: 1,
    scaleEnd: 11 / 30,
  };

  const changeCurrentScene = () => {
    if (scene === "currentScene") {
      setScene("nextScene");
    }
  };

  return (
    <>
      {scene === "currentScene" ? (
        <Scene
          scene={firstScene}
          animation={firstAnimation}
          changeCurrentScene={changeCurrentScene}
        />
      ) : (
        <Scene
          scene={secondScene}
          animation={secondAnimation}
          changeCurrentScene={changeCurrentScene}
        />
      )}
    </>
  );
}
