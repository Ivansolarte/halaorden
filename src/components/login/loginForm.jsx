import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { InputClassic } from "../../elements/input/inputClassic";
import { ButtonClassic } from "../../elements/button/buttonClassic";
import icon from "../../assets/icons/shopIcon.ico";
import { handleChange } from "../../utils/handleChange";
import { Login } from "../../services/login.service";

export const LoginForm = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const { form, handleChangeText } = handleChange({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (form.email.trim() !== "" && form.password.trim() !== "") {
      Login(form).then((resp) => {
        const { status, message, data, token } = resp;
        if (status) {
          sessionStorage.setItem("login", JSON.stringify(status));
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("rol", JSON.stringify(data.userRol));
          sessionStorage.setItem("user", JSON.stringify(data));
          setLoggedIn(true);
          navigate("/");
          return;
        }
        alert("Usuario no existe");
      });
      return;
    } else {
      alert("tienes que completar campos");
      return;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center px-6 py-12 lg:px-8  h-screen">
        <div className=" sm:w-[480px] md:w-[550px] lg:w-[500px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <img
              className="mx-auto h-10 w-auto"
              src={icon}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Iniciar sesión
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm/6 font-medium text-gray-900">
                  Correo electronico
                </label>
                <div className="mt-2">
                  <InputClassic
                    name={"email"}
                    value={form.email}
                    onchange={handleChangeText}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Contraseña
                  </label>
                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-green-600 hover:text-green-400"
                    >
                     ¿Olvidó la contraseña?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <InputClassic
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

              <div className=" text-center ">
                <ButtonClassic
                  classe={"w-full"}
                  type={"store"}
                  text={"Enviar"}
                  onclick={handleSubmit}
                />
              </div>
            </div>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              <Link
                className="font-semibold text-indigo-600 hover:text-indigo-500 hover:text-base"
                to="/?"
              >
                Volver
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
