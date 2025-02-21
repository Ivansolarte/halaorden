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

import { useLogin } from "./store/login";

export const AppRouter = () => {
  const { isLoggedIn, setLogin } = useLogin();

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
    // getPublicIP();
    if (sessionStorage.getItem("login") && sessionStorage.getItem("token")) {
      setLogin();
    }

    return () => {};
  }, []);

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/:store" element={<StoreView />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/err" element={<NotPage />} />
          <Route path="/*" element={<App />} />
        </>
      ) : (
        <>
          <Route path="/dashboard/*" element={<DashboardView />}>
            <Route path="profile" element={<Profile />} />
            <Route path="products" element={<Product />} />
            <Route path="stores" element={<Stores />} />
            <Route path="users" element={<Users />} />
            <Route path="messages" element={<h2>mensajes</h2>} />
            <Route path="settings" element={<h2>Configuraciones</h2>} />
          </Route>
          <Route path="/*" element={<DashboardView />} />
        </>
      )}
    </Routes>
  );
};
