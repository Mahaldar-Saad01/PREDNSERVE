import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register(){

  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async () => {
   try {

  const response = await API.post("/home/register_user", {
    username: username,
    email: email,
    password: password
  });

  console.log(response.data);

  alert("Account created successfully");

  navigate("/");

} catch (error) {

  console.error("Registration error:", error);
  alert("Registration failed");

}
  };

  return (

    <div>

      <h2>Register</h2>

      <input
        style={{width:"100%",padding:"10px",marginBottom:"10px"}}
        placeholder="Username"
        onChange={(e)=>setUsername(e.target.value)}
      />

      <input
        style={{width:"100%",padding:"10px",marginBottom:"10px"}}
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        style={{width:"100%",padding:"10px",marginBottom:"10px"}}
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        style={{
          width:"100%",
          padding:"10px",
          background:"#007BFF",
          color:"white",
          border:"none",
          borderRadius:"5px"
        }}
        onClick={handleSubmit}
      >
        Register
      </button>

    </div>

  );

}

export default Register;