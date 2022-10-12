import React from "react";

import Box from "./Box/Box";

const CurrentScene = ({
  start,
  end,
  opacityStart,
  opacityEnd,
  images,
  rotation,
  setShowBox,
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
      setShowBox={setShowBox}
    />
  );
};

export default CurrentScene;


