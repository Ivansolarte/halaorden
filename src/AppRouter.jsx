import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import App from "./App";
import { LoginForm } from "./components/login/loginForm";
import { NotPage } from "./views/notPage";
import { StoreView } from "./views/store.view";
import { DashboardView } from "./views/dashboard.view";
import { Profile } from "./components/dashboar/profile/profile";
import { Product } from "./components/dashboar/products/product";
import { Users } from "./components/dashboar/users/users";
import { Stores } from "./components/dashboar/stores/stores";

export const AppRouter = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return JSON.parse(sessionStorage.getItem("login")) || false;
  });

  async function getPublicIP() {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      console.log(`http://${data.ip}:5173`);
    } catch (error) {
      console.error("Error al obtener la IP:", error);
    }
  }

  useEffect(() => {
    localStorage.clear();
    getPublicIP();
    const checkLogin = () => {
      setLoggedIn(JSON.parse(sessionStorage.getItem("login")) || false);
    };
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  return (
    <Routes>
      <Route path="/err" element={<NotPage />} />
      <Route path="/:store" element={<StoreView />} />

      {/* Redirigir si está logueado */}
      <Route
        path="/"
        element={loggedIn ? <Navigate to="/dashboard" /> : <App />}
      />
      <Route
        path="/login"
        element={
          loggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <LoginForm setLoggedIn={setLoggedIn} />
          )
        }
      />

      {/* Protegemos el Dashboard */}
      {loggedIn ? (
        <Route
          path="/dashboard/*"
          element={<DashboardView setLoggedIn={setLoggedIn} />}
        >
          <Route path="profile" element={<Profile />} />
          {/* <Route  path="profile" element={<p>perfil</p>} /> */}
          <Route path="products" element={<Product />} />
          <Route path="stores" element={<Stores />} />
          <Route path="users" element={<Users />} />
          <Route path="messages" element={<h2>mensajes</h2>} />
          <Route path="settings" element={<h2>Configuraciones</h2>} />
        </Route>
      ) : (
        <Route path="/dashboard/*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};
