
import { API_URL } from "../constant";
const URL = `${API_URL}/store`;

export const getAllStores = async () => {
  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const resp = await fetch(URL, body);
  const data = await resp.json();
  return data;
};
export const getAllStoresForPublic = async () => {
  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const resp = await fetch(`${URL}/public`, body);
  const data = await resp.json();
  return data;
};

export const getById = async (id) => {
  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const resp = await fetch(`${URL}/${id}`, body);
  const data = await resp.json();
  return data;
};

export const getByUserId = async (userId) => {
  const body = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const resp = await fetch(`${URL}?userId=${userId}`, body);
  const data = await resp.json();
  return data;
};

export const postStores = async (payload) => {
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

export const upDateStore =async (payload) => {
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
}

export const deleteStore =async (payload) => {
    const body = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const resp = await fetch(`${URL}/${payload}/deactivate`, body);
      const data = await resp.json();
      return data;
}
