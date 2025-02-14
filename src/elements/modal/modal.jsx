import React from "react";

export const ModalContainer = ({ children }) => {
  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-auto h-auto max-w-full max-h-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
