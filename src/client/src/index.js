import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CContainer } from "@coreui/react";
import { createRoot } from "react-dom/client";

import "@coreui/coreui/dist/css/coreui.min.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <CContainer>
//       <App />
//     </CContainer>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <CContainer>
      <App tab="home" />
    </CContainer>
  </React.StrictMode>
);
