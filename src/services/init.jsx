import { API_URL } from "../constant";
const URL = `${API_URL}/creator`;

export const init = async () => {
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