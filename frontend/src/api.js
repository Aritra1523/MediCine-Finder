import axios from "axios";

const API = axios.create({
  baseURL: "https://medicine-finder-wpaf.onrender.com/api",
});

// Attach token automatically (important later)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// AUTH
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
// PROFILE
export const updateProfile = (data) =>
  API.put("/auth/update-profile", data);
// USER
export const getNearbyShops = (lat, lng) =>
  API.get(`/shops/nearby?lat=${lat}&lng=${lng}`);

export const searchMedicines = (query) =>
  API.get(`/medicines/search?q=${query}`);

// PHARMACIST 
export const addMedicine = (data) =>
  API.post("/pharmacist/medicine", data);

export const updateMedicine = (id, data) =>
  API.put(`/medicines/update/${id}`, data);

export const getMyMedicines = () =>
  API.get("/pharmacist/my-medicines");
export const deleteMedicine = (id) =>
  API.delete(`/medicines/delete/${id}`);
