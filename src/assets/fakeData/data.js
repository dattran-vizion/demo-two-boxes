import img1 from "../../images/box1/px.png";
import img2 from "../../images/box1/nx.png";
import img3 from "../../images/box1/py.png";
import img4 from "../../images/box1/ny.png";
import img5 from "../../images/box1/pz.png";
import img6 from "../../images/box1/nz.png";

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

import img19 from "../../images/box4/px.png";
import img20 from "../../images/box4/nx.png";
import img21 from "../../images/box4/py.png";
import img22 from "../../images/box4/ny.png";
import img23 from "../../images/box4/pz.png";
import img24 from "../../images/box4/nz.png";

import img25 from "../../images/box5/px.png";
import img26 from "../../images/box5/nx.png";
import img27 from "../../images/box5/py.png";
import img28 from "../../images/box5/ny.png";
import img29 from "../../images/box5/pz.png";
import img30 from "../../images/box5/nz.png";

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
        position: [499, -250, 190],
        // defaultRotation: [degToRad(-45), degToRad(300), 0],
        viewpoint: [-23, 26, -550],
      },
    ],
  },
  {
    id: "box2",
    images: [img7, img8, img9, img10, img11, img12],
    hotspots: [
      {
        sceneID: "box1",
        position: [-350, -300, 500],
        // defaultRotation: [0, degToRad(-90), 0],
        viewpoint: [-550, 20, -138],
      },
      {
        sceneID: "box3",
        position: [0, -100, -500],
        // defaultRotation: [0, degToRad(180), 0],
        viewpoint: [-451, -137, -550],
      },
    ],
  },
  {
    id: "box3",
    images: [img13, img14, img15, img16, img17, img18],
    hotspots: [
      {
        sceneID: "box2",
        position: [-100, -300, 500],
        // defaultRotation: [0, degToRad(120), 0],
        viewpoint: [-139, -91, 550],
      },
      {
        sceneID: "box4",
        position: [-350, -300, -300],
        // defaultRotation: [0, degToRad(120), 0],
        viewpoint: [-315, -97, -550],
      },
    ],
  },
  {
    id: "box4",
    images: [img19, img20, img21, img22, img23, img24],
    hotspots: [
      {
        sceneID: "box3",
        position: [500, -450, 500],
        // defaultRotation: [0, degToRad(120), 0],
        viewpoint: [20, -226, 550],
      },
      {
        sceneID: "box5",
        position: [-160, -200, -500],
        // defaultRotation: [0, degToRad(120), 0],
        viewpoint: [-550, -50, -442],
      },
    ],
  },
  {
    id: "box5",
    images: [img25, img26, img27, img28, img29, img30],
    hotspots: [
      {
        sceneID: "box4",
        position: [500, -250, 500],
        // defaultRotation: [0, degToRad(120), 0],
        viewpoint: [550, -134, 549],
      },
    ],
  },
];

export default fakeData;
