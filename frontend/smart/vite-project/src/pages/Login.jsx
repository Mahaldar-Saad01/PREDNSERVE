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

      navigate("/Dashboard");

    } catch (error) {

      console.error("Login failed:", error);
      alert("Invalid email or password");

    }

  };

  return (

//     <div>

//       <h2>Login</h2>

//       <input
//         style={{width:"100%",padding:"10px",marginBottom:"10px"}}
//         placeholder="Email"
//         value={email}
//         onChange={(e)=>setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         style={{width:"100%",padding:"10px",marginBottom:"10px"}}
//         placeholder="Password"
//         value={password}
//         onChange={(e)=>setPassword(e.target.value)}
//       />

//       <button
//         style={{
//           width:"100%",
//           padding:"10px",
//           background:"#28a745",
//           color:"white",
//           border:"none",
//           borderRadius:"5px"
//         }}
//         onClick={handleLogin}
//       >
//         Login
//       </button>

//       <p style={{marginTop:"10px"}}>
//         Don't have an account? <Link to="/register">Register</Link>
//       </p>

//     </div>

//   );

// }
 <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>PredNserve</h1>
        <p style={styles.subtitle}>Smart Food Demand Prediction</p>

        <input
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          style={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleLogin}
        >
          Login
        </button>

        <p style={styles.text}>
          Don't have an account? 
          <Link to="/register" style={styles.link}> Register</Link>
        </p>

      </div>

    </div>
  )
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
    background:"white",
    padding:"40px",
    width:"350px",
    borderRadius:"12px",
    boxShadow:"0 10px 30px rgba(0,0,0,0.2)",
    textAlign:"center"
  },

  title:{
    marginBottom:"5px",
    fontSize:"28px",
    fontWeight:"bold"
  },

  subtitle:{
    marginBottom:"25px",
    color:"gray",
    fontSize:"14px"
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
    background:"#28a745",
    color:"white",
    border:"none",
    borderRadius:"6px",
    fontSize:"16px",
    cursor:"pointer"
  },

  text:{
    marginTop:"15px",
    fontSize:"14px"
  },

  link:{
    color:"#28a745",
    fontWeight:"bold",
    textDecoration:"none"
  }

}


export default Login;