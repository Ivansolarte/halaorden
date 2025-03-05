import { useEffect, useState } from "react";
import { ButtonClassic } from "../../../elements/button/buttonClassic";
import { getAllProducts } from "../../../services/product.service";
import { formatDate } from "../../../utils/others";
import { P } from "../../../elements/text/P";
import { InputClassic } from "../../../elements/input/inputClassic";
import { handleChange } from "../../../utils/handleChange";
import { Pagination } from "../../../elements/table/pagination";
import { ModalAuthExp } from "../../modals/modalAuthExp";
import { ModalInformation } from "../../modals/modalInformation";

export const AdminProduct = ({ setAddForm, setAddButtonState }) => {
  const { form, setForm, handleChangeText } = handleChange({
    page: "1",
    limit: "5",
    totalPages: "0",
    total: "0",
    productName: "",
    companyName: "",
  });
  const [arrayProducts, setArrayProducts] = useState([]);
  const [modalToken, setModalToken] = useState(false);
  const [modalInform, setModalInform] = useState(false);

  const [positionImg, setPositionImg] = useState(0);

  const makeover = (setPositionImg) => {
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % 2;
      setPositionImg(index);
    }, 12000);
    return intervalId;
  };

  const addProductByStore = (payload) => {
    setAddForm((prev) => ({ ...prev, storeId: payload.storeId,  userId:payload.userId }));    
    setAddButtonState(state=>!state)
  }

  const getProducts = (page) => {
    getAllProducts(form, page).then((resp) => {
      console.log(resp);
      if (resp.status == 401) {
        setModalToken(true)
        return;
      }
      setArrayProducts(resp.data);
      setForm((state) => ({
        ...state,
        page: resp.page,
        total: resp.total,
        totalPages: resp.totalPages,
      }));
      console.log(resp);
    });
  };

  useEffect(() => {
    // const intervalId = makeover(setPositionImg);
    getProducts(1);
    return () => {
      console.log('destruye admin');
      
      // clearInterval(intervalId);
    };
  }, []);

  return (
    <div className=" flex justify-center ">
      <div className="  w-4/5">
        <div className="mt-6 flex justify-between items-center ">
          <div></div>
          <div>
            <InputClassic
              name="companyName"
              value={form.companyName}
              placeholder={"Por tienda"}
            />
          </div>
          <div>
            <InputClassic
              name="productName"
              value={form.productName}
              placeholder={"Por producto"}
            />
          </div>
          {/* <div>
          <InputClassic 
          placeholder={''}
          />
        </div> */}
          <div>
            <ButtonClassic type="store" text={"Buscar"} />
          </div>
        </div>
        <div className=" ">
          <ul role="list" className="divide-y divide-gray-100">
            {arrayProducts.map((product, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5">              
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="size-16 flex-none rounded-full bg-gray-50"
                    src={product.productImgUrl[0]}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {product.productName}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      Tienda: <strong>{product.storeName}</strong>
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500 sr-only md:not-sr-only">
                      Referencia: <strong>{product.productReference}</strong>
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500 flex items-center ">
                      <p className="sr-only md:not-sr-only">
                        Agregar un producto:
                      </p>
                      <div className="ml-2" onClick={()=>addProductByStore(product)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                      </div>
                    </p>
                  </div>
                </div>
                <div className=" sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6 text-gray-900 sr-only md:not-sr-only">
                    <span>Fecha de registro: </span>
                    <strong>
                      {formatDate(product.productRegistrationDate)}
                    </strong>
                  </p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full  p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-blue-600 "
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                        <path d="m15 5 3 3"></path>
                      </svg>
                    </div>
                    <p className="text-xs/5 text-gray-500">Editar</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-red-600 "
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M8 6V4h8v2"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                        <path d="M5 6h14v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6z"></path>
                      </svg>
                    </div>
                    <p className="text-xs/5 text-gray-500">Eliminar</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Pagination dato={form} setForm={setForm} loading={getProducts} />
        </div>
        <ButtonClassic
          text={"+"}
          onclick={() => setAddButtonState((state) => !state)}
        />
      </div>
      {modalToken && <ModalAuthExp setModal={setModalToken} />}
      {modalInform && (
        <ModalInformation type={true} setModal={setModalInform} />
      )}
    </div>
  );
};
