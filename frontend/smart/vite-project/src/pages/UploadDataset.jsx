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

    <div>

      <h2>Upload Dataset</h2>

      <h3>Restaurant ID: {id}</h3>

      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <br/><br/>

      <button onClick={handleUpload}>
        Upload Dataset
      </button>

    </div>

  );

}

export default UploadDataset;