import { useEffect, useState } from "react";
import { ButtonClassic } from "../../../elements/button/buttonClassic";
import {
  getProductsByIdUserId,
  deleteProduct,
} from "../../../services/product.service";
import { EditProduct } from "./editProduct";

export const BodyEyelash = ({ data, handleAddProduct }) => {
  const [arrayProduct, setArrayProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);

  const getProduct = () => {
    getProductsByIdUserId(data).then((resp) => {
      setArrayProduct(resp);
      console.log(resp);
    });
  };

  const editProduct = (e) => {
    setShowModal(true);
    setDataEdit((state) => e);
    console.log(e);
  };

  const removeProduct = (e) => {
    console.log(e);
    deleteProduct(e._id).then((resp) => {
      console.log(resp);
      getProduct();
    });
  };

  useEffect(() => {
    getProduct();
    console.log("creo body");

    return () => {
      console.log("destruir body");
    };
  }, [data]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="relative inline-block">
          <div className="relative group">
            <ButtonClassic
              text={"+"}
              onClick={() => handleAddProduct(data)}
              disabled={arrayProduct.length >= 9}
              className="px-4 py-2 text-white  bg-green-600 hover:bg-green-700 text-lg rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            />
            {arrayProduct.length == 9 && (
              <span className="absolute top-full z-50 left-1/2 mt-1 w-max translate-x-[5%] scale-0 rounded-lg bg-red-200 px-2 py-3 text-xs text-slate-800 group-hover:scale-100 transition-all font-bold">
                {"Has alcanzado el límite de 12 productos. Para agregar más, es necesario contratar espacio adicional."}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-1">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {arrayProduct.map((items, index) => (
            <div
              key={index}
              className="group relative rounded-md border bg-white p-3"
            >
              {/* Contenedor relativo para que la imagen no bloquee otros elementos */}
              <div className="relative">
                <img
                  onMouseEnter={() => console.log("Modal abierto")}
                  onMouseLeave={() => console.log("Modal cerrado")}
                  src={items.productImgUrl[0]}
                  alt="Front of men&#039;s Basic Tee in black."
                  className="w-full h-80 rounded-md bg-gray-200 object-cover"
                />
              </div>

              <div className="mt-4 flex justify-between mx-2">
                <div className="">
                  <h3 className="text-sm text-gray-700 font-bold uppercase ">
                    {items.productName}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 ">
                    {items.productDescription}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${items.productPrice}
                </p>
              </div>
              <div className="mt-1 flex justify-between mx-2">
                <p className="text-sm text-gray-700 font-bold uppercase ">
                  Referencia:
                </p>
                <small className="text-slate-400">
                  {items?.productReference}
                </small>
              </div>
              <div className="text-center my-3 relative ">
                <ButtonClassic
                  type="error"
                  text={"Eliminar"}
                  onclick={() => removeProduct(items)}
                />
                <ButtonClassic
                  text={"Editar"}
                  onclick={() => editProduct(items)}
                  disabled={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <EditProduct
          data={dataEdit}
          setShowModal={setShowModal}
          getProduct={getProduct}
        />
      )}
    </div>
  );
};
