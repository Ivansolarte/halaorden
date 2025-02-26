import { useEffect, useState } from "react";
import { CardMenu } from "./cardMenu";
import { Footer } from "../../footer/footer";
import { incrypto } from "../../../utils/crypto";
import H from "../../../assets/imgs/H.png";
import M from "../../../assets/imgs/M.png";

export const MenuDashboard = () => {
  const user = incrypto(sessionStorage.getItem("user"))
  
  const arrayMenu = [
    {
      url: "profile",
      title: "Perfil",
      description: "Datos de Perfil/Empresa",
      rol: "Client",
    },
    {
      url: "users",
      title: "Usuarios",
      description: "Datos de las personas registradas",
      rol: "ADMIN",
    },
    {
      url: "stores",
      title: " Tiendas",
      description: "Lista de locales",
      rol: "Client",
    },
    {
      url: "products",
      title: "Productos",
      description: "Agrega tus productos",
      rol: "Client",
    },
    {
      url: "messages",
      title: "Mensajes",
      description: "Lista de mensajes enviados",
      rol: "ADMIN",
    },
    { url: "setting", title: "Configuración", description: "", rol: "ADMIN" },
  ];
  const [infUser, setInfUser] = useState({});

  useEffect(() => {   
    setInfUser(user);
    return () => {};
  }, []);

  return (
    <>
      <div className="bg-slate-100  w-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white z-10 ">
        <div className="flex flex-col relative w-screen">
          <div
            id="menu"
            className=" bg-gradient-to-r from-slate-300 w-full to-yellow-50 sm:min-h-screen z-10 text-slate-300 mb-28 sm:w-64 fixed left-0 sm:h-screen   shadow-2xl sm:shadow-blue-700 "
          >
            <div id="logo" className="my-4 px-6 sr-only sm:not-sr-only sm:px-6 sm:my-4">
              <h1 className="text-lg md:text-2xl font-bold text-black">
                {!infUser.companyName
                  ? `${infUser.fullNames} ${infUser.fullSurname}`
                  : infUser.companyName}
              </h1>
              <p className="text-slate-500 text-sm">
                Manage your actions and activities
              </p>
            </div>

            <div id="profile" className="px-6 pt-10 sm:py-10 ">
              <p className="text-slate-500 mb-1">Bienvenido de nuevo</p>
              <div  className="inline-flex space-x-2 items-center">
                <picture>
                  <img
                    className="rounded-full w-8 h-8"
                    src={user.userGender=="M"?M:H}
                    alt=""
                  />
                </picture>
                <span className="text-sm text-slate-700 md:text-base font-extrabold">
                  {`${infUser.fullNames} ${infUser.fullSurname}`}
                </span>
              </div>
            </div>

            <div className="w-full px-6 grid grid-cols-3 gap-4 sm:grid-cols-1">
              {sessionStorage.getItem("rol") === JSON.stringify("ADMIN")
                ? arrayMenu.map((item, index) => (
                    <CardMenu key={index} data={item} icon={icons[item.url]} />
                  ))
                : arrayMenu
                    .filter((item) => item.rol === "Client")
                    .map((item, index) => (
                      <CardMenu
                        key={index}
                        data={item}
                        icon={icons[item.url]}
                      />
                    ))}
            </div>
            <div className="sr-only sm:not-sr-only sm:mt-[50%] ">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const icons = {
  profile: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="50px"
      viewBox="0 -960 960 960"
      width="50px"
      fill="#5f6368"
    >
      <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.92 44.69q31.3 14.13 50.19 40.97Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
    </svg>
  ),
  users: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
      viewBox="0 -960 960 960"
      width="48px"
      fill="#5f6368"
    >
      <path d="M38-160v-94q0-35 18-63.5t50-42.5q73-32 131.5-46T358-420q62 0 120 14t131 46q32 14 50.5 42.5T678-254v94H38Zm700 0v-94q0-63-32-103.5T622-423q69 8 130 23.5t99 35.5q33 19 52 47t19 63v94H738ZM358-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42Zm360-150q0 66-42 108t-108 42q-11 0-24.5-1.5T519-488q24-25 36.5-61.5T568-631q0-45-12.5-79.5T519-774q11-3 24.5-5t24.5-2q66 0 108 42t42 108ZM98-220h520v-34q0-16-9.5-31T585-306q-72-32-121-43t-106-11q-57 0-106.5 11T130-306q-14 6-23 21t-9 31v34Zm260-321q39 0 64.5-25.5T448-631q0-39-25.5-64.5T358-721q-39 0-64.5 25.5T268-631q0 39 25.5 64.5T358-541Zm0 321Zm0-411Z" />
    </svg>
  ),
  products: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
      viewBox="0 -960 960 960"
      width="48px"
      fill="#5f6368"
    >
      <path d="M180-80q-24.75 0-42.37-17.63Q120-115.25 120-140v-483q-17-6-28.5-21.39T80-680v-140q0-24.75 17.63-42.38Q115.25-880 140-880h680q24.75 0 42.38 17.62Q880-844.75 880-820v140q0 20.22-11.5 35.61T840-623v483q0 24.75-17.62 42.37Q804.75-80 780-80H180Zm0-540v480h600v-480H180Zm-40-60h680v-140H140v140Zm220 260h240v-60H360v60Zm120 40Z" />
    </svg>
  ),
  stores: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
      viewBox="0 -960 960 960"
      width="48px"
      fill="#5f6368"
    >
      <path d="M160-740v-60h642v60H160Zm5 580v-258h-49v-60l44-202h641l44 202v60h-49v258h-60v-258H547v258H165Zm60-60h262v-198H225v198Zm-50-258h611-611Zm0 0h611l-31-142H206l-31 142Z" />
    </svg>
  ),
  setting: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
      viewBox="0 -960 960 960"
      width="48px"
      fill="#5f6368"
    >
      <path d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm48-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z" />
    </svg>
  ),
  messages: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
      viewBox="0 -960 960 960"
      width="48px"
      fill="#5f6368"
    >
      <path d="M880-81 721-240H300q-24.75 0-42.37-17.63Q240-275.25 240-300v-80h440q24.75 0 42.38-17.63Q740-415.25 740-440v-280h80q24.75 0 42.38 17.62Q880-684.75 880-660v579ZM140-425l75-75h405v-320H140v395ZM80-280v-540q0-24.75 17.63-42.38Q115.25-880 140-880h480q24.75 0 42.38 17.62Q680-844.75 680-820v320q0 24.75-17.62 42.37Q644.75-440 620-440H240L80-280Zm60-220v-320 320Z" />
    </svg>
  ),
};
