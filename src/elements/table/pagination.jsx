import React from "react";

export const Pagination = ({ dato, setForm, loading }) => {
  console.log(dato);

  const newPage = (e) => {
    console.log(e);
    // setForm((state) => ({
    //   ...state,
    //   page: e,
    // }));
    // console.log(dato);
    loading(e);
  };

  const previous = () => {
    if (dato.page > 0) {
      console.log("antes");
      console.log(dato.page );
      loading(dato.page - 1);
    }
  };
  const next = () => {
    if (dato.page < dato.totalPages) {
      console.log(dato.page );
      console.log(dato.totalPages );
      console.log("next");
      loading(dato.page +1);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-center sm:hidden">
        <p
          onClick={previous}
          className="relative cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Antes
        </p>
        <p
          onClick={next}
          className="relative cursor-pointer ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Siguiente
        </p>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Pagina
            <span className=" mx-1 font-medium">{dato?.page}</span>a
            <span className="mx-1 font-medium">{dato?.totalPages}</span>
            de
            <span className="mx-1 font-medium">{dato?.total}</span>
            resultados
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
            aria-label="Pagination"
          >
            <a className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Anterior</span>
              <svg
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {[...Array(dato?.totalPages)].map((_, i) => (
              <p
                onClick={() => newPage(i + 1)}
                key={i}
                className={`relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ${
                  dato?.page == i + 1
                    ? "bg-yellow-300 text-white"
                    : "  text-gray-900"
                } ring-gray-300 ring-inset  focus:z-20 focus:outline-offset-0 md:inline-flex cursor-pointer`}
              >
                {i + 1}
              </p>
            ))}
            <a className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Siguiente</span>
              <svg
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
