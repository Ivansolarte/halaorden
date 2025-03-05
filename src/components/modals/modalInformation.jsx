import { useEffect } from "react";
import { ModalContainer } from "../../elements/modal/modal";

export const ModalInformation = ({ type = false, setModal }) => {
  useEffect(() => {
    setTimeout(() => {
      setModal((state) => !state);
    }, 6000);
    return () => {};
  }, []);

  return (
    <ModalContainer>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-[350px]">
        <div className="sm:flex sm:items-start">
          <div
            className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${
              type ? "text-red-100" : " text-blue-100"
            } sm:mx-0 sm:size-10`}
          >
            <svg
              className={`size-6 ${type ? " text-red-600" : " text-blue-600"}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-base font-semibold text-gray-900"
              id="modal-title"
            >
              Advertencia
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Algo salió mal con la petición. Inténtalo de nuevo o contacta
                con soporte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
