import { useState } from "react";
import axios from "axios";
import NavBar from "./UserNavbar"
import { useEffect } from "react";
export default function SearchMedicine() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
  // const search = async (value) => {
  //   setQuery(value);

  //   navigator.geolocation.getCurrentPosition(async (pos) => {
  //     const { latitude, longitude } = pos.coords;

  //     const res = await axios.get(
  //       `http://localhost:5000/api/medicines/search?q=${value}`/* &lat=${latitude}&lng=${longitude} */
  //     );

  //     setResults(res.data);
  //   });
  // };


  // 🔹 Load default medicines on page load

  const loadDefaultMedicines = async () => {
    setLoading(true);
    const res = await axios.get(
      "http://localhost:5000/api/medicines/search"
    );
    setResults(res.data);
    setLoading(false);
  };
  useEffect(() => {
    loadDefaultMedicines();
  }, []);

  
  // const search = async (value) => {
  //   if (!value) {
  //     setResults([]);
  //     return;
  //   }

  //   const res = await axios.get(
  //     `http://localhost:5000/api/medicines/search?q=${value}`,
  //   );

  //   setResults(res.data);
  // };
  const search = async (value) => {
  setQuery(value);

  if (!value.trim()) {
    loadDefaultMedicines(); // empty হলে default দেখাবে
    return;
  }

  setLoading(true);
  const res = await axios.get(
    `http://localhost:5000/api/medicines/search?q=${value}`
  );
  setResults(res.data);
  setLoading(false);
};


  return (
    <>
      <NavBar/>
    
<div className="min-h-screen bg-gray-100 pt-20">
    <div className="max-w-3xl mx-auto px-4">

      {/* 🔍 HEADER */}
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Find Medicine Near You
      </h2>

      {/* 🔎 SEARCH BAR */}
     <div className="sticky top-20 z-10 bg-gray-100 pb-4">

        <input
          className="w-full p-4 rounded-xl border border-gray-300 shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search medicine (e.g. Dolo, Paracetamol)..."
          value={query}
          onChange={(e) => search(e.target.value)}
        />
      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <p className="text-center mt-6 text-gray-500 animate-pulse">
          Loading medicines...
        </p>
      )}

      {/* 🚫 EMPTY */}
      {!loading && results.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No medicines found
        </p>
      )}

      {/* 🏪 SHOP LIST */}
      <div className="mt-6 space-y-6">
        {results.map((shop) => (
          <div
            key={shop.shopId}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
          >
            {/* SHOP HEADER */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-600">
                {shop.shopName}
              </h3>
              <span className="text-sm text-gray-500">
                Available Medicines
              </span>
            </div>

            {/* MEDICINES */}
            <div className="space-y-3">
              {shop.medicines.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gray-50
                             p-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      ₹{item.price}{" "}
                      {(item.unit ?? "tablet") === "tablet" && "per tablet"}
                      {(item.unit ?? "tablet") === "strip" &&
                        `per strip (${item.unitQty ?? 1} tablets)`}
                      {(item.unit ?? "tablet") === "syrup" &&
                        `per bottle (${item.unitQty ?? 1} ml)`}
                      {(item.unit ?? "tablet") === "bottle" && "per bottle"}
                      {" • "}
                      Stock: {item.stock}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full
                    ${
                      item.stock > 10
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.stock > 10 ? "In Stock" : "Low Stock"}
                  </span>
                </div>
              ))}
            </div>

            {/* 📞 CONTACT */}
            <div className="mt-5 flex gap-3">
              <a
                href={`tel:${shop.phone}`}
                className="flex-1 text-center bg-blue-600
                           text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                📞 Call
              </a>

              <a
                href={`https://wa.me/91${shop.phone}`}
                className="flex-1 text-center bg-green-600
                           text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  </>
);

}
