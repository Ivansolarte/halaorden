import { useEffect, useState } from "react";
import { InputClassic } from "../../../elements/input/inputClassic";
import { ButtonClassic } from "../../../elements/button/buttonClassic";
import { handleChange } from "../../../utils/handleChange";
import { RadioButton } from "../../../elements/button/radioButton";
import { putProfile } from "../../../services/profile.service";
import { formatDate } from "../../../utils/others";
import { useNavigate } from "react-router";

export const Profile = () => {
  let navigate = useNavigate();
  const sessionstorage = sessionStorage.getItem("user");
  const jsonSession = JSON.parse(sessionstorage);

  const { form, setForm, handleChangeText, handleChangeNum } = handleChange({
    emailUser: jsonSession?.emailUser || "",
    fullNames: jsonSession?.fullNames || "",
    fullSurname: jsonSession?.fullSurname || "",
    userGender: jsonSession?.userGender || "",
    userPhone: jsonSession?.userPhone || "",
    userBirthdate: formatDate(jsonSession?.userBirthdate) || "1000-01-01",
    userRol: jsonSession?.userRol || "",
    userTerms: jsonSession?.userTerms || "",
    userLocation: jsonSession?.userLocation || "",
    _id: jsonSession?._id || "",
  });

  const getInformation = () => {
    if (jsonSession.userBirthdate) {
      jsonSession.userBirthdate = formatDate(jsonSession?.userBirthdate);
    }
    setForm(jsonSession);
  };

  const handleSubmit = () => {
    const isFormComplete = Object.values(form).every(
      (value) => value.trim() !== ""
    );
    if (!isFormComplete) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    if (form._id == "") {
      alert("el usuario no existe vuleva a iniciar session");
      return;
    }
    putProfile(form).then((resp) => {
      console.log(jsonSession);
      console.log(resp);
      sessionStorage.setItem("user", JSON.stringify(resp));
      alert("se actualizao con exito");

      navigate("/dashboard/stores");
    });
  };
console.log(formatDate(form.userBirthdate));

  const handleTerms = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      e.target.value = "true";
      handleChangeText(e);
      console.log("verdadero");
    } else {
      e.target.value = "false";
      handleChangeText(e);
      console.log("falso");
    }
  };

  useEffect(() => {
    // getInformation();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-extrabold text-gray-900">Perfil</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            La información ingresada debe ser verídica, ya que será publicada y
            verificada por el cliente.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/3 text-orange-300">
            Esta información se asociará al correo ingresado.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-gray-900">
                Nombres completos
              </label>
              <div className="mt-2">
                <InputClassic
                  name={"fullNames"}
                  value={form.fullNames}
                  onchange={handleChangeText}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-gray-900">
                Apellidos completos
              </label>
              <div className="mt-2">
                <InputClassic
                  name={"fullSurname"}
                  value={form.fullSurname}
                  onchange={handleChangeText}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-gray-900">
                Genero
              </label>
              <div className="mt-2  flex justify-start">
                <div className="flex mr-2 ">
                  <p className="mr-2">Mujer</p>
                  <RadioButton
                    name={"userGender"}
                    value={"M"}
                    onchange={handleChangeText}
                    checked={form.userGender == "M"}
                  />
                </div>
                <div className="flex">
                  <p className="mr-2">Hombre</p>
                  <RadioButton
                    name={"userGender"}
                    value={"H"}
                    onchange={handleChangeText}
                    checked={form.userGender == "H"}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-gray-900">
                Fecha de nacimiento {JSON.stringify(form.userBirthdate)}
              </label>
              <div className="mt-2">
                <InputClassic
                  type="Date"
                  name={"userBirthdate"}
                  value={form.userBirthdate}
                  onchange={handleChangeText}
                  max={formatDate(new Date())}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-gray-900">
                Teléfono/Celular
              </label>
              <div className="mt-2">
                <InputClassic
                  name={"userPhone"}
                  value={form.userPhone}
                  onchange={handleChangeNum}
                  minLength={"1"}
                  maxLength={"10"}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium text-gray-900">
                Ubicación actual
              </label>
              <div className="mt-2">
                <InputClassic
                  name={"userLocation"}
                  value={form.userLocation}
                  onchange={handleChangeText}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-4">
          <h2 className="text-base/7 font-semibold text-red-500">
            Notificación
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Al marcar esta opción y aceptar los términos al crear la cuenta,
            confirmas que la información proporcionada es real y asumes total
            responsabilidad por los datos ingresados. En caso de que una entidad
            gubernamental requiera verificarlos, aceptas que así se haga. Si los
            datos suministrados son falsos, serás responsable de las sanciones
            establecidas por la ley en Colombia. La plataforma no se hace
            responsable por la veracidad de la información ingresada ni por las
            consecuencias derivadas de datos incorrectos o falsos.
          </p>
          <label className="flex items-center justify-start ">
            <div>
              <InputClassic
                className="accent-red-600"
                name="userTerms"
                type="checkbox"
                onchange={handleTerms}
                checked={form.userTerms == "true"}
                disabled={
                  form.userTerms == "true" && jsonSession?.userTerms == "true"
                }
              />
            </div>
            <p className="ml-2">Acepto</p>
          </label>
          <div className="mt-10 space-y-10"></div>
        </div>
        <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
          <ButtonClassic text={"Enviar"} onclick={handleSubmit} />
        </div>
      </div>
    </>
  );
};
