import { useState } from "react";
import { ModalContainer } from "../../elements/modal/modal";
import logo from "../../assets/icons/shopIcon.ico";
import { handleChange } from "../../utils/handleChange";
import { InputClassic } from "../../elements/input/inputClassic";
import { ButtonClassic } from "../../elements/button/buttonClassic";
import { postRegister } from "../../services/user.service";
import { ModalTerms } from "../modals/modalTerms";

export const RegisterForm = ({ setShowRegister }) => {
  const { form, handleChangeNum, handleChangeText } = handleChange({
    companyName: "",
    userPhone: "",
    fullNames: "",
    emailUser: "",
    userTerms: "false",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTerm, setShowTerm] = useState(false);

  const handleEmail = (e) => {
    e.target.value= e.target.value.toLowerCase()
    handleChangeText(e);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
    if (emailRegex.test(form.companyEmail)) {
      setErrEmail(true);
      return;
    }
    setErrEmail(false);
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    setConfirmPassword(() => value);
  };

  const handleSubmit = () => {
    const requiredFields = [
      "companyName",
      "userPhone",
      "fullNames",
      "emailUser",
      "userTerms",
      "password",
    ];

    for (const field of requiredFields) {
      if (!form[field] || form[field].toString().trim() === "") {
        alert(`El campo ${field} es obligatorio`);
        return;
      }
    }
    if (form.userTerms == "true") {
      form.companyName=form.companyName.toLowerCase()      
      postRegister(form).then(({ status, message }) => {
        if (status) {
          setShowRegister((state) => !state);
        } else {
          alert(message);
        }
      });
    } else {
      alert("para registarse se debe aceptar los terminos ");
    }
  };

  return (
    <>
      <ModalContainer>
        <div
          className={`
            bg-gray-50   w-screen 
              sm:w-[480px]
               md:w-[550px] 
                lg:w-[500px]
            `}
        >
          <div className=" flex flex-col justify-center py-3 pb-12 pr-[29px] sm:pr-0 ">
            <div className=" text-end pr-2  sm:pb-8">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setShowRegister((state) => !state)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className=" px-6">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-10 w-auto"
                  src={logo}
                  alt="Your Company"
                />
                <h2 className="mt-5 mb-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                  Resgistro
                </h2>
              </div>

              <div className="">
                <div className="space-y-6" action="#" method="POST">
                  <div>
                    <label className="block text-sm/6 font-medium text-gray-900">
                    Nombre de tu empresa
                    </label>
                    <div className="mt-2">
                      <InputClassic
                        type="text"
                        name={"companyName"}
                        value={form.companyName}
                        onchange={handleChangeText}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm/6 font-medium text-gray-900">
                    Teléfono para pedidos
                    </label>
                    <div className="mt-2">
                      <InputClassic
                        type="text"
                        name={"userPhone"}
                        value={form.userPhone}
                        onchange={handleChangeNum}
                        maxLength={'10'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm/6 font-medium text-gray-900">
                    Responsable del negocio
                    </label>
                    <div className="mt-2">
                      <InputClassic
                        type="text"
                        name={"fullNames"}
                        value={form.fullNames}
                        onchange={handleChangeText}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm/6 font-medium text-gray-900">
                    Correo de contacto
                    </label>
                    <div className="mt-2">
                      <InputClassic
                        typeInputs={!errEmail ? "normal" : "error"}
                        type="text"
                        name={"emailUser"}
                        value={form.emailUser}
                        onchange={handleEmail}
                      />
                    </div>
                  </div>
                  <div className="">
                    <label className="block text-sm/6 font-medium text-gray-900">
                    Crea una contraseña segura
                    </label>
                    <div className="mt-2">
                      <InputClassic
                        typeInputs={
                          form.password == confirmPassword ? "normal" : "error"
                        }
                        type="password"
                        name={"password"}
                        value={form.password}
                        onchange={handleChangeText}
                      />
                      {!showPassword ? (
                        <div className="ml-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#5f6368"
                            onClick={() => setShowPassword((state) => !state)}
                          >
                            <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex items-center ml-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#5f6368"
                            onClick={() => setShowPassword((state) => !state)}
                          >
                            <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                          </svg>
                          <small className="ml-2 text-orange-400 text-[10px]">
                            {form.password}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <label className="block text-sm/6 font-medium text-gray-900">
                    Confirma tu contraseña
                    </label>
                    <div className="mt-2">
                      <InputClassic
                        typeInputs={
                          form.password == confirmPassword ? "normal" : "error"
                        }
                        type="text"
                        name={"password"}
                        value={confirmPassword}
                        onchange={handlePassword}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <ButtonClassic
                      type="store"
                      classe={"w-full"}
                      text="Registrarse ahora"
                      onclick={handleSubmit}
                    />
                  </div>
                </div>
                <p className="mt-10 text-center text-sm/6 text-gray-500 ">
                  <p
                    onClick={() => setShowTerm((state) => !state)}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1 cursor-pointer"
                  >
                    Aceptar términos y condiciones
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
      {showTerm && (
        <ModalTerms handleChangeText={handleChangeText} form={form} setShow={setShowTerm} />
      )}
    </>
  );
};
