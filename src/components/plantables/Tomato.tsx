import React from "react";
import tomato from "../../assets/tomato.png";
type Props = {};

const Tomato = (props: Props) => {
  return (
    <img
      src={tomato}
      width={"90%"}
      style={{ justifySelf: "center", alignSelf: "center" }}
    />
  );
};

export default Tomato;
