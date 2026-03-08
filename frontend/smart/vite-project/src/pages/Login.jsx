import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    if(!email || !password){
      alert("Please enter email and password");
      return;
    }

    try {

      const formData = new FormData();
      formData.append("username", email);   // backend expects 'username'
      formData.append("password", password);

      const response = await API.post("/login", formData);

      const token = response.data.access_token;

      localStorage.setItem("token", token);

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {

      console.error("Login failed:", error);
      alert("Invalid email or password");

    }

  };

  return (

    <div>

      <h2>Login</h2>

      <input
        style={{width:"100%",padding:"10px",marginBottom:"10px"}}
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        style={{width:"100%",padding:"10px",marginBottom:"10px"}}
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        style={{
          width:"100%",
          padding:"10px",
          background:"#28a745",
          color:"white",
          border:"none",
          borderRadius:"5px"
        }}
        onClick={handleLogin}
      >
        Login
      </button>

      <p style={{marginTop:"10px"}}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

    </div>

  );

}

export default Login;