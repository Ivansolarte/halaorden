import React from "react";
import men from "../../../assets/imgs/H.png";
import women from "../../../assets/imgs/M.png";

export const UserCard = ({ data }) => {
  
  const formDate = (dateStr) => {
    const date = new Date(dateStr);
    // Formatear a día-mes-año hora
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

  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img
          className="size-12 flex-none rounded-full bg-gray-50"
          src={data.userGender=="H"?men:women}
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900 uppercase">{`${data.fullNames} ${data.fullSurname}`}</p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            {data.emailUser}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm/6 text-gray-900">{data.userRol}</p>
        <p className="mt-1 text-xs/5 text-gray-500">
          fecha de registro{" - "}
          <time datetime="2023-01-23T13:23Z">{formDate(data.userRegistrationDate)}</time>
        </p>
        <div className="mt-1 flex items-center gap-x-1.5">
          <div className={`flex-none rounded-full ${data.userState=="true"?"bg-emerald-500/20":"bg-red-500/20"} p-1`}>
            <div className={`size-1.5 rounded-full ${data.userState=="true"?'bg-emerald-500':'bg-red-500'}`}></div>
          </div>
          <p className={`text-xs/5 text-gray-500 cursor-pointer`} onClick={()=>alert('editar usuarui')}>Online</p>
        </div>
      </div>
    </li>
  );
};



