import ReactDOM from "react-dom";
import * as THREE from "three";
import React, { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import SceneToggle from "./SceneToogle.js";

import CameraController from "./components/CameraController";
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
      <Suspense fallback={null}>
        <SceneToggle scenes={fakeData} />
      </Suspense>
    </Canvas>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
