import React from "react";

export const ButtonClassic = ({
  text,
  classe,
  onclick,
  disabled,
  type = "success",
  title,
}) => {
  const typeButton = {
    success: "btn_success", //verde
    error: "btn_error", //rojo
    return: "btn_return", //gris
    store: "btn_store", //amarilllo
  };
  return (
    <button
      title={title}
      disabled={disabled}
      onClick={onclick}
      className={`${typeButton[type]} ${classe} cursor-pointer capitalize`}
    >
      {text}
    </button>
  );
};
