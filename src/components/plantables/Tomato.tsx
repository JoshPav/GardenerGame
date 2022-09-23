import React from "react";
import tomato from "../../assets/tomato.png";
type Props = {};

const Tomato = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={tomato} width={"90%"} />
    </div>
  );
};

export default Tomato;
