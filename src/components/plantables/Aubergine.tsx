import React from "react";
import aubergine from "../../assets/aubergine.png";
type Props = {};

const Aubergine = (props: Props) => {
  return (
    <img
      src={aubergine}
      width={"90%"}
      style={{ justifySelf: "center", alignSelf: "center" }}
    />
  );
};

export default Aubergine;
