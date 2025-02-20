
import { ModalContainer } from "../../../elements/modal/modal";

export const Preview = ({ url, setShow }) => {
  console.log(url);
  
  return (
    <ModalContainer>
      <div className="w-[380px] h-[500px] sm:w-[450px] md:w-[600px] sm:h-[640px]">
        <div className="flex justify-end px-2">
          <p
            className="text-xl font-bold cursor-pointer"
            onClick={() => setShow((state) => !state)}
          >
            x
          </p>
        </div>
        <div className="h-[460px] sm:h-[600px] overflow-hidden relative pointer-events-none">
          <iframe
          //  sandbox="allow-scripts allow-same-origin"
            src={url}
            title="Contenido"
            className="w-[1288px] h-screen border-none"
            style={{
              transform: "scale(0.47)",
              transformOrigin: "top left",
            }}
          ></iframe>
        </div>
      </div>
    </ModalContainer>
  );
};
