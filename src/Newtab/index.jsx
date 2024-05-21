import React from "react";
import { render } from "react-dom";

import Newtab from "./Newtab.jsx";
import "./index.css";

render(<Newtab />, window.document.querySelector("#app-container"));

if (module.hot) module.hot.accept();
