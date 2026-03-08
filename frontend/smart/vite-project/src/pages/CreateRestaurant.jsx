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

    <div>

      <h2>Create Restaurant</h2>

      <input
        placeholder="Restaurant Name"
        value={resName}
        onChange={(e)=>setResName(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleSubmit}>
        Create Restaurant
      </button>

    </div>

  );

}

export default CreateRestaurant;