import { useState, useEffect } from "react";
import { handleChange } from "../../../utils/handleChange";
import { postProduct } from "../../../services/product.service";
import { incrypto } from "../../../utils/crypto";
import { AdminProduct } from "./adminProduct";
import { RegisterProduct } from "./registerProduct";
import { UserProduct } from "./userProduct";

export const Product = () => {
  const userS = incrypto(sessionStorage.getItem("user"));
  // console.log(userS);

  const interfaceProducto = {
    userId: userS._id,
    storeId: "",
    productName: "",
    productPrice: "",
    productImgUrl: [],
    productDescription: "",
    productTerms: "",
    productReference: "",
    productState: "true",
  };
  const { form, setForm, handleChangeText, handleChangeNum } =
    handleChange(interfaceProducto);

  const [dataProduct, setDataProduct] = useState({});
  const [addButtonState, setAddButtonState] = useState(false);
  const [arrayStore, setArrayStore] = useState([]);

  const [activeTab, setActiveTab] = useState(0);

  const handleAddProduct = (e) => {
    setForm((prev) => ({ ...prev, storeId: e.storeId }));
    setAddButtonState((state) => !state);
  };

  const closeProduct = () => {
    setAddButtonState((state) => !state);
    setForm(interfaceProducto);
  };

  const editProduct = () => {};

  const addImgUrls = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB en bytes

    console.log(`📥 Imagen seleccionada (${idx}):`, {
      name: file.name,
      type: file.type,
      originalSize: `${(file.size / 1024).toFixed(2)} KB`,
    });

    if (file.size > maxSize) {
      alert("La imagen es demasiado grande. Debe ser menor a 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Escalar a 300x300 px manteniendo proporción
        const scale = Math.min(300 / width, 300 / height);
        width *= scale;
        height *= scale;

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a JPEG con 50% de calidad
        const base64Image = canvas.toDataURL("image/jpeg", 0.5);

        console.log(`📤 Imagen después de conversión (${idx}):`, {
          name: file.name,
          type: "image/jpeg",
          convertedSize: `${((base64Image.length * (3 / 4)) / 1024).toFixed(
            2
          )} KB`,
          base64: base64Image.substring(0, 50) + "...",
        });

        setForm((prev) => {
          // Asegurar que productImgUrl existe como array
          const updatedUrls = [...(prev.productImgUrl || [])];
          updatedUrls[idx] = base64Image; // Usa `idx` directamente

          // Almacenar nombres de archivos en un array separado
          const updatedNames = [
            ...(prev.productReference
              ? prev.productReference.split("-").map((n) => n.replace("#", ""))
              : []),
          ];
          updatedNames[idx] = file.name.split(".")[0]; // Guarda el nombre correcto sin extensión

          // Crear el nuevo productReference con nombres de imágenes
          const updatedReferences = updatedNames
            .map((name) => `#${name}`)
            .join("-");

          return {
            ...prev,
            productImgUrl: updatedUrls,
            productReference: updatedReferences,
          };
        });
      };
    };
  };

  const onsubmit = () => {
    const excludedFields = [
      "userId",
      "productState",
      "productTerms",
      "productImgUrl",
      "productReference",
    ];
    const emptyFields = Object.entries(form)
      .filter(
        ([key, value]) =>
          !excludedFields.includes(key) && !value.toString().trim()
      )
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      alert(
        `Los siguientes campos no pueden estar vacíos: ${emptyFields.join(
          ", "
        )}`
      );
      return;
    }
   

    if (form.productImgUrl.length !== 2) {
      alert("Debe agregar dos imágenes con URLs válidas.");
      return;
    }

    if (form.productTerms == "false") {
      alert(
        "para registrar un prodcuto es necesario aceptar los términos y condiciones"
      );
      return;
    }

    postProduct(form).then((resp) => {
      console.log(resp);
      setAddButtonState((state) => !state);
      setForm(interfaceProducto);
    });
  };

  useEffect(() => {
    console.log("creando formulario producto");
    return () => {
      console.log("desctruido formulario producto");

      // setForm(interfaceProducto);
    };
  }, []);
console.log(form);

  return (
    <>
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-extrabold text-gray-900">Productos</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Al subir imágenes e información de productos, confirmas que eres el
            propietario o tienes los derechos para usarlos. Serás responsable de
            cualquier reclamo de terceros sobre el contenido publicado.
          </p>
          {addButtonState && (
            <RegisterProduct 
            form={form}
            setForm={setForm}
            setAddButtonState={setAddButtonState}  
            handleChangeText={handleChangeText} 
            handleChangeNum={handleChangeNum}/>
          )}

          {userS.userRol == "ADMIN" && !addButtonState && (
            <AdminProduct setAddButtonState={setAddButtonState} setAddForm={setForm} />
          )}
          {userS.userRol == "Client" && !addButtonState && (
            <UserProduct
              setAddButtonState={setAddButtonState}
              setForm={setForm}
            />
          )}
        </div>
      </div>
    </>
  );
};
