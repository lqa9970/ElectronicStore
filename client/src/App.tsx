import React from "react";
import logo from "./logo.svg";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Routings from "./Routes";
import ThemeProvider from "./context/theme-context";

import "./styles/style.scss";

const clientId =
  "629012642652-p7bi9mupqjphbdmkpgvdtga1dgqb83rj.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider>
        <Routings />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
