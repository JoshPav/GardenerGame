import React from "react";
import pumpkin from "../../assets/pumpkin.png";
type Props = {};

const Pumpkin = (props: Props) => {
  return (
    <img
      src={pumpkin}
      width={"90%"}
      style={{ justifySelf: "center", alignSelf: "center" }}
    />
  );
};

export default Pumpkin;
