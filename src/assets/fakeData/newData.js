import img1 from "../../images/NewData/box1/px.jpg";
import img2 from "../../images/NewData/box1/nx.jpg";
import img3 from "../../images/NewData/box1/py.jpg";
import img4 from "../../images/NewData/box1/ny.jpg";
import img5 from "../../images/NewData/box1/pz.jpg";
import img6 from "../../images/NewData/box1/nz.jpg";

import img7 from "../../images/NewData/box2/px.jpg";
import img8 from "../../images/NewData/box2/nx.jpg";
import img9 from "../../images/NewData/box2/py.jpg";
import img10 from "../../images/NewData/box2/ny.jpg";
import img11 from "../../images/NewData/box2/pz.jpg";
import img12 from "../../images/NewData/box2/nz.jpg";

import img13 from "../../images/NewData/box3/px.jpg";
import img14 from "../../images/NewData/box3/nx.jpg";
import img15 from "../../images/NewData/box3/py.jpg";
import img16 from "../../images/NewData/box3/ny.jpg";
import img17 from "../../images/NewData/box3/pz.jpg";
import img18 from "../../images/NewData/box3/nz.jpg";

import img19 from "../../images/NewData/box4/px.jpg";
import img20 from "../../images/NewData/box4/nx.jpg";
import img21 from "../../images/NewData/box4/py.jpg";
import img22 from "../../images/NewData/box4/ny.jpg";
import img23 from "../../images/NewData/box4/pz.jpg";
import img24 from "../../images/NewData/box4/nz.jpg";

// import { degToRad } from "three/src/math/MathUtils";
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
        position: [-153.96278, -243.14316, -500.0],
        cameraPosition: [-153.96278, -43.453156, -500.0],
        targetSceneCameraPosition: [500.0, 5.996534, -39.35343],
      },
    ],
  },
  {
    id: "box2",
    images: [img7, img8, img9, img10, img11, img12],
    hotspots: [
      // {
      //   sceneID: "box1",
      //   position: [-153.96278, -243.14316, -500.0],
      //   cameraPosition: [500.0, 5.996534, -39.35343],
      //   targetSceneCameraPosition: [-153.96278, -43.453156, -500.0],
      // },
      {
        sceneID: "box3",
        position: [500.0, -151.67587, -21.299591],
        cameraPosition: [500.0, 29.31803, -21.299591],
        targetSceneCameraPosition: [-500.0, -52.06919, -116.356995],
      },
    ],
  },
  {
    id: "box3",
    images: [img13, img14, img15, img16, img17, img18],
    hotspots: [
      // {
      //   sceneID: "box2",
      //   position: [500.0, -151.67587, -21.299591],
      //   cameraPosition: [-500.0, -52.06919, -116.356995],
      //   targetSceneCameraPosition: [500.0, 29.31803, -21.299591],
      // },
      {
        sceneID: "box4",
        position: [-500.0, -380.02744, -359.56024],
        cameraPosition: [-500.0, -126.04828, -359.56024],
        targetSceneCameraPosition: [-315.1449, -74.7302, 500.0],
      },
    ],
  },
  {
    id: "box4",
    images: [img19, img20, img21, img22, img23, img24],
    hotspots: [
      // {
      //   sceneID: "box3",
      //   position: [-500.0, -380.02744, -359.56024],
      //   cameraPosition: [-315.1449, -74.7302, 500.0],
      //   targetSceneCameraPosition: [-500.0, -126.04828, -359.56024],
      // },
    ],
  },
];

export default fakeData;
