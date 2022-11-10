import ReactDOM from "react-dom";
import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import SceneToggle from "./SceneToogle";

import CameraController from "./components/CameraController";
import fakeData from "./assets/fakeData/newData";
import { Effects } from "./Effects";
// import fakeData from "./assets/fakeData/data";

import "./styles.css";

export default function App() {
  const [stepCliked, setStepCliked] = useState(false);
  const timerRef = useRef(null);

  const handleClick = () => {
    setStepCliked(true);
    timerRef.current = setTimeout(() => {
      setStepCliked(false);
    }, 1500);
  };

  useEffect(() => {
    // Clear the interval when the component unmounts
    timerRef.current && clearTimeout(timerRef.current);
    // return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 60, near: 0.1, far: 15000 }}
      // camera={{ position: [3000, 3000, 3000], fov: 60, near: 10, far: 15000 }}
      // camera={{ position: [0, 3000, 0], fov: 60, near: 10, far: 15000 }}
    >
      <CameraController />
      <ambientLight intensity={0.8} />
      {/* <axesHelper args={[100, 100, 100]} /> */}
      <Suspense fallback={null}>
        <SceneToggle scenes={fakeData} handleClick={handleClick} />
        {/* <SceneToggle scenes={fakeData} /> */}
      </Suspense>
      <Effects active={stepCliked} />
    </Canvas>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
