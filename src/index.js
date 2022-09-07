import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import { AlertProvider } from "./contexts/AlertProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { SocialLoginProvider } from "./contexts/SocialLoginProvider";

import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <SocialLoginProvider>
        <AlertProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AlertProvider>
      </SocialLoginProvider>
    </AuthProvider>
  </BrowserRouter>
);
