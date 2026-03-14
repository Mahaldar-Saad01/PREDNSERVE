import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function PredictSales(){

  const { id } = useParams();

  const [formData,setFormData] = useState({
    temperature:"",
    day_of_week:"",
    weather:"",
    event:"",
    is_weekend:"",
    promotion:""
  });

  const [prediction,setPrediction] = useState(null);

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePredict = async () => {

    try{

      const response = await API.post(
        `/ml/restaurants/${id}/predict`,
        formData
      );

      console.log("Prediction result:", response.data);

      setPrediction(response.data.menu_predictions);

    }
    catch(error){

      console.error("Prediction error:", error);
      alert("Prediction failed");

    }

  };

  return(
<div style={styles.container}>

  <div style={styles.card}>

    <h2 style={styles.title}>Predict Sales</h2>
    <p style={styles.subtitle}>Restaurant ID: {id}</p>

    <div style={styles.grid}>

      <input
        type="number"
        name="temperature"
        placeholder="Temperature"
        style={styles.input}
        onChange={handleChange}
      />

      <select name="day_of_week" style={styles.input} onChange={handleChange}>
        <option value="">Select Day</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>

      <select name="weather" style={styles.input} onChange={handleChange}>
        <option value="">Weather</option>
        <option>Sunny</option>
        <option>Cloudy</option>
        <option>Rainy</option>
        <option>Stormy</option>
      </select>

      <select name="event" style={styles.input} onChange={handleChange}>
        <option value="">Event</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <select name="is_weekend" style={styles.input} onChange={handleChange}>
        <option value="">Weekend</option>
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>

      <select name="promotion" style={styles.input} onChange={handleChange}>
        <option value="">Promotion</option>
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>

    </div>

    <button style={styles.button} onClick={handlePredict}>
      Predict Sales
    </button>

  </div>


  {prediction && (

    <div style={styles.resultSection}>

      <h3>Menu Predictions</h3>

      <div style={styles.resultGrid}>

        {prediction.map((item,index)=>(

          <div key={index} style={styles.resultCard}>

            <h4>{item.menu_item}</h4>

            <p>Predicted Sales: <b>{item.predicted_sales}</b></p>
            <p>Production: <b>{item.production}</b></p>
            <p>Wastage: <b>{item.wastage}</b></p>

          </div>

        ))}

      </div>

    </div>

  )}

</div>
  //   <div>

  //     <h2>Predict Sales</h2>

  //     <h3>Predict Sales for Restaurant ID: {id}</h3>

  //     {/* Temperature */}
  //     <input
  //       type="number"
  //       name="temperature"
  //       placeholder="Temperature"
  //       onChange={handleChange}
  //     />

  //     <br/><br/>

  //     {/* Day of Week */}
  //     <p>Day of Week</p>
  //     <label><input type="radio" name="day_of_week" value="Monday" onChange={handleChange}/> Monday</label>
  //     <label><input type="radio" name="day_of_week" value="Tuesday" onChange={handleChange}/> Tuesday</label>
  //     <label><input type="radio" name="day_of_week" value="Wednesday" onChange={handleChange}/> Wednesday</label>
  //     <label><input type="radio" name="day_of_week" value="Thursday" onChange={handleChange}/> Thursday</label>
  //     <label><input type="radio" name="day_of_week" value="Friday" onChange={handleChange}/> Friday</label>
  //     <label><input type="radio" name="day_of_week" value="Saturday" onChange={handleChange}/> Saturday</label>
  //     <label><input type="radio" name="day_of_week" value="Sunday" onChange={handleChange}/> Sunday</label>

  //     <br/><br/>

  //     {/* Weather */}
  //     <p>Weather</p>
  //     <label><input type="radio" name="weather" value="Sunny" onChange={handleChange}/> Sunny</label>
  //     <label><input type="radio" name="weather" value="Cloudy" onChange={handleChange}/> Cloudy</label>
  //     <label><input type="radio" name="weather" value="Rainy" onChange={handleChange}/> Rainy</label>
  //     <label><input type="radio" name="weather" value="Stormy" onChange={handleChange}/> Stormy</label>

  //     <br/><br/>

  //     {/* Event */}
  //     <p>Event</p>
  //     <label><input type="radio" name="event" value="Yes" onChange={handleChange}/> Yes</label>
  //     <label><input type="radio" name="event" value="No" onChange={handleChange}/> No</label>

  //     <br/><br/>

  //     {/* Weekend */}
  //     <p>Is Weekend</p>
  //     <label><input type="radio" name="is_weekend" value="1" onChange={handleChange}/> Yes</label>
  //     <label><input type="radio" name="is_weekend" value="0" onChange={handleChange}/> No</label>

  //     <br/><br/>

  //     {/* Promotion */}
  //     <p>Promotion</p>
  //     <label><input type="radio" name="promotion" value="1" onChange={handleChange}/> Yes</label>
  //     <label><input type="radio" name="promotion" value="0" onChange={handleChange}/> No</label>

  //     <br/><br/>

  //     <button onClick={handlePredict}>
  //       Predict Sales
  //     </button>

  //     {prediction && (
  //       <div style={{marginTop:"20px"}}>
  //         <h3>Menu Predictions</h3>

  //         {prediction.map((item,index)=>(
  //           <div key={index}>
  //             <p><b>{item.menu_item}</b></p>
  //             <p>Predicted Sales: {item.predicted_sales}</p>
  //             <p>Production: {item.production}</p>
  //             <p>Wastage: {item.wastage}</p>
  //             <hr/>
  //           </div>
  //         ))}

  //       </div>
  //     )}

  //   </div>

   );

}
const styles = {

container:{
  padding:"40px",
  background:"#f4f6f9",
  minHeight:"100vh"
},

card:{
  background:"white",
  padding:"30px",
  borderRadius:"10px",
  boxShadow:"0 5px 15px rgba(0,0,0,0.1)",
  maxWidth:"700px",
  margin:"auto"
},

title:{
  marginBottom:"5px"
},

subtitle:{
  color:"gray",
  marginBottom:"20px"
},

grid:{
  display:"grid",
  gridTemplateColumns:"repeat(2,1fr)",
  gap:"15px",
  marginBottom:"20px"
},

input:{
  padding:"10px",
  border:"1px solid #ddd",
  borderRadius:"5px"
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

resultSection:{
  marginTop:"40px"
},

resultGrid:{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
  gap:"20px"
},

resultCard:{
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
}

}

export default PredictSales;