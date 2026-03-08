import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/sidebar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateRestaurant from "./pages/CreateRestaurant";
import UploadDataset from "./pages/UploadDataset";
import PredictSales from "./pages/PredictSales";

function App(){

  const [sidebarOpen,setSidebarOpen] = useState(false);

  return(

    <BrowserRouter>

      <Routes>

        {/* Public routes */}
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Login/>}/>

        {/* Application layout */}
        <Route path="/*" element={

          <div>

            {/* TOP NAVBAR */}
            <div
              style={{
                height:"60px",
                background:"#34495e",
                color:"white",
                display:"flex",
                alignItems:"center",
                padding:"0 20px",
                position:"fixed",
                width:"100%",
                top:"0",
                zIndex:"2000"
              }}
            >

              {/* hamburger */}
              <button
                onClick={()=>setSidebarOpen(!sidebarOpen)}
                style={{
                  fontSize:"22px",
                  marginRight:"20px",
                  background:"none",
                  border:"none",
                  color:"white",
                  cursor:"pointer"
                }}
              >
                ☰
              </button>

              <h2 style={{margin:0}}>PREDNSERVE</h2>

            </div>

            {/* SIDEBAR */}
            <Sidebar isOpen={sidebarOpen}/>

            {/* PAGE CONTENT */}
            <div
              style={{
                marginTop:"60px",
                marginLeft: sidebarOpen ? "240px" : "0",
                padding:"30px",
                transition:"0.3s"
              }}
            >

              <Routes>

                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard/>
                  </ProtectedRoute>
                }/>

                <Route path="/create-restaurant" element={
                  <ProtectedRoute>
                    <CreateRestaurant/>
                  </ProtectedRoute>
                }/>

                <Route path="/upload-dataset/:id" element={
                  <ProtectedRoute>
                    <UploadDataset/>
                  </ProtectedRoute>
                }/>

                <Route path="/predict-sales/:id" element={
                  <ProtectedRoute>
                    <PredictSales/>
                  </ProtectedRoute>
                }/>

              </Routes>

            </div>

          </div>

        }/>

      </Routes>

    </BrowserRouter>

  );
}

export default App;