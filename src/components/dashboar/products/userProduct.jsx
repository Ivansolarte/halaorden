import { useState, useEffect } from "react";
import { getByUserId } from "../../../services/store.service";
import { BodyEyelash } from "./bodyEyelash";
import { incrypto } from "../../../utils/crypto";

export const UserProduct = ({setAddButtonState, setForm}) => {
    const userS = incrypto(sessionStorage.getItem("user"));
    // console.log(userS);   
    const [dataProduct, setDataProduct] = useState({});
    const [arrayStore, setArrayStore] = useState([]);  
    const [activeTab, setActiveTab] = useState(0);
  
    const getStores = () => {     
      getByUserId(userS._id).then((resp) => {
        if (resp) {
          const dataStore = { storeId: resp.data[0]._id, userId: resp.data[0].userId };        
          setDataProduct(state => dataStore);
          setArrayStore(resp.data);
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
  
    const handleAddProduct = (e) => {
        console.log(e)
      setForm((prev) => ({ ...prev, storeId: e.storeId }));    
      setAddButtonState(state => !state);
    };
  
    useEffect(() => {
      getStores();
      console.log('creando formulario producto');
      return () => {
        console.log('desctruido formulario producto');     
 
      };
    }, []);
  
  
  
    return (
      <>
        <div>
          <div className="border-b border-gray-900/10 pb-12">       
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
          
          </div>
        </div>
      </>
    );
}
