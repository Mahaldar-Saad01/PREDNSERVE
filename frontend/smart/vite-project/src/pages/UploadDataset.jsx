import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function UploadDataset(){

  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if(!file){
      alert("Please select a dataset file");
      return;
    }

    try{

      const formData = new FormData();
      formData.append("file", file);

      const response = await API.post(
        `/ml/restaurants/${id}/upload-dataset`,
        formData
      );

      console.log("Upload response:", response.data);

      alert("Dataset uploaded successfully");

      // now train the model
      const trainResponse = await API.post(
        `/ml/restaurants/${id}/train-model`
      );

      console.log("Training response:", trainResponse.data);

      alert("Model trained successfully");

      navigate(`/predict-sales/${id}`);

    }
    catch(error){

      console.error("Upload/Training failed:", error);
      alert("Dataset upload or training failed");

    }

  };

  return(
<div style={styles.container}>

  <div style={styles.card}>

    <h2 style={styles.title}>Upload Dataset</h2>
    <p style={styles.subtitle}>Restaurant ID: {id}</p>

    <div style={styles.uploadBox}>

      <p>Select your dataset file</p>

      <input
        type="file"
        accept=".csv,.xlsx"
        style={styles.fileInput}
        onChange={(e)=>setFile(e.target.files[0])}
      />

      {file && (
        <p style={styles.fileName}>
          Selected: {file.name}
        </p>
      )}

    </div>

    <button
      style={styles.button}
      onClick={handleUpload}
    >
      Upload Dataset
    </button>

  </div>

</div>
    // <div>

    //   <h2>Upload Dataset</h2>

    //   <h3>Restaurant ID: {id}</h3>

    //   <input
    //     type="file"
    //     accept=".csv,.xlsx"
    //     onChange={(e)=>setFile(e.target.files[0])}
    //   />

    //   <br/><br/>

    //   <button onClick={handleUpload}>
    //     Upload Dataset
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
  width:"420px",
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
  color:"gray",
  marginBottom:"20px"
},

uploadBox:{
  border:"2px dashed #ccc",
  padding:"25px",
  borderRadius:"8px",
  marginBottom:"20px"
},

fileInput:{
  marginTop:"10px"
},

fileName:{
  marginTop:"10px",
  fontSize:"14px",
  color:"#555"
},

button:{
  width:"100%",
  padding:"12px",
  background:"#007bff",
  color:"white",
  border:"none",
  borderRadius:"6px",
  fontSize:"15px",
  cursor:"pointer"
}

}

export default UploadDataset;