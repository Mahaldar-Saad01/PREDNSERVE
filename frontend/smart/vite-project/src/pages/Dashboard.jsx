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

    <div>

      <h1>PREDNSERVE Dashboard</h1>

      <button
        style={{
          float:"right",
          padding:"8px 15px",
          background:"red",
          color:"white",
          border:"none",
          borderRadius:"5px",
          cursor:"pointer"
        }}
        onClick={handleLogout}
      >
        Logout
      </button>

      <h3>My Restaurants</h3>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Upload Dataset</th>
            <th>Predict Sales</th>
          </tr>
        </thead>

        <tbody>

          {restaurants.map((restaurant)=>(

            <tr key={restaurant.res_id}>

              <td>{restaurant.res_id}</td>

              <td>{restaurant.res_name}</td>

              <td>
                <Link to={`/upload-dataset/${restaurant.res_id}`}>
                  <button>Upload Dataset</button>
                </Link>
              </td>

              <td>
                <Link to={`/predict-sales/${restaurant.res_id}`}>
                  <button>Predict Sales</button>
                </Link>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <br/>

      <Link to="/create-restaurant">
        <button>Create New Restaurant</button>
      </Link>

    </div>

  );

}

export default Dashboard;