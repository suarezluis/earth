import React, { useEffect, useState } from "react";
import Animation from "./components/Animation";
import styled from "styled-components";

enum ImageVersion {
  Natural = "natural",
  Enhanced = "enhanced",
}
setTimeout(() => {
  window.location.reload();
}, 1000 * 60 * 60);

const fetchEarth = async (imageVersion: ImageVersion) => {
  const responseAll = await fetch(
    `https://epic.gsfc.nasa.gov/api/${imageVersion}/all`
  );
  const all = await responseAll.json();

  const dates = [all[0].date, all[1].date];
  let dataList: any[] = [];
  for (const date of dates) {
    const [year, month, day] = date.split("-");
    const response = await fetch(
      `https://epic.gsfc.nasa.gov/api/${imageVersion}/date/${year}-${month}-${day}`
    );
    const data = await response.json();
    data.forEach((element: any) => {
      const [year, month, day] = element.date.split(" ")[0].split("-");
      element.imageURL = `https://epic.gsfc.nasa.gov/archive/${imageVersion}/${year}/${month}/${day}/png/${element.image}.png`;
    });
    dataList.push(...data);
  }
  //return first 13 images
  return dataList.splice(0, 13);
};

function App() {
  const [earthData, setEarthData] = useState<IImage[] | undefined>(undefined);
  useEffect(() => {
    fetchEarth(ImageVersion.Natural).then((data) => {
      setEarthData(data);
    });
  }, []);

  return (
    <AppContainer className="App">
      <Animation
        data={earthData}
        isEnhanced={window.location.hash === "#enhanced"}
      />
      <LastUpdatedAt>
        Last Updated at {new Date().toLocaleTimeString()}
      </LastUpdatedAt>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  overflow: hidden;
`;

const LastUpdatedAt = styled.div`
  color: green;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px;
`;
interface ICoords {
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
  dscovr_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  lunar_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  sun_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  attitude_quaternions: {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
  };
}

interface IImage {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
  dscovr_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  lunar_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  sun_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  attitude_quaternions: {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
  };
  date: string;
  coords: ICoords;
  imageURL: string;
}
