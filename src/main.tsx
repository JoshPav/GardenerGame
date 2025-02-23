import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ApiContext, getApiInstance } from "./context/apiContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <ApiContext.Provider value={getApiInstance()}>
      <App />
    </ApiContext.Provider>
  </RecoilRoot>
);
