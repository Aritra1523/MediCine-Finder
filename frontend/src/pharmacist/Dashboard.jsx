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
      console.log("MEDICINE DATA:", medicines);
      console.log(form.unit);
    } catch (err) {
      toast.error("Failed to add medicine");
      console.error(err);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col items-center">
        {" "}
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Pharmacist Dashboard
        </h2>
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-2xl">
          {" "}
          <input
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-2 rounded-lg mr-2 transition-all duration-200"
            placeholder="Medicine Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-2 rounded-lg mr-2 transition-all duration-200"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-2 rounded-lg mr-2 transition-all duration-200"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
          <select
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-2 rounded-lg mr-2 transition-all duration-200"
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
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-2 rounded-lg mr-2 transition-all duration-200"
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
          <button
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 text-white px-5 py-2 rounded-lg shadow-md"
            onClick={handleSubmit}
          >
            Add Medicine
          </button>
        </div>
        <div className="mt-10 w-full flex flex-col items-center">
          {medicines.map((m) => (
            <div
              key={m._id}
              className="bg-white p-6 mt-4 w-full max-w-2xl rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* <h4 className="text-lg font-bold text-gray-800">{m.name}</h4> */}

              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold text-gray-800">{m.name}</h4>

                {editId === m._id ? (
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg shadow-sm transition-all duration-200"
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
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded-lg transition-all duration-200"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-1 rounded-lg font-medium transition-all duration-200"
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
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-sm transition-all duration-200"
                      onClick={() => handleDelete(m._id)}
                    >
                      Delete 🗑️
                    </button>
                  </div>
                )}
              </div>

              {/* VIEW MODE */}
              {editId !== m._id ? (
                <p className="text-gray-600 mt-1 text-sm">
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
                    className="border p-1"
                    placeholder="Name"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                  <input
                    className="border p-1 w-20"
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

              {/* <div className="mt-2 flex gap-3">
                {editId === m._id ? (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg shadow-sm transition-all duration-200"
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
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded-lg transition-all duration-200"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-1 rounded-lg font-medium transition-all duration-200"
                      onClick={() => {
                        setEditId(m._id);
                        setEditForm({
                          // price: m.price,
                          // stock: m.stock,
                          // unit: m.unit,
                          // unitQty: m.unitQty || 1,
                          name: m.name,
                          price: m.price,
                          stock: m.stock,
                          unit: m.unit || "tablet",
                          unitQty: m.unitQty || 1,
                        });
                      }}
                    >
                      Edit✏️
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-sm transition-all duration-200"
                      onClick={() => handleDelete(m._id)}
                    >
                      Delete🗑️
                    </button>
                  </>
                )}
              </div> */}
            
            </div>
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
}
