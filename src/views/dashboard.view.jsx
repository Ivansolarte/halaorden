import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Header } from "../components/headers/header";
import { MenuDashboard } from "../components/dashboar/menu/menu";

export const DashboardView = () => {
  const [logOut, setLogOut] = useState(false);

  useEffect(() => {
    setLogOut(sessionStorage.getItem("token") != "" ? true : false);

    return () => {};
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="bg-gray-200 ">
          <Header  logOut={logOut} />
        </div>
        <div className="flex sm:flex-1 flex-col sm:flex-row h-screen overflow-hidden">         
          <div className="w-full sm:w-64 h-[270px]  overflow-auto sm:h-full ">
            <MenuDashboard />
          </div>        
          <div className="flex-1 p-4 overflow-auto  py-2 px-10 h-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
