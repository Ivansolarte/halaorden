import { useState, useEffect } from "react";
import { InputClassic } from "../../../elements/input/inputClassic";
import { ButtonClassic } from "../../../elements/button/buttonClassic";
import { RadioButton } from "../../../elements/button/radioButton";
import { handleChange } from "../../../utils/handleChange";
import {
  postProduct,
  getProductsByIdUserId,
} from "../../../services/product.service";
import { getByUserId } from "../../../services/store.service";
import { BodyEyelash } from "./bodyEyelash";

export const Product = () => {
  const user = sessionStorage.getItem("user");

  const interfaceProducto = {
    userId: JSON.parse(user)._id,
    storeId: "",
    productName: "",
    productPrice: "",
    productImgUrl: [],
    productDescription: "",
    productTerms: "",
    productState: "true",
  };
  const { form, setForm, handleChangeText, handleChangeNum } =
    handleChange(interfaceProducto);

  const [dataProduct, setDataProduct] = useState({});
  const [addButtonState, setAddButtonState] = useState(false);
  const [arrayStore, setArrayStore] = useState([]);

  const [activeTab, setActiveTab] = useState(0);

  const getStores = () => {
    getByUserId(JSON.parse(user)._id).then((resp) => {
      if (resp) {
        const dataStore = { storeId: resp[0]._id, userId: resp[0].userId };
        setDataProduct((state) => dataStore);
        setArrayStore(resp);
      }
    });
  };

  const selectEyelash = (index, payload) => {
    setActiveTab(index);
    setDataProduct(() => ({
      storeId: payload._id,
      userId: payload.userId,
    }));
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

  const handleAddProduct = (e) => {
    setForm((prev) => ({ ...prev, storeId: e.storeId }));
    setAddButtonState((state) => !state);
  };

  const editProduct = () => {};

  const addImgUrls = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedUrls = [...prev.productImgUrl];
      // Reemplazar o agregar la URL según el campo
      const index = name === "productImgUrl1" ? 0 : 1;
      updatedUrls[index] = value;

      return { ...prev, productImgUrl: updatedUrls };
    });
  };

  const onsubmit = () => {
    const excludedFields = [
      "userId",
      "productState",
      "productTerms",
      "productImgUrl",
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

    if (
      form.productImgUrl.length !== 2 ||
      !form.productImgUrl.every((url) => /^https?:\/\/.+\..+/.test(url))
    ) {
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
    getStores();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-extrabold text-gray-900">Productos</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Al subir imágenes e información de productos, confirmas que eres el
            propietario o tienes los derechos para usarlos. Serás responsable de
            cualquier reclamo de terceros sobre el contenido publicado.
          </p>

          {addButtonState ? (
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-1 sm:col-span-6  w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  *Nombre o descripción del producto
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <InputClassic
                      name={"productName"}
                      value={form.productName}
                      onchange={handleChangeText}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-3  w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  *Valor del producto
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <InputClassic
                      name={"productPrice"}
                      value={form.productPrice}
                      onchange={handleChangeNum}
                      maxLength={"13"}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  *Imagen del producto: solo se acepta URL
                </label>

                {[1, 2].map((idx) => (
                  <div key={idx} className="mt-2 flex items-center gap-x-3">
                    {form.productImgUrl[idx - 1] ? (
                      <img
                        src={form.productImgUrl[idx - 1]}
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
                    <InputClassic
                      name={`productImgUrl${idx}`}
                      value={form.productImgUrl[idx - 1] || ""}
                      onchange={addImgUrls}
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  *Descripción
                </label>
                <div className="mt-2">
                  <textarea
                    name={"productDescription"}
                    value={form.productDescription}
                    onChange={handleChangeText}
                    rows="3"
                    maxLength={"150"}
                    className="block  w-full border border-yellow-200 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-300 sm:text-sm/6"
                  ></textarea>
                  <div className=" w-full text-end">
                    <span className="text-xs text-orange-400">
                      {form.productDescription.length} de 150 caracteres
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-4 col-span-full">
                <h2 className="text-base/7 font-semibold text-red-500">
                  Notificación
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Al publicar contenido en esta plataforma, aceptas que eres el
                  único responsable de las imágenes e información compartida.
                  Cualquier reclamo de terceros sobre derechos de autor,
                  propiedad intelectual u otro conflicto legal será tu
                  responsabilidad exclusiva. Nos reservamos el derecho de
                  eliminar de inmediato cualquier publicación ante una queja
                  legítima, sin previo aviso. Está estrictamente prohibido subir
                  contenido ilegal, sexualmente explícito, imágenes de menores
                  de edad o cualquier material que infrinja la ley. La
                  plataforma no asume ninguna responsabilidad por el contenido
                  publicado por los usuarios ni por las consecuencias legales
                  que este pueda generar.
                </p>
                <label className="flex items-center">
                  <div>
                    <InputClassic
                      className="accent-red-600"
                      name="productTerms"
                      type="checkbox"
                      onchange={handleTerms}
                      checked={form.productTerms == "true"}
                    />
                  </div>
                  <p className="ml-2">Acepto</p>
                </label>
                <div className="mt-5 space-y-10"></div>
              </div>
              <div className="  flex ">
                <ButtonClassic
                  type="error"
                  text={"Cancelar"}
                  onclick={() => setAddButtonState((state) => !state)}
                />
                <ButtonClassic text={"Crear"} onclick={onsubmit} disabled={form.productDescription.length > 150 } />
              </div>
            </div>
          ) : (
            <div>
              <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  {arrayStore.map((items, index) => (
                    <li className="me-2" key={index}>
                      <button
                        onClick={() => selectEyelash(index, items)}
                        className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group transition-colors 
                        ${
                          activeTab === index
                            ? "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                            : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        }`}
                      >
                        <div className="">
                          <img
                            src={items?.companyLogo}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                        <p className="uppercase text-lg ml-2">
                          {items?.companyName}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contenido de cada pestaña */}
              <div className={`p-4 ${arrayStore == 0 && "invisible"}`}>
                {activeTab === 0 && (
                  <BodyEyelash
                    data={dataProduct}
                    handleAddProduct={handleAddProduct}
                  />
                )}
                {activeTab === 1 && (
                  <BodyEyelash
                    data={dataProduct}
                    handleAddProduct={handleAddProduct}
                  />
                )}
                {activeTab === 2 && (
                  <BodyEyelash
                    data={dataProduct}
                    handleAddProduct={handleAddProduct}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
