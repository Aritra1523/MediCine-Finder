import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addMedicine,
  getMyMedicines,
  updateMedicine,
  deleteMedicine,
} from "../api";

export default function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);
  const [editForm, setEditForm] = useState({
    price: "",
    stock: "",
    unit: "",
    unitQty: 1,
  });
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    unit: "tablet",
    unitQty: 1,
  });

  const loadMeds = async () => {
    const res = await getMyMedicines(); // ✅ no shopId
    setMedicines(res.data);
    //console.log("MEDICINES FROM API:", res.data);
  };

  const handleSubmit = async () => {
    // console.log(form);
    if (!form.name || !form.price || !form.stock) {
      toast.error("Please fill all fields");

      return;
    }

    try {
      await addMedicine(form); // API call
      setForm({ name: "", price: "", stock: "", unit: "tablet", unitQty: 1 });
      loadMeds();
      toast.success("Medicine added successfully");
      // console.log("MEDICINE DATA:", medicines);
      // console.log(form.unit);
    } catch (err) {
      toast.error("Failed to add medicine");
      // console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await deleteMedicine(id);
    loadMeds();
    toast.success("Medicine deleted successfully", {
      style: {
        background: "red",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    loadMeds();
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6 flex flex-col items-center font-sans">
      <div className="w-full max-w-5xl flex flex-col">
        {" "}
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            💊 Pharmacist Dashboard
          </h2>

          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-gray-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">Pharmacist</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold shadow">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-gray-200w-full max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Add Medicine
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {" "}
            <input
              className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-2.5 rounded-xl w-full transition-all duration-200 bg-white/80"
              placeholder="Medicine Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-2.5 rounded-xl w-full transition-all duration-200 bg-white/80 cursor-pointer"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2 rounded-xl w-full transition"
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
            <select
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2 rounded-xl w-full transition"
              value={form.unit}
              onChange={(e) =>
                setForm({
                  ...form,
                  unit: e.target.value,
                  unitQty: 1, // reset when unit changes
                })
              }
            >
              <option value="tablet">Per Tablet</option>
              <option value="strip">Per Strip</option>
              <option value="syrup">Syrup (ml)</option>
              <option value="bottle">Per Bottle</option>
            </select>
            {/* EXTRA INPUT — OUTSIDE SELECT */}
            {form.unit !== "tablet" && (
              <input
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none px-3 py-2 rounded-xl w-full transition"
                type="number"
                placeholder={
                  form.unit === "strip"
                    ? "Tablets per strip"
                    : form.unit === "syrup"
                      ? "ML per bottle"
                      : "Quantity"
                }
                value={form.unitQty}
                onChange={(e) =>
                  setForm({ ...form, unitQty: Number(e.target.value) })
                }
              />
            )}
          </div>
          <button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all duration-200 text-white px-5 py-2.5 rounded-xl shadow-md w-full font-medium tracking-wide"
            onClick={handleSubmit}
          >
            Add Medicine
          </button>
        </div>
        <div className="mt-10 w-full max-w-2xl mx-auto flex flex-col gap-4">
          {medicines.map((m) => (
            <div
              key={m._id}
              className="bg-white/90 backdrop-blur-md w-full p-5 rounded-2xl border border-gray-200 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200flex flex-col gap-2"
            >
              {/* <h4 className="text-lg font-bold text-gray-800">{m.name}</h4> */}

              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-gray-800">
                  {m.name}
                </h4>

                {editId === m._id ? (
                  <div className="flex gap-2 items-center">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg shadow-sm transition-all duration-200transition"
                      onClick={async () => {
                        await updateMedicine(m._id, editForm);
                        setEditId(null);
                        loadMeds();
                        toast.info("Medicine updated");
                      }}
                    >
                      Save
                    </button>

                    <button
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg transition-all duration-200transition-all duration-200"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-1.5 rounded-lg font-medium transition-all duration-200font-medium transition"
                      onClick={() => {
                        setEditId(m._id);
                        setEditForm({
                          name: m.name,
                          price: m.price,
                          stock: m.stock,
                          unit: m.unit || "tablet",
                          unitQty: m.unitQty || 1,
                        });
                      }}
                    >
                      Edit ✏️
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg shadow-sm transition-all duration-200transition"
                      onClick={() => handleDelete(m._id)}
                    >
                      Delete 🗑️
                    </button>
                  </div>
                )}
              </div>

              {/* VIEW MODE */}
              {editId !== m._id ? (
                <p className="text-gray-500 text-sm leading-relaxed">
                  ₹{m.price} {(m.unit ?? "tablet") === "tablet" && "per tablet"}
                  {(m.unit ?? "tablet") === "strip" &&
                    `per strip (${m.unitQty ?? 1} tablets)`}
                  {(m.unit ?? "tablet") === "syrup" &&
                    `per bottle (${m.unitQty ?? 1} ml)`}
                  {(m.unit ?? "tablet") === "bottle" && "per bottle"}
                  {" | "}
                  Stock: {m.stock}{" "}
                  {(m.unit ?? "tablet") === "tablet" && "tablets"}
                  {(m.unit ?? "tablet") === "strip" && "strips"}
                  {(m.unit ?? "tablet") === "syrup" && "bottles"}
                  {(m.unit ?? "tablet") === "bottle" && "bottles"}
                </p>
              ) : (
                /* EDIT MODE */
                <div className="flex gap-2 mt-2">
                  <input
                    className="border border-gray-300 px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                  <input
                    className="border border-gray-200 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none transition-all w-20"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                  />

                  <input
                    className="border p-1 w-20"
                    value={editForm.stock}
                    onChange={(e) =>
                      setEditForm({ ...editForm, stock: e.target.value })
                    }
                  />
                  <select
                    className="border p-1"
                    value={editForm.unit}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        unit: e.target.value,
                        unitQty: 1,
                      })
                    }
                  >
                    <option value="tablet">Per Tablet</option>
                    <option value="strip">Per Strip</option>
                    <option value="syrup">Syrup (ml)</option>
                    <option value="bottle">Per Bottle</option>
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
}
