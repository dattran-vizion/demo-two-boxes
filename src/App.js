import ReactDOM from "react-dom";
import * as THREE from "three";
import React, { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";

// import Box from "./components/Box/Box";
import SceneHandler from "./components/SceneHandler";
import CurrentScene from "./components/currentScene";
import NextScene from "./components/nextScene";

import CameraController from "./components/CameraController";
import Scene from "./components/Scene";
import fakeData from "./assets/fakeData/data";

import "./styles.css";

export default function App() {
  const [idIndex, setIdIndex] = useState(0);
  const prevIndex = useRef(idIndex);

  return (
    <Canvas
      camera={{ position: [10, 0, 0], fov: 60, near: 10, far: 5000 }}
      // camera={{ position: [3000, 3000, 3000], fov: 60, near: 10, far: 5000 }}
    >
      <CameraController />
      <ambientLight />

      {/* <axesHelper args={[1200, 1200, 1200]} /> */}
      {/* <axesHelper args={[100, 100, 100]} /> */}

      <Suspense fallback={null}>
        {/* <CurrentScene
          opacityStart={1}
          opacityEnd={0.3}
          scaleStart={1}
          scaleEnd={11 / 30}
          images={fakeData[0].images}
          rotation={[0, 0, 0]}
          args={[1100, 1100, 1100]}
        />

        <NextScene
          opacityStart={0}
          opacityEnd={1}
          scaleStart={1}
          scaleEnd={30 / 11}
          images={fakeData[1].images}
          rotation={[0, 0.85 * Math.PI, 0]}
          args={[3000, 3000, 3000]}
        /> */}

        <SceneHandler />
      </Suspense>
    </Canvas>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
