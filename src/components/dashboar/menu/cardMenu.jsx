import React from "react";
import { Link } from "react-router";

export const CardMenu = ({ data={}, icon }) => {
  // console.log(data);
  
  return (
    <Link
      to={`/dashboard/${data.url}`}
      // onClick={()=>navigate('/dashboard/profile')}
      className="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-1  hover:bg-white/5 transition ease-linear duration-150 "
    >
      <div className="h-8 my-1">{icon}</div>
      <div className="flex flex-col sr-only xs:not-sr-only">
        <span className="text-sm text-slate-500 font-bold  leading-5 ">
          {data.title}
        </span>
        <span className="text-[10px] text-slate-400 hidden md:block  ">
          {data.description}a
        </span>
      </div>
    </Link>
  );
};
