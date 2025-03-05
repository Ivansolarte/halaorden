import {useEffect} from "react";
import loanding from "../../assets/icons/reload.gif";
import { useLogin } from "../../store/login";


export const ModalAuthExp = ({setModal}) => {

    const {setLogout} = useLogin()

    useEffect(() => {
       setTimeout(() => {
       setModal(state=>!state)
       setLogout()
       }, 9000);
    
      return () => {
        
      }
    }, [])
    
  return (
    <div
      className="relative z-40"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-slate-50/25 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen ">
        <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-start sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-slate-50/50">
              <div className="sm:flex sm:items-center py-3 justify-center">             
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex items-center ">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    Token inválido o expirado. cerrando session 
                  </h3>
                    <img src={loanding} alt="loanding" className="ml-2 w-11 h-11" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
