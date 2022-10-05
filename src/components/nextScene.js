import React from "react";

import Box from "./Box/Box";

const NextScene = ({
  start,
  end,
  opacityStart,
  opacityEnd,
  images,
  rotation,
  args,
  scaleStart,
  scaleEnd
}) => {
  return (
    <Box
      start={start}
      end={end}
      opacityStart={opacityStart}
      opacityEnd={opacityEnd}
      scaleStart={scaleStart}
      scaleEnd={scaleEnd}
      images={images}
      rotation={rotation}
      args={args}
    />
  );
};

export default NextScene;
