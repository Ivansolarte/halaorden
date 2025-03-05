import React from "react";

export const Label = ({ text, children = <></>, classe }) => {
  return (
    <label className={`block text-sm/6 font-medium text-gray-900 ${classe}`}>
      {text} {children}
    </label>
  );
};
