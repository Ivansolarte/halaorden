

import { API_URL } from "../constant";
const URL = `${API_URL}/Product`;

//los productos 
export const getAllProducts = async (id) => {
  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const resp = await fetch(URL, body);
  const data = await resp.json();
  return data;
}
//los productos segun la tienda para publico
export const getProducts = async (id) => {
  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //no necesita token
    },
  };
  const resp = await fetch(`${URL}/${id}/public`, body);
  const data = await resp.json();
  return data;
}


export const postProduct = async (payload) => {
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

export const getProductsByIdUserId = async (payload) => {
  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const resp = await fetch(`${URL}?id=${payload.storeId}&userId=${payload.userId}`, body);
  const data = await resp.json();
  return data;
};

export const patchProduct = async (payload) => {
  console.log(payload);
  
  const body = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  const resp = await fetch(`${URL}/${payload._id}`, body);
  const data = await resp.json();
  return data;
};

export const deleteProduct = async (id) => {
    
  const body = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const resp = await fetch(`${URL}/${id}`, body);
  const data = await resp.json();
  return data;
};