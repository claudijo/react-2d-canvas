import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./examples/Basic.js";
// import App from "./examples/PanAndZoom.js";
const root = createRoot(document.getElementById("root"));
root.render(<App/>);