import { useState, useEffect } from "react";
import { HomeView } from "./views/home.view";
import { RegisterForm } from "./components/register/registerForm";
import { LoginForm } from "./components/login/loginForm";
import { DashboardView } from "./views/dashboard.view";
import { AppRouter } from "./AppRouter";

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("login"));
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {

    return () => {
    };
  }, []);

  return (
    <>
      <HomeView setShowRegister={setShowRegister} />

      {showRegister && <RegisterForm setShowRegister={setShowRegister} />}
    </>
  );
}

export default App;
