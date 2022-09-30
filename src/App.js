import ReactDOM from "react-dom";
import * as THREE from "three";
import React, { useEffect, Suspense } from "react";
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
    <Canvas
      // camera={{ position: [10, 0, 0], fov: 60, near: 10, far: 5000 }}
      camera={{ position: [2000, 2000, 2000], fov: 60, near: 10, far: 5000 }}
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
      <axesHelper args={[100, 100, 100]} />
      <Suspense fallback={null}>
        <Box
          start={[0, 0, 0]}
          end={[0, 0, 0]}
          opacityStart={1}
          opacityEnd={0}
          // visibleStart={true}
          // visibleEnd={false}
          visible={false}
          images={fakeData[0].images}
          rotation={[0, 0, 0]}
          args={[1100, 1100, 1100]}
        />
        <Box
          start={[-499, 0, 0]}
          end={[0, 0, 0]}
          opacityStart={0}
          opacityEnd={1}
          visible={true}
          // visibleStart={false}
          // visibleEnd={true}
          images={fakeData[1].images}
          rotation={[0, Math.PI, Math.PI / 4]}
          args={[1099, 1099, 1099]}
        />
      </Suspense>
    </Canvas>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
