// const URL = `http://localhost:3000/login`;
import { URL_PRE } from "../constant";
const URL = `${URL_PRE}/login`;

export const Login = async (payload) => {
  const body = {
    method: "POST",
    headers: { 
        "Content-Type": "application/json" ,
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
  };
  const resp = await fetch(URL, body);
  const data = await resp.json();
  return data;
};
