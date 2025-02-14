import { URL_PRE } from "../constant";
const URL = `${URL_PRE}/user`;

export const putProfile = async (payload) => {

  const body = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  };
  const resp = await fetch(`${URL}/${payload._id}`, body);
  const data = await resp.json();
  return data;

}