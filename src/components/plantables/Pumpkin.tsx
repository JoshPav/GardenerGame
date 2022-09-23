import React from "react";
import pumpkin from "../../assets/pumpkin.png";
type Props = {};

const Pumpkin = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={pumpkin} width={"90%"} />
    </div>
  );
};

export default Pumpkin;
