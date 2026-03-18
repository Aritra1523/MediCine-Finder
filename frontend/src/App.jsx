import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/Login";
import Register from "./auth/Register";

import SearchMedicine from "./user/SearchMedicine";
import Dashboard from "./pharmacist/Dashboard";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
    
     <Routes>

  {/* Default Route */}
  <Route path="/" element={<Navigate to="/register" />} />

  {/* Public Routes */}
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />

  {/* User Routes */}
  {token && role === "user" && (
    <Route path="/user" element={<SearchMedicine />} />
  )}

  {/* Pharmacist Routes */}
  {token && role === "pharmacist" && (
    <Route path="/pharmacist" element={<Dashboard />} />
  )}

  {/* Fallback */}
  <Route
    path="*"
    element={
      token
        ? <Navigate to={role === "pharmacist" ? "/pharmacist" : "/user"} />
        : <Navigate to="/login" />
    }
  />

</Routes>

    </BrowserRouter>
  );
}

export default App;
