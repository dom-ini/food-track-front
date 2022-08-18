import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import { AlertProvider } from "./contexts/AlertProvider";
import { AuthProvider } from "./contexts/AuthProvider";

import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <AlertProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AlertProvider>
    </AuthProvider>
  </BrowserRouter>
);
