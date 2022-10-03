import React from "react";
import watermelon from "../../assets/watermelon.png";
type Props = {};

const Watermelon = (props: Props) => {
  return (
    <img
      src={watermelon}
      width={"90%"}
      style={{ justifySelf: "center", alignSelf: "center" }}
    />
  );
};

export default Watermelon;
