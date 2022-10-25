import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";

function Box({ isBig, ...props }) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //   useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={isBig ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      {isBig ? (
        <>
          <meshStandardMaterial attachArray="material" color="red" />
          // <meshStandardMaterial attachArray="material" color="yellow" />
          // <meshStandardMaterial attachArray="material" color="green" />
          // <meshStandardMaterial attachArray="material" color="green" />
          // <meshStandardMaterial attachArray="material" color="pink" />
          // <meshStandardMaterial attachArray="material" color="white" />
        </>
      ) : (
        <meshStandardMaterial color={"orange"} />
      )}
    </mesh>
  );
}

const TestGroup = () => {
  const groupRef = useRef();
  const posRef = useRef([-1.2, 0, 0]);
  const [pos, stepPosition] = useState([-1.2, 0, 0]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.01;
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.z += 0.01;
    }
  });

  //   useEffect(() => {
  //     setInterval(() => {
  //       posRef.current = [
  //         posRef.current[0] - 0.1,
  //         posRef.current[1],
  //         posRef.current[2],
  //       ];
  //       stepPosition([posRef.current[0], posRef.current[1], posRef.current[2]]);
  //     }, 100);
  //   }, []);

  return (
    <group rotation={[0, 0, 0]} ref={groupRef}>
      <Box position={pos} />
      <Box position={[1.2, 0, 0]} isBig={true} />
    </group>
  );

  //   return (
  //     <group position={[0, 0, 0]} ref={groupRef}>
  //       <mesh position={[0, 0, 0]}>
  //         <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
  //         {/* <meshStandardMaterial attach="material" color="red" /> */}
  //         <meshStandardMaterial attachArray="material" color="red" />
  //         <meshStandardMaterial attachArray="material" color="yellow" />
  //         <meshStandardMaterial attachArray="material" color="green" />
  //         <meshStandardMaterial attachArray="material" color="green" />
  //         <meshStandardMaterial attachArray="material" color="pink" />
  //         <meshStandardMaterial attachArray="material" color="white" />
  //       </mesh>
  //       <mesh position={[5.5, 0, 0]}>
  //         <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
  //         <meshStandardMaterial attach="material" color="blue" />
  //       </mesh>
  //     </group>
  //   );
};

export default TestGroup;
