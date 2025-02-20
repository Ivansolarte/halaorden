import React from "react";

export const InputImg = ({type,accept,id,name,onChange,className}) => {
  return (
    <input
      type={type}
      accept={accept}
      id={id}
      name={name}
      onChange={onChange}
      className={className}
    />
  );
};
