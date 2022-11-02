import * as THREE from "three";
import { useMemo, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { SavePass } from "three/examples/jsm/postprocessing/SavePass";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";
import { BlendShader } from "three/examples/jsm/shaders/BlendShader";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

export function Effects() {
  const { scene, gl, size, camera } = useThree();
  const composer = useMemo(() => {
    // BEGIN vanilla Three.js
    const composer = new EffectComposer(gl);

    // Render pass
    const renderPass = new RenderPass(scene, camera);

    // Save pass
    const savePass = new SavePass(
      new THREE.WebGLRenderTarget(size.width, size.height)
    );

    // Blend pass
    const blendPass = new ShaderPass(BlendShader, "tDiffuse1");
    blendPass.uniforms["tDiffuse2"].value = savePass.renderTarget.texture;
    blendPass.uniforms["mixRatio"].value = 0.9;

    // Output pass
    const outputPass = new ShaderPass(CopyShader);
    composer.addPass(renderPass);
    composer.addPass(blendPass);
    composer.addPass(savePass);
    composer.addPass(outputPass);

    // END vanilla Three.js
    return composer;
  }, [camera, scene, gl, size]);

  useEffect(
    () => void composer.setSize(size.width, size.height),
    [size, composer]
  );

  useFrame(() => composer.render(), 1);
  return null;
}
