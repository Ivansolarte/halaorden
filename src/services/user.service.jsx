import { API_URL } from "../constant";
const URL = `${API_URL}/user`;

export const getUsers = async (payload) => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  const payloadBase64 = token.split(".")[1];
  const payloadDecoded = JSON.parse(atob(payloadBase64));

  const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  const exp = payloadDecoded.exp; // Tiempo de expiración del token

  if (exp - now <= 5 * 60) {
    const tiempoPasadoMinutos = Math.abs(Math.floor((now - exp) / 60)); // Convertimos a minutos

    if (now > exp) {
      alert(`El token expiró hace ${tiempoPasadoMinutos} minutos.`);
    } else {
      alert(`El token expirará en ${tiempoPasadoMinutos} minutos.`);
    }
  }

  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  };
  const resp = await fetch(URL, body);
  const data = await resp.json();
  return data;
};

export const putProfile = async (payload) => {
  const body = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  };
  const resp = await fetch(`${URL}${payload._id}`, body);
  const data = await resp.json();
  return data;
};

export const postRegister = async (payload) => {
  const body = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  const resp = await fetch(URL, body);
  const data = await resp.json();
  return data;
};
