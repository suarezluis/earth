import React, { useEffect, useState } from "react";
import styled from "styled-components";

type Props = { data: any[] | undefined; isEnhanced: boolean };

const Animation = ({ data, isEnhanced }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);

  const { imageURL, date, dscovr_j2000_position, caption } = data?.[
    currentImage
  ] || {
    imageURL: "",
    date: "",
    dscovr_j2000_position: { z: 0 },
    caption: "",
  };

  useEffect(() => {
    if (!data) return;
    const interval = setInterval(() => {
      setCurrentImage((currentImage) =>
        currentImage < data.length - 1 ? currentImage + 1 : 0
      );
    }, 700);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div>
      <DataBox>
        <p>Date: {new Date(date + "z").toLocaleDateString()}</p>
        <p>Time: {new Date(date + "z").toLocaleTimeString()}</p>
        <p>
          Alt {(dscovr_j2000_position.z / 10000 / 1.6).toFixed(2)} 10^6 miles
        </p>
      </DataBox>

      <EarthImage
        src={
          isEnhanced
            ? imageURL
                .replace("natural", "enhanced")
                .replace("epic_1b_", "epic_RGB_")
            : imageURL
        }
        alt=""
      />
    </div>
  );
};

export default Animation;

const DataBox = styled.div`
  position: absolute;
  color: green;
  font-size: 1.5vh;
  font-family: monospace;
  top: 10px;
  left: 10px;
`;

const EarthImage = styled.img`
  max-width: 130vw;
  max-height: 130vh;
  object-fit: cover;
  aspect-ratio: auto 1 / 1;
`;
