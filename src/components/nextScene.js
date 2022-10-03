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
}) => {
  return (
    <Box
      start={start}
      end={end}
      opacityStart={opacityStart}
      opacityEnd={opacityEnd}
      images={images}
      rotation={rotation}
      args={args}
    />
  );
};

export default NextScene;
