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
        position: [-167.87249130830986, -173.0735480339165, -500.0],
        cameraPosition: [-167.87249130830986, -43.453156, -500.0],
        targetSceneCameraPosition: [500.0, 5.996534, -17.580930574409706],
      },
    ],
  },
  {
    id: "box2",
    images: [img7, img8, img9, img10, img11, img12],
    hotspots: [
      {
        sceneID: "box3",
        position: [500.0, -121.55864792966626, -17.580930574409706],
        cameraPosition: [500.0, 5.996534, -17.580930574409706],
        targetSceneCameraPosition: [-500.0, -126.04828, -168.2932307461213],
      },
      {
        sceneID: "box1",
        position: [-500, -152.83850785261572, 61.331952521377296],
        cameraPosition: [-500.0, 29.31803, 61.331952521377296],
        targetSceneCameraPosition: [167.87249130830986, -43.453156, 500.0],
      },
    ],
  },
  {
    id: "box3",
    images: [img13, img14, img15, img16, img17, img18],
    hotspots: [
      {
        sceneID: "box4",
        position: [-500, -307.33201296939046, -168.2932307461213],
        cameraPosition: [-500.0, -126.04828, -168.2932307461213],
        targetSceneCameraPosition: [20.394805615881594, -74.7302, 500.0],
      },
      {
        sceneID: "box2",
        position: [500, -174.3547387375109, 106.8793690686938],
        cameraPosition: [500.0, -52.06919, 106.8793690686938],
        targetSceneCameraPosition: [-500.0, 29.31803, 61.331952521377296],
      },
    ],
  },
  {
    id: "box4",
    images: [img19, img20, img21, img22, img23, img24],
    hotspots: [
      {
        sceneID: "box3",
        position: [315.8488058052147, -300.9371371367104, -500],
        cameraPosition: [315.8488058052147, -74.7302, -500.0],
        targetSceneCameraPosition: [500.0, -52.06919, 106.8793690686938],
      },
    ],
  },
  // {
  //   id: "box1",
  //   images: [img1, img2, img3, img4, img5, img6],
  //   hotspots: [
  //     {
  //       sceneID: "box2",
  //       position: [-155.98355, -168.04999, -500.0],
  //       cameraPosition: [-155.98355, 22.011068, -500.0],
  //       targetSceneCameraPosition: [500.0, 12.692094, -59.046127],
  //     },
  //   ],
  // },
  // {
  //   id: "box2",
  //   images: [img7, img8, img9, img10, img11, img12],
  //   hotspots: [
  //     {
  //       sceneID: "box3",
  //       position: [500.0, -137.89668, -21.096853],
  //       cameraPosition: [500.0, 42.119114, -21.096853],
  //       targetSceneCameraPosition: [-500.0, -21.345215, -106.83288],
  //     },
  //     {
  //       sceneID: "box1",
  //       position: [-500.0, -171.03731, 59.046127],
  //       cameraPosition: [-500.0, 12.692093, 59.046127],
  //       targetSceneCameraPosition: [155.98355, 22.011068, 500.0],
  //     },
  //   ],
  // },
  // {
  //   id: "box3",
  //   images: [img13, img14, img15, img16, img17, img18],
  //   hotspots: [
  //     {
  //       sceneID: "box4",
  //       position: [-500.0, -246.74951, -372.4612],
  //       cameraPosition: [-500.0, -15.891484, -372.4612],
  //       targetSceneCameraPosition: [-193.46892, -36.081318, 500.0],
  //     },
  //     {
  //       sceneID: "box2",
  //       position: [500.0, -137.89668, -21.096853],
  //       cameraPosition: [-500.0, -21.345215, -106.83288],
  //       targetSceneCameraPosition: [500.0, 42.119114, -21.096853],
  //     },
  //   ],
  // },
  // {
  //   id: "box4",
  //   images: [img19, img20, img21, img22, img23, img24],
  //   hotspots: [
  //     {
  //       sceneID: "box3",
  //       position: [-500.0, -246.74951, -372.4612],
  //       cameraPosition: [-193.46892, -36.081318, 500.0],
  //       targetSceneCameraPosition: [-500.0, -15.891484, -372.4612],
  //     },
  //   ],
  // },
];

export default fakeData;
