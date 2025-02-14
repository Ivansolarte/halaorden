import React from 'react'

export const ButtonClassic = ({text, classe, onclick, disabled, type="success" }) => {
    const  typeButton={
        success:"btn_success",//verde
        error:"btn_error",    //rojo
        return:"btn_return",  //gris
        store:"btn_store"     //amarilllo
    }
  return (
    <button
        disabled={disabled}
        onClick={onclick}
        className={`${typeButton[type]} ${classe} cursor-pointer capitalize`}
    >{text}</button>
  )
}
