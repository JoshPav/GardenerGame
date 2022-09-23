import { flexbox } from "@mui/system";
import React from "react";
import flower from "../../assets/flower.png";
type Props = {};

const Flower = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={flower} width={"90%"} />
    </div>
  );
};

export default Flower;
