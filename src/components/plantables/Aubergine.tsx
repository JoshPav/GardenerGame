import React from "react";
import aubergine from "../../assets/aubergine.png";
type Props = {};

const Aubergine = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={aubergine} width={"90%"} />
    </div>
  );
};

export default Aubergine;
