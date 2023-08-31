import React from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//This loads App.js which loads Dashboard page
const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
        <App />
  </BrowserRouter>
);