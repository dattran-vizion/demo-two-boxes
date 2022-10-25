import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import SceneToggle from "./SceneToogle.js";

import CameraController from "./components/CameraController";
import fakeData from "./assets/fakeData/data";

import "./styles.css";
import TestGroup from "./Test";

export default function App() {
  return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 60, near: 0.1, far: 15000 }}
      // camera={{ position: [3000, 3000, 3000], fov: 60, near: 10, far: 15000 }}
    >
      <CameraController />
      <ambientLight intensity={0.8} />
      <axesHelper args={[100, 100, 100]} />
      {/* <Suspense fallback={null}>
        <SceneToggle scenes={fakeData} />
      </Suspense> */}
      <Suspense fallback={null}>
        <TestGroup />
      </Suspense>
    </Canvas>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
