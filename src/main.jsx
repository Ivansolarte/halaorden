import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router";
import { AppRouter } from "./AppRouter.jsx";

const basename = import.meta.env.MODE === "production" ? "/halaorden" : "/";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
   <HashRouter basename="">
      <AppRouter/>
    </HashRouter>
);
