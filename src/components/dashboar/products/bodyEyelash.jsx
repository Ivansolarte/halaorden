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
      <div className="mx-auto max-w-2xl   lg:max-w-7xl  ">
        <ButtonClassic
          text={"+"}
          onclick={() => handleAddProduct(data)}
          disabled={arrayProduct.length < 10 ? false : true}
        />
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
                  <h3 className="text-sm text-gray-700 font-bold uppercase text-lg">
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
