import { useEffect } from "react";
import { ScrollCarousel } from "../components/home/scrollCarousel";
import { Header } from "../components/headers/header";
import { Footer } from "../components/footer/footer";

export const HomeView = ({ setShowLogin, setShowRegister }) => {
  useEffect(() => {
    console.log("cargando tiendas");

    localStorage.clear();
    return () => {};
  }, []);

  return (
    <>
      <div className="relative h-screen flex flex-col">
        <div className="w-full ">
          <Header
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />
        </div>
        <div className="flex-1 py-2 sm:pt-5 bg-gradient-to-r from-slate-50 via-yellow-50 to-slate-50 ">
          <div className="mx-auto max-w-7xl px-1 lg:px-8  h-full flex flex-col justify-center ">
            <div className="mx-auto max-w-2xl lg:mx-0 mb-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                ¡Convierte tus fotos en un catálogo online con
                <strong
                  className="text-yellow-300 text-4xl sm:text-6xl font-store ml-2"
                  style={{ WebkitTextStroke: "0.2px #B8860B" }}
                >
                  Tu Tienda
                </strong>
                !
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Crea tu sitio web en minutos usando las fotos que ya tienes en
                redes sociales. Con{" "}
                <strong
                  className="text-yellow-200 text-3xl font-store"
                  style={{ WebkitTextStroke: "0.2px #DAA520" }}
                >
                  Tu Tienda
                </strong>
                , convierte esas imágenes en un catálogo profesional para
                ofrecer tus productos, servicios o artículos. Es fácil, rápido y
                más económico que otras plataformas.
              </p>
              <p className="mt-4 text-lg font-semibold text-gray-800">
                ¡Haz crecer tu negocio hoy! Regístrate y crea tu propio sitio
                web sin complicaciones.
              </p>
            </div>

            <div className="h-[350px] w-full mt-10 flex justify-center">
              <ScrollCarousel />
            </div>
          </div>
        </div>
        <Footer/>        
      </div>
    </>
  );
};
