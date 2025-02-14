import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { LoginForm } from "./components/login/loginForm.jsx";
import { NotPage } from "./views/notPage.jsx";
import { StoreView } from "./views/store.view.jsx";
import { AppRouter } from "./AppRouter.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
   <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
);
