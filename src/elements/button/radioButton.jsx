import React from "react";

export const RadioButton = ({value , name, onchange, checked, classs}) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onchange}
      className={`accent-red-500 mr-2${classs}`}
      type="radio"
      checked={checked}
    />
  );
};
