import { useEffect, useState } from "react";
import { init } from "../../services/init";

export const Footer = () => {
  const [info, setInfo] = useState({
    fecha: "1900-01",
    nameCreator: "Creador",
  });

  const  getInform = ()=>{
    setInterval(() => {
        init().then((resp) => {
          // console.log(resp,JSON.stringify(new Date()));
          if (resp.status) {
              setInfo(resp.creator)
          }
        });
      }, 450000); // 7.5 minutos (450,000 ms)
  }

  useEffect(() => {
    getInform()
    return () => {};
  }, []);

  return (
    <footer className=" rounded-lg shadow-sm mt-auto text-center py-2">
      <div className="max-w-screen-xl mx-auto text-gray-500 text-sm">
        © {info?.fecha} TUTIENDA™. Todos los derechos reservados.
        <div className="mt-1 flex justify-center gap-4">
          <a href="/terms" className="hover:underline text-[11px]">
            Términos y condiciones
          </a>
          <a href="/privacy" className="hover:underline text-[11px]">
            Política de privacidad
          </a>
        </div>
        <div className="mt-1 text-xs text-gray-400">
          {info?.nameCreator}
        </div>
      </div>
    </footer>
  );
};
