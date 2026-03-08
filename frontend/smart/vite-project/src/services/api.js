// const BASE_URL = "http://127.0.0.1:8000";
// export async function registerUser(data){

//   const response = await fetch(`${BASE_URL}/home/register_user`,{
//     method:"POST",
//     headers:{
//       "Content-Type":"application/json"
//     },
//     body:JSON.stringify(data)
//   });

//   return response.json();
// }


// export async function loginUser(formData){

//   const response = await fetch(`${BASE_URL}/login`,{
//     method:"POST",
//     body:formData
//   });

//   return response.json();
// }


// export async function addRestaurant(data,token){

//   const response = await fetch(`${BASE_URL}/add_restaurant`,{
//     method:"POST",
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":`Bearer ${token}`
//     },
//     body:JSON.stringify(data)
//   });

//   return response.json();
// }
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;