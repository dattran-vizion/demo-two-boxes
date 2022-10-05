import ReactDOM from "react-dom";
import * as THREE from "three";
import React, { useEffect, Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { OrbitControls } from "@react-three/drei";

import CurrentScene from "./components/currentScene";
import NextScene from "./components/nextScene";
import CameraController from "./components/CameraController";
import fakeData from "./assets/fakeData/data";

import "./styles.css";

export default function App() {
  const [showBox, setShowBox] = useState(true);
  return (
    <Canvas
      // camera={{ position: [10, 0, 0], fov: 60, near: 10, far: 5000 }}
      camera={{ position: [3000, 3000, 3000], fov: 60, near: 10, far: 5000 }}
    >
      <CameraController />
      <ambientLight />
      {/* <pointLight
        color={0xffffff}
        intensity={1}
        distance={1000}
        position={[0, 9, 0]}
      /> */}
      {/* <axesHelper args={[1200, 1200, 1200]} /> */}
      {/* <axesHelper args={[100, 100, 100]} /> */}
      <Suspense fallback={null}>
        {showBox && (
          <CurrentScene
            start={[0, 0, 0]}
            end={[0, 0, 0]}
            opacityStart={1}
            opacityEnd={0.3}
            scaleStart={1}
            scaleEnd={11 / 30}
            images={fakeData[0].images}
            rotation={[0, 0, 0]}
            args={[1100, 1100, 1100]}
            setShowBox={setShowBox}
          />
        )}
        <NextScene
          start={[-499, 0, 0]}
          end={[0, 0, 0]}
          opacityStart={0}
          opacityEnd={1}
          scaleStart={1}
          scaleEnd={11 / 30}
          images={fakeData[1].images}
          rotation={[0, 0.85 * Math.PI, 0]}
          args={[3000, 3000, 3000]}
        />
      </Suspense>
    </Canvas>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
