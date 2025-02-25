import { useEffect, useState } from "react";
import { InputClassic } from "../../../elements/input/inputClassic";
import { RadioButton } from "../../../elements/button/radioButton";
import { ButtonClassic } from "../../../elements/button/buttonClassic";
import { getByUserId } from "../../../services/store.service";
import { StoreCard } from "./storeCard";
import { StoreEdit } from "./storeEdit";
import { handleChange } from "../../../utils/handleChange";
import { postStores } from "../../../services/store.service";
import { ModalAuthExp } from "../../modals/modalAuthExp";
import { ModalInformation } from "../../modals/modalInformation";

export const Stores = () => {
  const userSession = sessionStorage.getItem("user");
  const userS = JSON.parse(userSession) 
  console.log(userS._id);
  
  const interfaceStore = {
    userId: userS?._id,
    companyName: "",
    companyDescription: "",
    companyEmail: "",
    companyPhone: "",
    companyNit: "",
    companyType: "pro",
    companyLogo: "",
    companyStatus: true,
    companyTermConditions: "",
  };
  const { form, setForm, handleChangeNum, handleChangeText } =
    handleChange(interfaceStore);
  const [addButtonState, setAddButtonState] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [arrayStore, setArrayStore] = useState([]);
  const [editaModal, setEditaModal] = useState(false);
  const [modalToken, setModalToken] = useState(false);
  const [modalInform, setModalInform] = useState(false);

  const getInformation = () => {
    getByUserId(userS?._id)
      .then((resp) => {
        if (resp.status === true) {
          setArrayStore(resp.data);
          return;
        }
        if (resp.status == 401) {
          setModalToken(true);
          return;
        }
        setModalInform(true);
      })
      .catch(() => {
        setModalInform(true);
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, companyLogo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const editStore = (payload) => {
    setEditForm(payload);
    setEditaModal(true);
  };

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

  const OnSubmit = () => {
    console.log(form);

    const isFormComplete = Object.entries(form).every(([key, value]) => {
      if (key === "companyStatus") return true;
      return (
        value !== undefined && value !== null && value.toString().trim() !== ""
      );
    });
    if (form.companyTermConditions == "false") {
      alert("tienes que aceptar los terminos y condicones");
      return;
    }
    if (!isFormComplete) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    postStores(form).then((resp) => {
      setAddButtonState((state) => !state);
      setForm(interfaceStore);
      getInformation();
    });
  };

  useEffect(() => {
    getInformation();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-extrabold text-gray-900">Tiendas</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Esta información se mostrará públicamente, así que tenga cuidado con
            lo que comparte. Cada cuenta creada solo puede registrar un máximo
            de tres tiendas.
          </p>
          <div className="mt-5">
            <ButtonClassic
              disabled={addButtonState}
              text={"+"}
              onclick={() => setAddButtonState((state) => !state)}
              disabled={arrayStore?.length < 3 ? false : true}
            />
          </div>
          {addButtonState ? (
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-1 sm:col-span-6  w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  *Nombre de la tienda
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <InputClassic
                      name={"companyName"}
                      value={form.companyName}
                      onchange={handleChangeText}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  *Descripción sobre la tienda
                </label>
                <div className="mt-2">
                  <textarea
                    value={form.companyDescription}
                    onChange={handleChangeText}
                    name="companyDescription"
                    id="companyDescription"
                    rows="3"
                    className="block  w-full border border-yellow-200 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-300 sm:text-sm/6"
                  ></textarea>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-6  w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  *Correo electronico de la tienda
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <InputClassic
                      name={"companyEmail"}
                      value={form.companyEmail}
                      onchange={handleChangeText}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-3  w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  *No. celular donde llegara los pedidos
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <InputClassic
                      name={"companyPhone"}
                      value={form.companyPhone}
                      onchange={handleChangeNum}
                      maxLength={"10"}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-3  w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  No. NIT "si es que lo tiene"
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <InputClassic
                      name={"companyNit"}
                      value={form.companyNit}
                      onchange={handleChangeText}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-6  w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  *¿qué vas a publicar?
                </label>
                <div className="mt-2   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                  <div className="flex flex-col items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48px"
                      viewBox="0 -960 960 960"
                      width="48px"
                      fill="#5f6368"
                    >
                      <path d="M446.67-163.67V-461l-260-150.33V-314l260 150.33Zm66.66 0 260-150.33v-298l-260 151v297.33ZM446.67-87 153.33-256q-15.66-9-24.5-24.33-8.83-15.34-8.83-33.34v-332.66q0-18 8.83-33.34 8.84-15.33 24.5-24.33l293.34-169q15.66-9 33.33-9 17.67 0 33.33 9l293.34 169q15.66 9 24.5 24.33 8.83 15.34 8.83 33.34v332.66q0 18-8.83 33.34-8.84 15.33-24.5 24.33L513.33-87q-15.66 9-33.33 9-17.67 0-33.33-9Zm196-526 93.66-54L480-815.33 386-761l256.67 148ZM480-518l95.33-55.67-257-148.33L223-667l257 149Z" />
                    </svg>
                    <label>
                      <RadioButton
                        classs={"ml-2"}
                        name={"companyType"}
                        value={"pro"}
                        onchange={handleChangeText}
                        checked={form.companyType == "pro"}
                      />
                      productos
                    </label>
                  </div>
                  <div className="flex flex-col items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48px"
                      viewBox="0 -960 960 960"
                      width="48px"
                      fill="#5f6368"
                    >
                      <path d="M413-182v-227l57-168q2-7 8-12t17-5h303q11 0 16.5 4.5T823-577l57 168v227q0 9.31-6.35 15.65Q867.31-160 858-160h-22.26q-8.74 0-15.24-6.35-6.5-6.34-6.5-15.65v-45H479v45q0 9.31-6.35 15.65Q466.31-160 457-160h-22.26q-8.74 0-15.24-6.35-6.5-6.34-6.5-15.65Zm53-257h361l-38-115H504l-38 115Zm-13 40v132-132Zm67 106q16.58 0 27.79-11.21T559-332q0-16.58-11.21-27.79T520-371q-16.58 0-27.79 11.21T481-332q0 16.58 11.21 27.79T520-293Zm253 0q16.58 0 27.79-11.21T812-332q0-16.58-11.21-27.79T773-371q-16.58 0-27.79 11.21T734-332q0 16.58 11.21 27.79T773-293ZM164-160v-21l57-57q-57 0-99-34.5T80-361v-328q0-66 52-88.5T338-800q143 0 200.5 24.5T596-689v65h-60v-77H140v269h243v272H164Zm27-162q16.57 0 27.79-11.21Q230-344.42 230-361t-11.21-27.79Q207.57-400 191-400t-27.79 11.21Q152-377.58 152-361t11.21 27.79Q174.43-322 191-322Zm262 55h387v-132H453v132Z" />
                    </svg>
                    <label>
                      <RadioButton
                        classs={"ml-2"}
                        name={"companyType"}
                        value={"ve"}
                        onchange={handleChangeText}
                        checked={form.companyType == "ve"}
                      />
                      vehículos
                    </label>
                  </div>
                  <div className="flex flex-col items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48px"
                      viewBox="0 -960 960 960"
                      width="48px"
                      fill="#5f6368"
                    >
                      <path d="M697-623h60v-60h-60v60Zm0 171h60v-60h-60v60Zm0 170h60v-60h-60v60Zm-56 162v-60h219v-600H465v112l-60-42v-130h515v720H641Zm-601 0v-390l271-194 270 194v390H364v-201H258v201H40Zm60-60h98v-201h226v201h97v-299L311-630 100-478.58V-180Zm541-365ZM424-180v-201H198v201-201h226v201Z" />
                    </svg>
                    <label>
                      <RadioButton
                        classs={"ml-2"}
                        name={"companyType"}
                        value={"inm"}
                        onchange={handleChangeText}
                        checked={form.companyType == "inm"}
                      />
                      Inmuebles
                    </label>
                  </div>
                  <div className="flex flex-col items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48px"
                      viewBox="0 -960 960 960"
                      width="48px"
                      fill="#5f6368"
                    >
                      <path d="M440-120v-60h340v-304q0-123.69-87.32-209.84Q605.36-780 480-780q-125.36 0-212.68 86.16Q180-607.69 180-484v244h-20q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v69q0 24.75-17.62 42.37Q804.75-120 780-120H440Zm-80.18-290q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5Zm240 0q-12.82 0-21.32-8.68-8.5-8.67-8.5-21.5 0-12.82 8.68-21.32 8.67-8.5 21.5-8.5 12.82 0 21.32 8.68 8.5 8.67 8.5 21.5 0 12.82-8.68 21.32-8.67 8.5-21.5 8.5ZM241-462q-7-106 64-182t177-76q87 0 151 57.5T711-519q-89-1-162.5-50T434.72-698Q419-618 367.5-555.5T241-462Z" />
                    </svg>
                    <label>
                      <RadioButton
                        classs={"ml-2"}
                        name={"companyType"}
                        value={"se"}
                        onchange={handleChangeText}
                        checked={form.companyType == "se"}
                      />
                      Servicios
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-span-full ">
                <label className="block text-sm/6 font-medium text-gray-900">
                  *Logo de la empresa
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <svg
                    className="size-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    className="hidden"
                    onChange={handleImageUpload} // Llamar a la función al seleccionar un archivo
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                    onClick={() => document.getElementById("fileInput").click()} // Simula el clic en el input de archivo
                  >
                    Change
                  </button>
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-4 col-span-full">
                <h2 className="text-base/7 font-semibold text-red-500">
                  Notificación
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  <p className="font-bold">Al marcar esta opción</p> Aceptas que
                  los datos ingresados deben ser verídicos y precisos, evitando
                  el uso de nombres falsos, inapropiados, ofensivos o
                  insultantes. También aceptas recibir mensajes de WhatsApp
                  sobre tus pedidos en el número registrado, el cual será el
                  medio de contacto para la entrega de los productos o servicios
                  que publiques o adquieras. La plataforma no se hace
                  responsable del uso que los usuarios den a esta información ni
                  de cualquier otro propósito distinto al previsto en la
                  plataforma. Asimismo, la plataforma no asume ninguna
                  responsabilidad sobre transacciones, pagos, reclamos o
                  disputas entre usuarios, propietarios de tiendas o clientes.
                  Su único propósito es permitir la publicación de productos y
                  servicios que no infrinjan la ley de Colombia. Cualquier
                  incumplimiento o falsedad en la información ingresada será
                  responsabilidad exclusiva del usuario o del dueño de la tienda
                  registrada. En caso de que las autoridades competentes
                  realicen investigaciones o apliquen sanciones, el usuario o
                  propietario de la tienda será el único responsable de las
                  consecuencias legales que esto conlleve.
                </p>
                <label className="flex items-center">
                  <div>
                    <InputClassic
                      className="accent-red-600"
                      name="companyTermConditions"
                      type="checkbox"
                      onchange={handleTerms}
                      checked={form.companyTermConditions == "true"}
                    />
                  </div>
                  <p className="ml-2">Acepto</p>
                </label>
                <div className="mt-10 space-y-10"></div>
              </div>
              <div className=" col-span-full text-center ">
                <ButtonClassic
                  type="error"
                  text={"Cerrar"}
                  onclick={() => setAddButtonState((state) => !state)}
                />
                <ButtonClassic text={"Enviar"} onclick={OnSubmit} />
              </div>
              {/* <div className="col-span-full">
              <label   className="block text-sm/6 font-medium text-gray-900">Cover photo</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                  </svg>
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label   className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                      <span>Upload a file</span>
                      <InputClassic/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div> */}
            </div>
          ) : (
            <div className="mt-10">
              <div className=" flex justify-center">
                <ul role="list" className="divide-y divide-gray-100 w-full  h-[100px] sm:w-[75%] border border-blue-400 border-2 ">
                  {arrayStore.map((item, index) => (
                    <StoreCard
                      key={index}
                      data={item}
                      editStore={editStore}
                      getInformation={getInformation}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-900/10 pb-12"></div>
      </div>
      {editaModal && (
        <StoreEdit
          setEditaModal={setEditaModal}
          data={editForm}
          getInformation={getInformation}
        />
      )}
      {modalToken && <ModalAuthExp setModal={setModalToken} />}
      {modalInform && (
        <ModalInformation type={true} setModal={setModalInform} />
      )}
    </>
  );
};
