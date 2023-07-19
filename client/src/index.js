import React from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
        <App />
  </BrowserRouter>
);

// app.listen(process.env.PORT, () => console.log('app is running'));