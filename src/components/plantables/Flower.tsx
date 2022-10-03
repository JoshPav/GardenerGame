import { flexbox } from "@mui/system";
import React from "react";
import flower from "../../assets/flower.png";
type Props = {};

const Flower = (props: Props) => {
  return (
    <img
      src={flower}
      width={"90%"}
      style={{ justifySelf: "center", alignSelf: "center" }}
    />
  );
};

export default Flower;
