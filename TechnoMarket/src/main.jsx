import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { NavBarProvider } from "./components/navBarContext/NavBarContext";
import { AuthenticationContextProvider } from "./services/authentication/Authentication.context.jsx";
import { DarkModeProvider } from "./services/DarkMode/DarkModeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
    <AuthenticationContextProvider>
      <NextUIProvider>
        <NavBarProvider>
          <App />
        </NavBarProvider>
      </NextUIProvider>
    </AuthenticationContextProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
