import { useState } from "react";
import { ButtonClassic } from "../../elements/button/buttonClassic";
import { handleChange } from "../../utils/handleChange";

export const CardProduct = ({ data, sendPurchase }) => {
  const { form, handleChangeText } = handleChange();

  const isSelected = (value) => data?.productQuantity == value;

  return (
    <div className="bg-white border mb-1">
      <div className="pt-3">
        <div className="mx-auto -mt-1 px-1 max-w-2xl md:mr-2 grid grid-cols-1 md:grid-cols-2 lg:max-w-5xl ">
          <img
            src={data.productImgUrl[1]}
            className="md:w-2/4 md:mx-auto sm:rounded-lg border hidden md:block min-h-40 object-contain bg-slate-50 hover:w-[700px]"
          />
          <img
            src={data.productImgUrl[0]}
            className="rounded-lg border min-h-64 object-contain bg-slate-50 hover:w-[800px]"
          />
          
        </div>
        <div className="mx-auto max-w-2xl px-4 pt-2 pb-2 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-2">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
              {data.productName}
            </h1>
          </div>
          <div className="mt-2 lg:row-span-3 lg:mt-0">
            <p className="text-xl tracking-tight text-gray-900">
              $ {data.productPrice || 0}
            </p>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Cantidad</h3>
              <fieldset aria-label="Choose a size" className="mt-4">
                <div className="grid grid-cols-4 gap-4">
                  {["1", "2", "3", "+3"].map((value) => (
                    <label
                      key={value}
                      className={`group relative flex cursor-pointer items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase shadow-xs focus:bg-red-500 sm:py-6 hover:bg-gray-200 ${
                        isSelected(value)
                          ? "bg-blue-500 border-blue-800 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <input
                        type="radio"
                        name="productQuantity"
                        value={value}
                        className={`sr-only ${isSelected(value)
                          ? "bg-blue-500 border-blue-800 text-white"
                          : "bg-red-300 text-black"}`}
                        onChange={handleChangeText}
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {console.log(form?.productQuantity?.trim())}
              <div className="relative group w-full mt-4">
                {!form?.productQuantity?.trim() && (
                  <span className="absolute bottom-full mb-2 hidden w-max rounded bg-gray-800 px-2 py-3 text-xs text-white group-hover:block">
                    ¡No olvides seleccionar una cantidad antes de comprar!
                  </span>
                )}
                <ButtonClassic
                  classe="w-full bg-yellow-400"
                  text="comprar"
                  type="store"
                  onclick={() => sendPurchase({ data, form })}
                  disabled={!form?.productQuantity?.trim()}
                />
              </div>
            </div>
          </div>
          <div className="pt-3 lg:col-span-2 lg:col-start-1 lg:border-gray-200 lg:pr-8">
            <p className="text-base text-gray-900">{data.productDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
