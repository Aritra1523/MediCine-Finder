

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addMedicine, getMyMedicines, updateMedicine, deleteMedicine } from "../api";

export default function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", stock: "", unit: "tablet", unitQty: 1 });
  const [form, setForm] = useState({ name: "", price: "", stock: "", unit: "tablet", unitQty: 1 });
  const [deleting, setDeleting] = useState(null);
  const [adding, setAdding] = useState(false);

  const loadMeds = async () => {
    try { const res = await getMyMedicines(); setMedicines(res.data); } catch {}
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.stock) { toast.error("Please fill all fields"); return; }
    try {
      setAdding(true);
      await addMedicine(form);
      setForm({ name: "", price: "", stock: "", unit: "tablet", unitQty: 1 });
      await loadMeds();
      toast.success("Medicine added!");
    } catch { toast.error("Failed to add medicine"); }
    finally { setAdding(false); }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try { await deleteMedicine(id); await loadMeds(); toast.success("Deleted!"); }
    catch { toast.error("Failed to delete"); }
    finally { setDeleting(null); }
  };

  const handleSaveEdit = async (id) => {
    try { await updateMedicine(id, editForm); setEditId(null); await loadMeds(); toast.success("Updated!"); }
    catch { toast.error("Failed to update"); }
  };

  useEffect(() => { loadMeds(); }, []);
  useEffect(() => { setUser(JSON.parse(localStorage.getItem("user"))); }, []);

  const initials = user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "P";

  const unitLabel = (item) => {
    const u = item.unit ?? "tablet";
    if (u === "tablet") return "per tablet";
    if (u === "strip") return `per strip (${item.unitQty ?? 1} tabs)`;
    if (u === "syrup") return `per bottle (${item.unitQty ?? 1} ml)`;
    if (u === "bottle") return "per bottle";
    return "";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap');

        * { box-sizing: border-box; }
        .dash-root {
          min-height: 100vh;
          background: #f7f8fc;
          font-family: 'DM Sans', sans-serif;
        }

        /* TOPBAR */
        .dash-topbar {
          background: #fff;
          border-bottom: 1px solid #f1f5f9;
          padding: 0 24px;
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 10;
          box-shadow: 0 1px 8px rgba(0,0,0,0.04);
        }
        .topbar-brand { display: flex; align-items: center; gap: 10px; }
        .topbar-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #0a2342, #1a4a7a);
          border-radius: 10px; display: flex; align-items: center;
          justify-content: center; font-size: 18px;
        }
        .topbar-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px; color: #0f172a;
        }
        .topbar-right { display: flex; align-items: center; gap: 12px; }
        .topbar-greeting { font-size: 14px; color: #64748b; display: none; }
        @media(min-width:500px){ .topbar-greeting { display: block; } }
        .topbar-avatar {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #0a2342, #1a4a7a);
          border-radius: 50%; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600; cursor: pointer;
        }
        .logout-btn {
          padding: 7px 14px; border-radius: 8px;
          border: 1.5px solid #e2e8f0; background: #fff;
          font-size: 13px; font-weight: 500; color: #64748b;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .logout-btn:hover { border-color: #cbd5e1; color: #ef4444; }

        /* BODY */
        .dash-body { max-width: 900px; margin: 0 auto; padding: 32px 16px 60px; }

        /* STATS */
        .stats-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 28px; }
        @media(max-width:480px){ .stats-row { grid-template-columns: 1fr; } }
        .stat-card {
          background: #fff; border-radius: 14px;
          border: 1px solid #f1f5f9;
          padding: 20px; display: flex; align-items: center; gap: 14px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
        }
        .stat-icon {
          width: 44px; height: 44px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;
        }
        .stat-icon.blue { background: #eff6ff; }
        .stat-icon.green { background: #f0fdf4; }
        .stat-icon.orange { background: #fff7ed; }
        .stat-val { font-size: 22px; font-weight: 700; color: #0f172a; }
        .stat-label { font-size: 12px; color: #94a3b8; font-weight: 500; }

        /* SECTION */
        .section-title {
          font-size: 16px; font-weight: 600; color: #0f172a;
          margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
        }

        /* ADD FORM */
        .add-card {
          background: #fff; border-radius: 18px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          padding: 24px; margin-bottom: 28px;
        }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        @media(max-width:500px){ .form-grid { grid-template-columns: 1fr; } }
        .form-grid.three { grid-template-columns: 1fr 1fr 1fr; }
        @media(max-width:600px){ .form-grid.three { grid-template-columns: 1fr 1fr; } }

        .f-label { display: block; font-size: 12px; font-weight: 500; color: #475569; margin-bottom: 5px; letter-spacing: 0.3px; }
        .f-input {
          width: 100%; padding: 10px 12px;
          border: 1.5px solid #e2e8f0; border-radius: 10px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #0f172a; outline: none; background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .f-input:focus { border-color: #1a4a7a; box-shadow: 0 0 0 3px rgba(26,74,122,0.07); }

        .add-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #0a2342, #1a4a7a);
          color: #fff; border: none; border-radius: 11px;
          font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s; margin-top: 4px;
        }
        .add-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .add-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* MED LIST */
        .med-cards { display: flex; flex-direction: column; gap: 12px; }
        .med-card {
          background: #fff; border-radius: 14px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          padding: 18px 20px;
          transition: box-shadow 0.2s;
        }
        .med-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

        .med-card-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .med-card-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
        .med-pill-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: #eff6ff; display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .med-card-name { font-size: 15px; font-weight: 600; color: #0f172a; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .med-card-meta { font-size: 12px; color: #64748b; }
        .med-card-meta strong { color: #0f172a; }

        .med-stock-badge {
          font-size: 11px; font-weight: 600; padding: 4px 10px;
          border-radius: 20px; white-space: nowrap; flex-shrink: 0;
        }
        .stock-in { background: #dcfce7; color: #16a34a; }
        .stock-low { background: #fee2e2; color: #dc2626; }

        .med-actions { display: flex; gap: 8px; flex-shrink: 0; }
        .edit-btn {
          padding: 7px 14px; border-radius: 8px;
          border: 1.5px solid #e2e8f0; background: #fff;
          font-size: 12px; font-weight: 600; color: #1a4a7a;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .edit-btn:hover { background: #eff6ff; border-color: #bfdbfe; }
        .del-btn {
          padding: 7px 14px; border-radius: 8px;
          border: none; background: #fee2e2;
          font-size: 12px; font-weight: 600; color: #dc2626;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .del-btn:hover { background: #fecaca; }
        .del-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* EDIT FORM inline */
        .edit-row {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 8px; margin-top: 14px; padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }
        @media(max-width:600px){ .edit-row { grid-template-columns: 1fr 1fr; } }
        .save-btn {
          padding: 8px 16px; border-radius: 8px;
          border: none; background: #16a34a; color: #fff;
          font-size: 13px; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: opacity 0.2s;
        }
        .save-btn:hover { opacity: 0.88; }
        .cancel-btn {
          padding: 8px 14px; border-radius: 8px;
          border: 1.5px solid #e2e8f0; background: #fff;
          font-size: 13px; font-weight: 500; color: #64748b;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .cancel-btn:hover { background: #f8fafc; }
        .edit-action-row { display: flex; gap: 8px; align-items: center; margin-top: 10px; }

        .empty-state { text-align: center; padding: 48px 20px; color: #94a3b8; }
        .empty-state-icon { font-size: 40px; margin-bottom: 10px; }
        .empty-state-text { font-size: 15px; font-weight: 500; color: #475569; }

        .spinner {
          display: inline-block; width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          border-radius: 50%; animation: spin 0.7s linear infinite;
          vertical-align: middle; margin-right: 6px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="dash-root">
        {/* Topbar */}
        <div className="dash-topbar">
          <div className="topbar-brand">
            <div className="topbar-icon">💊</div>
            <span className="topbar-name">MediCine Finder</span>
          </div>
          <div className="topbar-right">
            <span className="topbar-greeting">👋 {user?.name || "Pharmacist"}</span>
            <div className="topbar-avatar">{initials}</div>
            <button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href = "/login"; }}>
              Logout
            </button>
          </div>
        </div>

        <div className="dash-body">
          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon blue">💊</div>
              <div>
                <div className="stat-val">{medicines.length}</div>
                <div className="stat-label">Total Medicines</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">✅</div>
              <div>
                <div className="stat-val">{medicines.filter(m => m.stock > 10).length}</div>
                <div className="stat-label">In Stock</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">⚠️</div>
              <div>
                <div className="stat-val">{medicines.filter(m => m.stock <= 10).length}</div>
                <div className="stat-label">Low Stock</div>
              </div>
            </div>
          </div>

          {/* Add Medicine */}
          <div className="add-card">
            <div className="section-title">➕ Add New Medicine</div>
            <div className="form-grid">
              <div>
                <label className="f-label">Medicine Name</label>
                <input className="f-input" placeholder="e.g. Paracetamol"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="f-label">Price (₹)</label>
                <input className="f-input" type="number" placeholder="0.00"
                  value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              </div>
            </div>
            <div className="form-grid three">
              <div>
                <label className="f-label">Stock Quantity</label>
                <input className="f-input" type="number" placeholder="0"
                  value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
              </div>
              <div>
                <label className="f-label">Unit Type</label>
                <select className="f-input" value={form.unit}
                  onChange={e => setForm({ ...form, unit: e.target.value, unitQty: 1 })}>
                  <option value="tablet">Per Tablet</option>
                  <option value="strip">Per Strip</option>
                  <option value="syrup">Syrup (ml)</option>
                  <option value="bottle">Per Bottle</option>
                </select>
              </div>
              {form.unit !== "tablet" && (
                <div>
                  <label className="f-label">{form.unit === "strip" ? "Tabs/strip" : "ML/bottle"}</label>
                  <input className="f-input" type="number" placeholder="Qty"
                    value={form.unitQty} onChange={e => setForm({ ...form, unitQty: Number(e.target.value) })} />
                </div>
              )}
            </div>
            <button className="add-btn" onClick={handleSubmit} disabled={adding}>
              {adding && <span className="spinner" />}
              {adding ? "Adding..." : "Add Medicine"}
            </button>
          </div>

          {/* Medicine List */}
          <div className="section-title">📋 My Inventory ({medicines.length})</div>
          <div className="med-cards">
            {medicines.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📦</div>
                <div className="empty-state-text">No medicines added yet</div>
              </div>
            ) : medicines.map((m) => (
              <div key={m._id} className="med-card">
                <div className="med-card-top">
                  <div className="med-card-left">
                    <div className="med-pill-icon">💊</div>
                    <div style={{minWidth:0}}>
                      <div className="med-card-name">{m.name}</div>
                      <div className="med-card-meta">
                        <strong>₹{m.price}</strong> {unitLabel(m)} · Stock: {m.stock}
                      </div>
                    </div>
                  </div>
                  <span className={`med-stock-badge ${m.stock > 10 ? "stock-in" : "stock-low"}`}>
                    {m.stock > 10 ? "In Stock" : "Low Stock"}
                  </span>
                  <div className="med-actions">
                    <button className="edit-btn" onClick={() => { setEditId(m._id); setEditForm({ name: m.name, price: m.price, stock: m.stock, unit: m.unit || "tablet", unitQty: m.unitQty || 1 }); }}>
                      ✏️ Edit
                    </button>
                    <button className="del-btn" disabled={deleting === m._id} onClick={() => handleDelete(m._id)}>
                      {deleting === m._id ? "..." : "🗑️"}
                    </button>
                  </div>
                </div>

                {editId === m._id && (
                  <>
                    <div className="edit-row">
                      <div>
                        <label className="f-label">Name</label>
                        <input className="f-input" value={editForm.name}
                          onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="f-label">Price</label>
                        <input className="f-input" type="number" value={editForm.price}
                          onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
                      </div>
                      <div>
                        <label className="f-label">Stock</label>
                        <input className="f-input" type="number" value={editForm.stock}
                          onChange={e => setEditForm({ ...editForm, stock: e.target.value })} />
                      </div>
                      <div>
                        <label className="f-label">Unit</label>
                        <select className="f-input" value={editForm.unit}
                          onChange={e => setEditForm({ ...editForm, unit: e.target.value, unitQty: 1 })}>
                          <option value="tablet">Tablet</option>
                          <option value="strip">Strip</option>
                          <option value="syrup">Syrup</option>
                          <option value="bottle">Bottle</option>
                        </select>
                      </div>
                    </div>
                    <div className="edit-action-row">
                      <button className="save-btn" onClick={() => handleSaveEdit(m._id)}>Save Changes</button>
                      <button className="cancel-btn" onClick={() => setEditId(null)}>Cancel</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
