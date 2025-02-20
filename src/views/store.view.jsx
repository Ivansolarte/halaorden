import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Header } from "../components/headers/header";
import { getProducts } from "../services/product.service";
import { CardProduct } from "../components/store/cardProduct";
import { InfClient } from "../components/store/infClient";
import { Footer } from "../components/footer/footer";
// import { FormClient } from "../components/store/formClient";

export const StoreView = () => {
  const params = useParams();
  const navigate = useNavigate();
  
console.log(params);
console.log(params.store);

  const [dataCompany, setDataCompany] = useState({});
  const [stateHtml, setStateHtml] = useState(false);
  const [activeInf, setActiveInf] = useState(false);
  const [dataSend, setDataSend] = useState({});

  const getproduct = () => {
    getProducts(params.store).then((resp) => {
      if (!resp.status) {
        sessionStorage.getItem("token")
          ? navigate("/dashboard")
          : navigate("/");
        localStorage.clear();
        return;
      }
      document.title = `${resp.companyName}`;
      setDataCompany(resp);
      localStorage.setItem(`logUrl`, resp.companyLogo);
      localStorage.setItem("rol", "client");
      localStorage.setItem("phone", "client");
      setTimeout(() => {
        setStateHtml((state) => !state);
      }, 250);
    });
  };

  const sendWhapp = (payload) => {
    console.log(payload);
    console.log(dataSend);

    const message =
      `*Fecha:* ${new Date()}%0A` +
      `*Cliente:* ${payload.nameClient}%0A` +
      `*Dirección:* ${payload.nameAddress}%0A%0A` +
      `*Producto:* ${encodeURIComponent(dataSend.productName)}%0A` +
      `*Precio:* ${dataSend.productPrice}%0A` +
      `*Referencia:* ${dataSend.productReference}%0A` +
      `*Cantidad:* ${dataSend.productQuantity}`;

    const companyPhone = dataCompany.companyPhone;
    console.log(message);

    const whatsappUrl = `https://wa.me/57${companyPhone}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setActiveInf((state) => !state);
  };

  const sendPurchase = (payload) => {
    console.log(payload);

    setActiveInf((state) => !state);
    const { data, form } = payload;
    const json = {
      productName: data.productName,
      productPrice: data.productPrice,
      productReference: data.productReference,
      productQuantity: form.productQuantity,
    };
    setDataSend(json);
  };

  useEffect(() => {
    getproduct();
    return () => {
      localStorage.clear();
      console.log("destruyendo store");
    };
  }, []);

  return (
    <>
      {stateHtml && (
        <>
          <div className="bg-white pb-24 sm:pb-20 ">
            <Header />
            <div className="mx-auto grid max-w-7xl pt-2 gap-10 px-6 lg:px-8 2xl:max-w-screen-2xl xl:grid-cols-3 ">
              <div className="max-w-7xl bg-slate-50 rounded px-2  flex flex-col xl:min-h-screen">
                <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl uppercase">
                  {dataCompany.companyName}
                </h2>
                <p className="mt-4 text-lg/8 text-gray-600">
                  {dataCompany.companyDescription}
                </p>

                <div className="flex-grow">
                  {/* El contenido de la página */}
                </div>

                <div className="sr-only xl:not-sr-only">
                  <Footer />
                </div>
              </div>

              <ul
                role="list"
                className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 sm:gap-y-16 xl:col-span-2 "
              >
                {dataCompany?.data &&
                  dataCompany?.data.map((items, index) => (
                    <CardProduct
                      key={index}
                      data={items}
                      sendPurchase={sendPurchase}
                    />
                  ))}
              </ul>
            </div>
          </div>

          {activeInf && (
            <InfClient setActiveInf={setActiveInf} sendWhapp={sendWhapp} />
          )}
        </>
      )}
    </>
  );
};
