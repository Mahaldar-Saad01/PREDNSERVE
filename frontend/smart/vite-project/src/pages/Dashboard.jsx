import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";


function Dashboard(){

  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchRestaurants = async () => {
      try{
        const response = await API.get("/restaurants/");
        setRestaurants(response.data);
      }
      catch(error){
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/");
  };

  return(

<div style={styles.container}>

  <div style={styles.navbar}>
    <h2>PREDNSERVE Dashboard</h2>

    <button
      style={styles.logout}
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>

  <h3 style={styles.sectionTitle}>My Restaurants</h3>

  <div style={styles.grid}>

    {restaurants.map((restaurant)=>(

      <div key={restaurant.res_id} style={styles.card}>

        <h3>{restaurant.res_name}</h3>
        <p>ID: {restaurant.res_id}</p>

        <div style={styles.buttonGroup}>

          <Link to={`/upload-dataset/${restaurant.res_id}`}>
            <button style={styles.uploadBtn}>
              Upload Dataset
            </button>
          </Link>

          <Link to={`/predict-sales/${restaurant.res_id}`}>
            <button style={styles.predictBtn}>
              Predict Sales
            </button>
          </Link>

        </div>

      </div>

    ))}

  </div>

  <div style={{marginTop:"30px"}}>
    <Link to="/create-restaurant">
      <button style={styles.createBtn}>
        + Create New Restaurant
      </button>
    </Link>
  </div>

</div>

  );

}
const styles = {
  container:{
    padding:"40px",
    background:"#f4f6f9",
    minHeight:"100vh",
    fontFamily:"Arial"
  },

  navbar:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:"30px"
  },

  logout:{
    padding:"10px 20px",
    background:"#dc3545",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  },

  sectionTitle:{
    marginBottom:"20px"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
    gap:"20px"
  },

  card:{
    background:"white",
    padding:"20px",
    borderRadius:"10px",
    boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
  },

  buttonGroup:{
    marginTop:"15px",
    display:"flex",
    gap:"10px"
  },

  uploadBtn:{
    padding:"8px 12px",
    background:"#007bff",
    color:"white",
    border:"none",
    borderRadius:"5px",
    cursor:"pointer"
  },

  predictBtn:{
    padding:"8px 12px",
    background:"#28a745",
    color:"white",
    border:"none",
    borderRadius:"5px",
    cursor:"pointer"
  },

  createBtn:{
    padding:"12px 20px",
    background:"#6f42c1",
    color:"white",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer",
    fontSize:"16px"
  }
};
// function Dashboard(){

//   const [restaurants, setRestaurants] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {

//     const fetchRestaurants = async () => {

//       try{

//         const response = await API.get("/restaurants/");

//         setRestaurants(response.data);

//       }
//       catch(error){

//         console.error("Error fetching restaurants:", error);

//       }

//     };

//     fetchRestaurants();

//   }, []);

//   const handleLogout = () => {

//     localStorage.removeItem("token");

//     alert("Logged out successfully");

//     navigate("/");

//   };

//   return(

   
// <div style={styles.container}>

//   <div style={styles.navbar}>
//     <h2>PREDNSERVE Dashboard</h2>

//     <button
//       style={styles.logout}
//       onClick={handleLogout}
//     >
//       Logout
//     </button>
//   </div>


//   <h3 style={styles.sectionTitle}>My Restaurants</h3>


//   <div style={styles.grid}>

//     {restaurants.map((restaurant)=>(
      
//       <div key={restaurant.res_id} style={styles.card}>

//         <h3>{restaurant.res_name}</h3>
//         <p>ID: {restaurant.res_id}</p>

//         <div style={styles.buttonGroup}>

//           <Link to={`/upload-dataset/${restaurant.res_id}`}>
//             <button style={styles.uploadBtn}>
//               Upload Dataset
//             </button>
//           </Link>

//           <Link to={`/predict-sales/${restaurant.res_id}`}>
//             <button style={styles.predictBtn}>
//               Predict Sales
//             </button>
//           </Link>

//         </div>

//       </div>

//     ))}

//   </div>


//   <div style={{marginTop:"30px"}}>
//     <Link to="/create-restaurant">
//       <button style={styles.createBtn}>
//         + Create New Restaurant
//       </button>
//     </Link>
//   </div>

// </div>
// const styles = {

// container:{
//   padding:"40px",
//   background:"#f4f6f9",
//   minHeight:"100vh",
//   fontFamily:"Arial"
// },

// navbar:{
//   display:"flex",
//   justifyContent:"space-between",
//   alignItems:"center",
//   marginBottom:"30px"
// },

// logout:{
//   padding:"10px 20px",
//   background:"#dc3545",
//   color:"white",
//   border:"none",
//   borderRadius:"6px",
//   cursor:"pointer"
// },

// sectionTitle:{
//   marginBottom:"20px"
// },

// grid:{
//   display:"grid",
//   gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
//   gap:"20px"
// },

// card:{
//   background:"white",
//   padding:"20px",
//   borderRadius:"10px",
//   boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
// },

// buttonGroup:{
//   marginTop:"15px",
//   display:"flex",
//   gap:"10px"
// },

// uploadBtn:{
//   padding:"8px 12px",
//   background:"#007bff",
//   color:"white",
//   border:"none",
//   borderRadius:"5px",
//   cursor:"pointer"
// },

// predictBtn:{
//   padding:"8px 12px",
//   background:"#28a745",
//   color:"white",
//   border:"none",
//   borderRadius:"5px",
//   cursor:"pointer"
// },

// createBtn:{
//   padding:"12px 20px",
//   background:"#6f42c1",
//   color:"white",
//   border:"none",
//   borderRadius:"6px",
//   cursor:"pointer",
//   fontSize:"16px"
// }


//  <div>

//       <h1>PREDNSERVE Dashboard</h1>

//       <button
//         style={{
//           float:"right",
//           padding:"8px 15px",
//           background:"red",
//           color:"white",
//           border:"none",
//           borderRadius:"5px",
//           cursor:"pointer"
//         }}
//         onClick={handleLogout}
//       >
//         Logout
//       </button>

//       <h3>My Restaurants</h3>

//       <table border="1" cellPadding="10">

//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Upload Dataset</th>
//             <th>Predict Sales</th>
//           </tr>
//         </thead>

//         <tbody>

//           {restaurants.map((restaurant)=>(

//             <tr key={restaurant.res_id}>

//               <td>{restaurant.res_id}</td>

//               <td>{restaurant.res_name}</td>

//               <td>
//                 <Link to={`/upload-dataset/${restaurant.res_id}`}>
//                   <button>Upload Dataset</button>
//                 </Link>
//               </td>

//               <td>
//                 <Link to={`/predict-sales/${restaurant.res_id}`}>
//                   <button>Predict Sales</button>
//                 </Link>
//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//       <br/>

//       <Link to="/create-restaurant">
//         <button>Create New Restaurant</button>
//       </Link>

//     </div>

//   );

// }

export default Dashboard;