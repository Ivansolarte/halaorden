import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { AppRouter } from "./AppRouter.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
   <BrowserRouter basename="/your_store_frontend">
      <AppRouter/>
    </BrowserRouter>
);
