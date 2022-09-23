import React from "react";
import watermelon from "../../assets/watermelon.png";
type Props = {};

const Watermelon = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={watermelon} width={"90%"} />
    </div>
  );
};

export default Watermelon;
