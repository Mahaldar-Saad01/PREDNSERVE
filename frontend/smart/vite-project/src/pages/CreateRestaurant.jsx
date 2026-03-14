import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateRestaurant(){

  const navigate = useNavigate();
  const [resName,setResName] = useState("");

  const handleSubmit = async () => {

    if(!resName){
      alert("Enter restaurant name");
      return;
    }

    try{

      const response = await API.post("/add_restaurant", {
        res_name: resName
      });

      const generatedId = response.data.res_id;

      console.log(response.data);

      alert("Restaurant created");

      // redirect to dataset upload page
      navigate(`/upload-dataset/${generatedId}`);

    }
    catch(error){

      console.error("Error creating restaurant:", error);
      alert("Failed to create restaurant");

    }

  };

  return(
<div style={styles.container}>

  <div style={styles.card}>

    <h2 style={styles.title}>Create Restaurant</h2>

    <p style={styles.subtitle}>
      Add a new restaurant to start demand prediction
    </p>

    <input
      style={styles.input}
      placeholder="Restaurant Name"
      value={resName}
      onChange={(e)=>setResName(e.target.value)}
    />

    <button
      style={styles.button}
      onClick={handleSubmit}
    >
      Create Restaurant
    </button>

  </div>

</div>
    // <div>

    //   <h2>Create Restaurant</h2>

    //   <input
    //     placeholder="Restaurant Name"
    //     value={resName}
    //     onChange={(e)=>setResName(e.target.value)}
    //   />

    //   <br/><br/>

    //   <button onClick={handleSubmit}>
    //     Create Restaurant
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
  background:"#f4f6f9"
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
  marginBottom:"10px"
},

subtitle:{
  color:"gray",
  fontSize:"14px",
  marginBottom:"20px"
},

input:{
  width:"100%",
  padding:"12px",
  border:"1px solid #ddd",
  borderRadius:"6px",
  marginBottom:"20px",
  fontSize:"14px"
},

button:{
  width:"100%",
  padding:"12px",
  background:"#6f42c1",
  color:"white",
  border:"none",
  borderRadius:"6px",
  fontSize:"15px",
  cursor:"pointer"
}

}
export default CreateRestaurant;