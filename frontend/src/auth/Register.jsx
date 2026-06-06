// import { useState } from "react";
// import { register } from "../api";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function Register() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: "user",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     if (!form.name || !form.email || !form.password || !form.phone || !form.role) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       await register(form);
//       toast.success("Registration successful. Please login.");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err.response?.data?.msg || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-center text-blue-600">
//           Create Account
//         </h2>
//         <p className="text-center text-gray-500 mt-1">
//           Register to continue
//         </p>

//         <div className="mt-6 space-y-4">
//           <input
//             name="name"
//             placeholder="Full Name"
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             name="phone"
//             placeholder="Phone Number"
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <select
//             name="role"
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//           >
//             <option value="user">User</option>
//             <option value="pharmacist">Pharmacist</option>
//           </select>

//           <button
//             onClick={handleRegister}
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </div>

//         <p className="text-sm text-center text-gray-500 mt-6">
//           Already have an account?{" "}
//           <span
//             className="text-blue-600 font-medium cursor-pointer hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", role: "user",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.phone || !form.role) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await register(form);
      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap');

        .reg-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f7f8fc;
        }

        .reg-left {
          display: none;
          width: 42%;
          background: linear-gradient(155deg, #0a2342 0%, #1a4a7a 60%, #1e6fb5 100%);
          position: relative;
          overflow: hidden;
          padding: 60px 50px;
          flex-direction: column;
          justify-content: center;
          gap: 40px;
        }
        @media(min-width: 768px){ .reg-left { display: flex; } }

        .reg-left::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }

        .reg-brand {
          display: flex; align-items: center; gap: 12px; z-index: 1;
        }
        .reg-brand-icon {
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
        }
        .reg-brand-name {
          font-family: 'Playfair Display', serif;
          color: #fff; font-size: 22px;
        }

        .reg-left-content { z-index: 1; }
        .reg-left-title {
          font-family: 'Playfair Display', serif;
          color: #fff; font-size: 34px; line-height: 1.25; margin-bottom: 16px;
        }
        .reg-left-title span { color: #7dd3fc; }
        .reg-left-desc { color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.7; }

        .role-cards { z-index: 1; display: flex; flex-direction: column; gap: 12px; }
        .role-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px; padding: 16px 20px;
        }
        .role-card-title { color: #fff; font-weight: 600; font-size: 14px; margin-bottom: 4px; }
        .role-card-desc { color: rgba(255,255,255,0.55); font-size: 13px; }

        /* RIGHT */
        .reg-right {
          flex: 1; display: flex; align-items: center;
          justify-content: center; padding: 40px 24px;
        }
        .reg-card { width: 100%; max-width: 440px; }

        .reg-header { margin-bottom: 30px; }
        .reg-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px; color: #0f172a; margin-bottom: 6px;
        }
        .reg-sub { color: #94a3b8; font-size: 14px; }

        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .field-row.full { grid-template-columns: 1fr; }

        .field-group { margin-bottom: 14px; }
        .field-label {
          display: block; font-size: 13px; font-weight: 500;
          color: #475569; margin-bottom: 6px; letter-spacing: 0.3px;
        }
        .field-wrap { position: relative; }
        .field-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%); font-size: 15px; pointer-events: none;
        }
        .field-input {
          width: 100%; padding: 12px 12px 12px 40px;
          border: 1.5px solid #e2e8f0; border-radius: 11px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #0f172a; background: #fff; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .field-input:focus, .field-input.focused {
          border-color: #1a4a7a;
          box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
        }
        .field-select {
          width: 100%; padding: 12px 12px 12px 40px;
          border: 1.5px solid #e2e8f0; border-radius: 11px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #0f172a; background: #fff; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box; cursor: pointer; appearance: none;
        }
        .field-select:focus {
          border-color: #1a4a7a; box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
        }

        .role-toggle {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin-bottom: 20px;
        }
        .role-btn {
          padding: 11px; border-radius: 10px;
          border: 1.5px solid #e2e8f0; background: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          color: #64748b; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 7px;
        }
        .role-btn.active {
          border-color: #1a4a7a; background: #f0f6ff; color: #1a4a7a; font-weight: 600;
        }

        .reg-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #0a2342, #1a4a7a);
          color: #fff; border: none; border-radius: 12px;
          font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          cursor: pointer; letter-spacing: 0.3px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .reg-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
        .reg-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .reg-footer {
          text-align: center; font-size: 13px; color: #94a3b8; margin-top: 20px;
        }
        .reg-link { color: #1a4a7a; font-weight: 600; cursor: pointer; }
        .reg-link:hover { text-decoration: underline; }

        .spinner {
          display: inline-block; width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle; margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="reg-root">
        {/* Left */}
        <div className="reg-left">
          <div className="reg-brand">
            <div className="reg-brand-icon">💊</div>
            <span className="reg-brand-name">MediCine Finder</span>
          </div>
          <div className="reg-left-content">
            <h1 className="reg-left-title">Join thousands finding medicines <span>faster</span></h1>
            <p className="reg-left-desc">Whether you're a patient looking for medicines or a pharmacist managing inventory — we've got you covered.</p>
          </div>
          <div className="role-cards">
            <div className="role-card">
              <div className="role-card-title">👤 For Users</div>
              <div className="role-card-desc">Search medicines, compare prices, and contact pharmacies directly.</div>
            </div>
            <div className="role-card">
              <div className="role-card-title">🏪 For Pharmacists</div>
              <div className="role-card-desc">List your inventory, manage stock, and reach more customers.</div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="reg-right">
          <div className="reg-card">
            <div className="reg-header">
              <h2 className="reg-title">Create your account</h2>
              <p className="reg-sub">Fill in the details below to get started</p>
            </div>

            <div className="field-row">
              <div>
                <label className="field-label">Full Name</label>
                <div className="field-wrap">
                  <span className="field-icon">👤</span>
                  <input name="name" className={`field-input ${focused==="name"?"focused":""}`}
                    placeholder="John Doe" onChange={handleChange}
                    onFocus={()=>setFocused("name")} onBlur={()=>setFocused("")} />
                </div>
              </div>
              <div>
                <label className="field-label">Phone</label>
                <div className="field-wrap">
                  <span className="field-icon">📱</span>
                  <input name="phone" className={`field-input ${focused==="phone"?"focused":""}`}
                    placeholder="9876543210" onChange={handleChange}
                    onFocus={()=>setFocused("phone")} onBlur={()=>setFocused("")} />
                </div>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Email address</label>
              <div className="field-wrap">
                <span className="field-icon">✉️</span>
                <input type="email" name="email" className={`field-input ${focused==="email"?"focused":""}`}
                  placeholder="you@example.com" onChange={handleChange}
                  onFocus={()=>setFocused("email")} onBlur={()=>setFocused("")} />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon">🔒</span>
                <input type="password" name="password" className={`field-input ${focused==="password"?"focused":""}`}
                  placeholder="Create a strong password" onChange={handleChange}
                  onFocus={()=>setFocused("password")} onBlur={()=>setFocused("")} />
              </div>
            </div>

            <div style={{marginBottom: 20}}>
              <label className="field-label">I am a</label>
              <div className="role-toggle">
                <button className={`role-btn ${form.role==="user"?"active":""}`}
                  onClick={()=>setForm({...form, role:"user"})}>👤 User</button>
                <button className={`role-btn ${form.role==="pharmacist"?"active":""}`}
                  onClick={()=>setForm({...form, role:"pharmacist"})}>🏪 Pharmacist</button>
              </div>
            </div>

            <button className="reg-btn" onClick={handleRegister} disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="reg-footer">
              Already have an account?{" "}
              <span className="reg-link" onClick={()=>navigate("/login")}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
