import img1 from "../../images/box1/px.png";
import img2 from "../../images/box1/nx.png";
import img3 from "../../images/box1/py.png";
import img4 from "../../images/box1/ny.png";
import img5 from "../../images/box1/pz.png";
import img6 from "../../images/box1/nz.png";

// import img1 from "../../images/Old/box1/px_1.jpg";
// import img2 from "../../images/Old/box1/nx_1.jpg";
// import img3 from "../../images/Old/box1/py_1.jpg";
// import img4 from "../../images/Old/box1/ny_1.jpg";
// import img5 from "../../images/Old/box1/pz_1.jpg";
// import img6 from "../../images/Old/box1/nz_1.jpg";

import img7 from "../../images/box2/px.png";
import img8 from "../../images/box2/nx.png";
import img9 from "../../images/box2/py.png";
import img10 from "../../images/box2/ny.png";
import img11 from "../../images/box2/pz.png";
import img12 from "../../images/box2/nz.png";

import img13 from "../../images/box3/px.png";
import img14 from "../../images/box3/nx.png";
import img15 from "../../images/box3/py.png";
import img16 from "../../images/box3/ny.png";
import img17 from "../../images/box3/pz.png";
import img18 from "../../images/box3/nz.png";

import { degToRad } from "three/src/math/MathUtils";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export const TexturesLoader = (images) => {
  return useLoader(TextureLoader, images);
};

const fakeData = [
  {
    id: "box1",
    images: [img1, img2, img3, img4, img5, img6],
    hotspots: [
      {
        sceneID: "box2",
        position: [-499, -120, -20],
        scale: 6,
        defaultRotation: [degToRad(-45), degToRad(300), 0],
        viewpoint: [-499, 0, -20],
      },
    ],
  },
  {
    id: "box2",
    images: [img7, img8, img9, img10, img11, img12],
    hotspots: [
      {
        sceneID: "box1",
        position: [-499, -200, 107],
        scale: 6,
        defaultRotation: [0, degToRad(-90), 0],
        viewpoint: [0, 0, 0],
      },
      {
        sceneID: "box3",
        position: [499, -216, -197],
        scale: 7,
        defaultRotation: [0, degToRad(180), 0],
        viewpoint: [0, 0, 0],
      },
    ],
  },
  {
    id: "box3",
    images: [img13, img14, img15, img16, img17, img18],
    hotspots: [
      {
        sceneID: "box2",
        position: [-360, -364, -499],
        scale: 8,
        defaultRotation: [0, degToRad(120), 0],
        viewpoint: [0, 0, 0],
      },
      {
        boxID: 3,
        position: [0, -499, 0],
        scale: 5,
        defaultRotation: [0, degToRad(15), 0],
        viewpoint: [0, 0, 0],
      },
    ],
  },
];

export default fakeData;
