import { useState } from "react";
import log from "../../../assets/imgs/no-image-icon.png";
import { deleteStore } from "../../../services/store.service";
import { Preview } from "./preview";

export const StoreCard = ({ data, editStore, getInformation }) => {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");

  const formDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    return formattedDate;
  };

  const openUrl = () => {
    const baseURL = window.location.href.split("#")[0];
    console.log(baseURL);
  
    const url = `${baseURL}#/${data._id}`;
    console.log(url);
  
    setUrl(url);
    // setShow(true)
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copieUrl = () => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/${data._id}`;
    const tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  const typeStore = {
    pro: "Productos",
    ve: "Vehículos",
    inm: "Inmueble",
    se: "Servicios",
  };

  const deactivateStore = () => {
    deleteStore(data?._id).then((resp) => {
      getInformation();
    });
  };

  return (
    <li className="flex justify-between gap-x-6 py-5 border border-red-300 w-full  ">
      <div className="flex min-w-0 gap-x-4 border">
        <img
          className="size-12 flex-none rounded-full bg-gray-50"
          src={data?.companyLogo || log}
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p
            className="relative group text-sm/6 font-bold text-gray-900 uppercase cursor-pointer"
            onClick={openUrl}
          >
            {data.companyName}
            <span className="absolute bottom-full mb-2 hidden w-max rounded bg-gray-800 px-2 py-3 text-xs text-white group-hover:block">
              Aquí puede ver una vista previa de su página
            </span>
          </p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            {data.companyEmail}
          </p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-600 cursor-pointer hover:text-red-800"
              onClick={deactivateStore}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M9 6V3h6v3M4 6l1 14h14l1-14"
              />
            </svg>
          </p>
        </div>
      </div>
      <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm/6 text-gray-900 font-bold">
          Tipo de tienda:
          <span className="font-light "> {typeStore[data?.companyType]}</span>
        </p>
        <p className=" sr-only sm:not-sr-only shrink-0 mt-1 text-xs/5 text-gray-500">
          fecha de registro{" - "}
          <time dateTime="2023-01-23T13:23Z">
            {formDate(data?.companyRegistrationDate || "")}
          </time>
        </p>
        <div className="mt-1 flex items-center gap-x-1.5">
          <p
            className="relative text-xs/5 z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-300 cursor-pointer"
            onClick={copieUrl}
          >
            Copiar URL
          </p>
          <div
            className={`flex-none rounded-full ${
              data.userState == "true" ? "bg-emerald-500/20" : "bg-red-500/20"
            } p-1`}
          >
            <div
              className={`size-1.5 rounded-full ${
                data.userState == "true" ? "bg-emerald-500" : "bg-red-500"
              }`}
            ></div>
          </div>

          <p
            className={`text-sm text-gray-500 cursor-pointer`}
            onClick={() => editStore(data)}
          >
            Edita
          </p>
        </div>
      </div>
      {show && <Preview url={url} setShow={setShow} />}
    </li>
  );
};
