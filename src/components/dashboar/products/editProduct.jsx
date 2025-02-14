import React from "react";
import { ModalContainer } from "../../../elements/modal/modal";
import { InputClassic } from "../../../elements/input/inputClassic";
import { ButtonClassic } from "../../../elements/button/buttonClassic";
import { handleChange } from "../../../utils/handleChange";
import { patchProduct } from "../../../services/product.service";

export const EditProduct = ({ data, setShowModal, getProduct }) => {
  console.log(data);

  const { form, handleChangeNum, handleChangeText } = handleChange({
    _id: data?._id,
    userId: data?.userId,
    storeId: data?.storeId,
    productName: data?.productName,
    productPrime: data?.productPrime,
    productImgUrl: data?.productImgUrl,
    productDescription: data?.productDescription,
    productTerms: data?.productTerms,
    productState: data?.productState,
  });

  const onsudmit = () => {
    console.log(form);
    patchProduct(form).then((resp) => {
      console.log(resp);
      setShowModal((state) => !state);
      getProduct();
    });
  };

  return (
    <ModalContainer>
      <div className="w-[320px] m-3 ">
        <div className="bg-slate-200 px-1 py-4">
          <div className="my-5 text-center">
            <p className="text-lg font-bold uppercase">Editar producto</p>
          </div>
          <div className="">
            <p className="my-2">Titulo de producto</p>
            <InputClassic
              name={"productName"}
              value={form.productName}
              onchange={handleChangeText}
            />
          </div>
          <div className="">
            <p className="my-2">Valor producto</p>
            <InputClassic
              name={"productPrime"}
              value={form.productPrime}
              onchange={handleChangeNum}
              maxLength={"13"}
            />
          </div>
          <div className="">
            <p className="my-2">Descripción de producto</p>
            <textarea
              name={"productDescription"}
              value={form.productDescription}
              onChange={handleChangeText}
              rows="3"
              maxLength={"150"}
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // Internet Explorer y Edge
              }}
              className="block  w-full border border-yellow-200 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-300 sm:text-sm/6"
            ></textarea>
            <div className=" w-full text-end">
              <span className="text-xs text-orange-400">
                {form.productDescription.length} de 150 caracteres
              </span>
            </div>
          </div>
          <div className="text-center mb-6 my-6">
            <ButtonClassic
              type="return"
              text={"Cerrar"}
              onclick={() => setShowModal((state) => !state)}
            />
            <ButtonClassic text={"Guardar"} onclick={onsudmit} disabled={form.productDescription.length > 150 }/>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
