
import { API_URL } from "../constant";
const URL = `${API_URL}/login`;

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
