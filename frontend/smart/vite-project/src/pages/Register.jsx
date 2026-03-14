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
<div style={styles.container}>

  <div style={styles.card}>

    <h2 style={styles.title}>Create Account</h2>
    <p style={styles.subtitle}>Register to start using PredNserve</p>

    <input
      style={styles.input}
      placeholder="Username"
      onChange={(e)=>setUsername(e.target.value)}
    />

    <input
      style={styles.input}
      placeholder="Email Address"
      onChange={(e)=>setEmail(e.target.value)}
    />

    <input
      type="password"
      style={styles.input}
      placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)}
    />

    <button
      style={styles.button}
      onClick={handleSubmit}
    >
      Register
    </button>

    <p style={styles.text}>
      Already have an account?
      <Link to="/" style={styles.link}> Login</Link>
    </p>

  </div>

</div>
    // <div>

    //   <h2>Register</h2>

    //   <input
    //     style={{width:"100%",padding:"10px",marginBottom:"10px"}}
    //     placeholder="Username"
    //     onChange={(e)=>setUsername(e.target.value)}
    //   />

    //   <input
    //     style={{width:"100%",padding:"10px",marginBottom:"10px"}}
    //     placeholder="Email"
    //     onChange={(e)=>setEmail(e.target.value)}
    //   />

    //   <input
    //     type="password"
    //     style={{width:"100%",padding:"10px",marginBottom:"10px"}}
    //     placeholder="Password"
    //     onChange={(e)=>setPassword(e.target.value)}
    //   />

    //   <button
    //     style={{
    //       width:"100%",
    //       padding:"10px",
    //       background:"#007BFF",
    //       color:"white",
    //       border:"none",
    //       borderRadius:"5px"
    //     }}
    //     onClick={handleSubmit}
    //   >
    //     Register
    //   </button>

    // </div>

  );

}
const styles = {

container:{
  height:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"linear-gradient(135deg,#1f4037,#99f2c8)"
},

card:{
  width:"350px",
  background:"white",
  padding:"35px",
  borderRadius:"10px",
  boxShadow:"0 10px 25px rgba(0,0,0,0.1)",
  textAlign:"center"
},

title:{
  marginBottom:"5px"
},

subtitle:{
  fontSize:"14px",
  color:"gray",
  marginBottom:"20px"
},

input:{
  width:"100%",
  padding:"12px",
  marginBottom:"15px",
  border:"1px solid #ddd",
  borderRadius:"6px",
  fontSize:"14px"
},

button:{
  width:"100%",
  padding:"12px",
  background:"#007BFF",
  color:"white",
  border:"none",
  borderRadius:"6px",
  fontSize:"15px",
  cursor:"pointer"
},

text:{
  marginTop:"15px",
  fontSize:"14px"
},

link:{
  color:"#007BFF",
  textDecoration:"none",
  fontWeight:"bold"
}

}

export default Register;