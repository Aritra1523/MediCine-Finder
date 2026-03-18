import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <h1
          className="text-2xl font-extrabold text-blue-600 cursor-pointer"
          onClick={() => navigate("/user")}
        >
          MediFinder
        </h1>

        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-100 px-3 py-2
                       rounded-full hover:bg-gray-200 transition"
          >
            <span className="text-sm font-medium">User</span>
            <span className="text-xl">👤</span>
          </button>

          {/* DROPDOWN */}
          {open && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white border
                         rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/history")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Search History
              </button>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-red-600
                           hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
