import React from "react";
import { InputClassic } from "../../elements/input/inputClassic";
import { ModalContainer } from "../../elements/modal/modal";
import { ButtonClassic } from "../../elements/button/buttonClassic";
import { handleChange } from "../../utils/handleChange";

export const InfClient = ({ setActiveInf, sendWhapp }) => {
  const { form, handleChangeText } = handleChange({});

  return (
    <ModalContainer>
      <div className="w-[320px] py-8 px-5">
        <div className="text-center my-5 u">
          <p className="text-xl font-semibold">
            Ingresa tus datos para el envió/pedido
          </p>
        </div>
        <div>
          <p>Nombre completo</p>
          <InputClassic
            value={form.nameClient}
            name={"nameClient"}
            onchange={handleChangeText}
          />
        </div>
        <div>
          <p>Dirección/Ubicación</p>
          <InputClassic
            value={form.nameAddress}
            name={"nameAddress"}
            onchange={handleChangeText}
          />
        </div>
        <div className="text-center my-5">
          <ButtonClassic
            type="return"
            text={"Cancelar"}
            onclick={() => setActiveInf((state) => !state)}
          />
          {console.log(form.nameClient )}
          {console.log(form.nameAddress )}
          {console.log((form.nameClient?.trim() && form.nameAddress?.trim()))}
          <ButtonClassic
            text={"enviar"}
            onclick={() => sendWhapp(form)}
            disabled={!(form.nameClient?.trim() && form.nameAddress?.trim())}
          />
        </div>
      </div>
    </ModalContainer>
  );
};
