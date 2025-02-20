import React from "react";
import { ModalContainer } from "../../../elements/modal/modal";
import { InputClassic } from "../../../elements/input/inputClassic";
import { ButtonClassic } from "../../../elements/button/buttonClassic";
import { handleChange } from "../../../utils/handleChange";
import { patchProduct } from "../../../services/product.service";
import { InputImg } from "../../../elements/input/inputImg";

export const EditProduct = ({ data, setShowModal, getProduct }) => {
  console.log(data);

  const { form, setForm, handleChangeNum, handleChangeText } = handleChange({
    _id: data?._id,
    userId: data?.userId,
    storeId: data?.storeId,
    productName: data?.productName,
    productPrice: data?.productPrice,
    productImgUrl: data?.productImgUrl,
    productDescription: data?.productDescription,
    productTerms: data?.productTerms,
    productState: data?.productState,
    productReference: data?.productReference,
  });

  const addImgUrls = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const maxSize = 2 * 1024 * 1024; // 2MB en bytes
  
    console.log(`📥 Imagen seleccionada (${idx}):`, {
      name: file.name,
      type: file.type,
      originalSize: `${(file.size / 1024).toFixed(2)} KB`,
    });
  
    if (file.size > maxSize) {
      alert("La imagen es demasiado grande. Debe ser menor a 2MB.");
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onloadend = (event) => {
      const img = new Image();
      img.src = event.target.result;
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
  
        // Escalar a 300x300 px manteniendo proporción
        const scale = Math.min(300 / width, 300 / height);
        width *= scale;
        height *= scale;
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
  
        // Convertir a JPEG con 50% de calidad
        const base64Image = canvas.toDataURL("image/jpeg", 0.5);
  
        console.log(`📤 Imagen después de conversión (${idx}):`, {
          name: file.name,
          type: "image/jpeg",
          convertedSize: `${((base64Image.length * (3 / 4)) / 1024).toFixed(2)} KB`,
          base64: base64Image.substring(0, 50) + "...",
        });
  
        setForm((prev) => {
          // Asegurar que productImgUrl existe como array
          const updatedUrls = [...(prev.productImgUrl || [])];
          updatedUrls[idx] = base64Image; // Usa `idx` directamente
  
          return { ...prev, productImgUrl: updatedUrls };
        });
      };
    };
  };

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
      <div className="w-[320px] m-3 sm:w-[470px]">
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
              name={"productPrice"}
              value={form.productPrice}
              onchange={handleChangeNum}
              maxLength={"13"}
            />
          </div>
          <div className="">
            <p className="my-2">Referencia producto</p>
            <InputClassic
              name={"productReference"}
              value={form.productReference}
              onchange={handleChangeText}
            />
          </div>
          <div className="">
           
           




          <div className="grid grid-cols-1 md:grid-cols-2">
                  {["Imagen principal", "Imagen alternativa"].map((item, idx) => (
                    <div
                      key={idx}
                      className="mt-2 flex items-center gap-x-3 "
                    >
                      {form.productImgUrl[idx] ? (
                         <img
                         src={form.productImgUrl[idx]} // Muestra la imagen seleccionada
                         className="w-9"
                         alt={`Imagen ${idx}`}
                       />
                      ) : (
                        <svg
                          className="size-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <ButtonClassic
                        type="store"
                        text={item}
                        onclick={() =>
                          document.getElementById(`fileInput${idx}`).click()
                        }
                        classe={
                          "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        }
                      />

                      <InputImg
                        type="file"
                        accept="image/*"
                        id={`fileInput${idx}`}
                        name={`productImgUrl${idx}`}
                        onChange={(e) => addImgUrls(e, idx)}
                        className="hidden bg-yellow-300 text-black"
                      />
                    </div>
                  ))}
                </div>





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
