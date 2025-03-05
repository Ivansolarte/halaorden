import { useState, useEffect } from "react";
import { InputClassic } from "../../../elements/input/inputClassic";
import { ButtonClassic } from "../../../elements/button/buttonClassic";
import { formatNumber } from "../../../utils/others";
import { postProduct } from "../../../services/product.service";
import { InputImg } from "../../../elements/input/inputImg";
import { incrypto } from "../../../utils/crypto";
import { Label } from "../../../elements/text/label";
import { P } from "../../../elements/text/P";

export const RegisterProduct = ({ setAddButtonState, form , setForm, handleChangeText, handleChangeNum  }) => {
  
  const userS = incrypto(sessionStorage.getItem("user"));
  const interfaceProducto = {
    userId: userS._id,
    storeId: "",
    productName: "",
    productPrice: "",
    productImgUrl: [],
    productDescription: "",
    productTerms: "",
    productReference: "",
    productState: "true",
  };


  const handleTerms = (e) => {
    if (e.target.checked) {
      e.target.value = "true";
      handleChangeText(e);
    } else {
      e.target.value = "false";
      handleChangeText(e);
    }
  };

  const closeProduct = () => {
    setAddButtonState((state) => !state);
    setForm(interfaceProducto);
  };

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
          convertedSize: `${((base64Image.length * (3 / 4)) / 1024).toFixed(
            2
          )} KB`,
          base64: base64Image.substring(0, 50) + "...",
        });

        setForm((prev) => {
          // Asegurar que productImgUrl existe como array
          const updatedUrls = [...(prev.productImgUrl || [])];
          updatedUrls[idx] = base64Image; // Usa `idx` directamente

          // Almacenar nombres de archivos en un array separado
          const updatedNames = [
            ...(prev.productReference
              ? prev.productReference.split("-").map((n) => n.replace("#", ""))
              : []),
          ];
          updatedNames[idx] = file.name.split(".")[0]; // Guarda el nombre correcto sin extensión

          // Crear el nuevo productReference con nombres de imágenes
          const updatedReferences = updatedNames
            .map((name) => `#${name}`)
            .join("-");

          return {
            ...prev,
            productImgUrl: updatedUrls,
            productReference: updatedReferences,
          };
        });
      };
    };
  };

  const onsubmit = () => {
    const excludedFields = [
      "userId",
      "productState",
      "productTerms",
      "productImgUrl",
      "productReference",
    ];
    const emptyFields = Object.entries(form)
      .filter(
        ([key, value]) =>
          !excludedFields.includes(key) && !value.toString().trim()
      )
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      alert(
        `Los siguientes campos no pueden estar vacíos: ${emptyFields.join(
          ", "
        )}`
      );
      return;
    }
    console.log(form);

    if (form.productImgUrl.length !== 2) {
      alert("Debe agregar dos imágenes con URLs válidas.");
      return;
    }

    if (form.productTerms == "false") {
      alert(
        "para registrar un prodcuto es necesario aceptar los términos y condiciones"
      );
      return;
    }

    postProduct(form).then((resp) => {
      console.log(resp);
      setAddButtonState((state) => !state);
      setForm(interfaceProducto);
    });
  };

  useEffect(() => {
    console.log("creando formulario producto");
    return () => {
      console.log("desctruido formulario producto");
      setForm(interfaceProducto);
    };
  }, []);

  return (
    <>
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-1 sm:col-span-6  w-full">
              <Label text={" *Nombre o descripción del producto"} />
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <InputClassic
                    name={"productName"}
                    value={form?.productName}
                    onchange={handleChangeText}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-full  ">
              <Label text={"*Imagen del producto"} />
              <div className="grid grid-cols-1 md:grid-cols-2">
                {["Imagen principal", "Imagen alternativa"].map((item, idx) => (
                  <div key={idx} className="mt-2 flex items-center gap-x-3 ">
                    {form?.productImgUrl[idx] ? (
                      <img
                        src={form?.productImgUrl[idx]} // Muestra la imagen seleccionada
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
            <div className="col-span-1 sm:col-span-3  w-full">
              <Label text={"*Referencia del producto"} />
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <InputClassic
                    name={"productReference"}
                    value={form?.productReference}
                    onchange={handleChangeText}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-3  w-full">
              <Label text={"*Valor del producto"}>
                <span className="ml-2 text-base font-semibold ">
                  $ {formatNumber(form?.productPrice)}
                </span>
              </Label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <InputClassic
                    name={"productPrice"}
                    value={form?.productPrice}
                    onchange={handleChangeNum}
                    maxLength={"13"}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <Label text={"*Descripción"} />

              <div className="mt-2">
                <textarea
                  name={"productDescription"}
                  value={form?.productDescription}
                  onChange={handleChangeText}
                  rows="3"
                  maxLength={"150"}
                  className="block  w-full border border-yellow-200 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-300 sm:text-sm/6"
                ></textarea>
                <div className=" w-full text-end">
                  <span className="text-xs text-orange-400">
                    {form?.productDescription.length} de 150 caracteres
                  </span>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-4 col-span-full f ">
              <P text={"Notificación"} classe={'text-[16px] font-semibold text-red-500'} />
              <P 
              classe={'mt-1 text-sm/6 text-gray-600 font-sans'}
              text={`
                 Al publicar contenido en esta plataforma, aceptas que eres el
                único responsable de las imágenes e información compartida.
                Cualquier reclamo de terceros sobre derechos de autor, propiedad
                intelectual u otro conflicto legal será tu responsabilidad
                exclusiva. Nos reservamos el derecho de eliminar de inmediato
                cualquier publicación ante una queja legítima, sin previo aviso.
                Está estrictamente prohibido subir contenido ilegal, sexualmente
                explícito, imágenes de menores de edad o cualquier material que
                infrinja la ley. La plataforma no asume ninguna responsabilidad
                por el contenido publicado por los usuarios ni por las
                consecuencias legales que este pueda generar.
                `}
              />
              <Label classe="flex items-center">
                <div>
                  <InputClassic
                    className="accent-red-600"
                    name="productTerms"
                    type="checkbox"
                    onchange={handleTerms}
                    checked={form?.productTerms == "true"}
                  />
                </div>
                <p className="ml-2">Acepto</p>
              </Label>
              <div className="mt-5 space-y-10"></div>
            </div>
            <div className="  flex ">
              <ButtonClassic
                type="error"
                text={"Cancelar"}
                onclick={closeProduct}
              />
              <ButtonClassic
                text={"Crear"}
                onclick={onsubmit}
                disabled={form?.productDescription.length > 150}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
