import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { NavBarProvider } from "./components/navBarContext/NavBarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <NavBarProvider>
        <App />
      </NavBarProvider>
    </NextUIProvider>
  </React.StrictMode>
);
