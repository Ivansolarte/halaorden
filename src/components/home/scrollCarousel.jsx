import { useState, useEffect } from "react";
import { getAllStoresForPublic } from "../../services/store.service";
import { useNavigate } from "react-router";

export const ScrollCarousel = () => {
  const navigate = useNavigate();
  const [arrayStores, setArrayStores] = useState([]);
  const [numImages, setNumImages] = useState(0);
  const [translateXValue, setTranslateXValue] = useState("calc(0px)");

  const getStores = async () => {
    const resp = await getAllStoresForPublic();
    document.title = `(${resp.length}) Tu Tienda`;
    setArrayStores(resp);
    setNumImages(resp.length);
  };

  const formDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const openUrl = (payload) => {
    navigate(`/${payload._id}`);
  };

  useEffect(() => {
    getStores();
  }, []);

  useEffect(() => {
    if (numImages > 0) {
      setTranslateXValue(`calc(-${250 * numImages}px)`);
    }
  }, [numImages]);

  const typeStore = {
    pro: "Productos",
    ve: "Vehículos",
    inm: "Inmueble",
    se: "Servicios",
  };

  return (
    <div className="relative m-auto overflow-hidden">
      <div className="flex animate-infinite-slider">
        {[...arrayStores, ...arrayStores].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[400px] h-[350px] flex justify-center items-center"
            onClick={() => openUrl(item)}
          >
            <div className="mx-auto grid max-h-[330px] max-w-[330px] grid-cols-2 gap-x-2 gap-y-1 px-3 cursor-pointer border-slate-200 py-5 rounded-lg border bg-slate-50 opacity-85">
              <article className="flex w-[305px] m-2 flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={item.companyRegistrationDate}
                    className="text-gray-500"
                  >
                    {formDate(item.companyRegistrationDate)}
                  </time>
                  <p className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-300">
                    Marketing
                  </p>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                    <p className="text-3xl uppercase text-slate-900  font-bold font-store">
                      {item.companyName}
                    </p>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm text-gray-600 h-[100px]">
                    {item.companyDescription}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={item.companyLogo}
                    alt=""
                    className="size-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">
                      Tipo de servicio
                    </p>
                    <p className="text-gray-600">
                      {typeStore[item.companyType]}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes infiniteSlider {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(${translateXValue});
            }
          }
        `}
      </style>
    </div>
  );
};
