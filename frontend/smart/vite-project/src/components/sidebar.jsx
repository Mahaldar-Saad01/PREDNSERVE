import { Link } from "react-router-dom";

function Sidebar({isOpen}){

  return(

    <div
      style={{
        position:"fixed",
        top:"60px",
        left: isOpen ? "0" : "-240px",
        width:"240px",
        height:"100%",
        background:"#2c3e50",
        color:"white",
        padding:"20px",
        transition:"0.3s",
        zIndex:"1500"
      }}
    >

      <div style={{marginTop:"20px"}}>

        <Link to="/dashboard" style={{textDecoration:"none"}}>
          <p style={{color:"white",fontSize:"18px"}}>Dashboard</p>
        </Link>

        <Link to="/create-restaurant" style={{textDecoration:"none"}}>
          <p style={{color:"white",fontSize:"18px"}}>Create Restaurant</p>
        </Link>

      </div>

    </div>

  );
}

export default Sidebar;