import ReactDOM from "react-dom";
import * as THREE from "three";
import React, { useEffect, Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { OrbitControls } from "@react-three/drei";

import Box from "./components/Box/Box";
import CameraController from "./components/CameraController";
import fakeData from "./assets/fakeData/data";

import "./styles.css";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 9, 0], fov: 50, near: 0.01, far: 10000 }}>
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
        <Box
          position={[0, 0, 0]}
          images={fakeData[0].images}
          rotation={[0, 0, 0]}
          args={[1100, 1100, 1100]}
        />
      </Suspense>
    </Canvas>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
