import { useState, useEffect } from "react";
import { updateProfile } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setForm({ name: user.name || "", email: user.email || "", phone: user.phone || "" });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await updateProfile(form);
      localStorage.setItem("user", JSON.stringify({
        ...JSON.parse(localStorage.getItem("user")), ...res.data.user,
      }));
      toast.success("Profile updated!");
      navigate("/user");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const initials = form.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap');

        .profile-root {
          min-height: 100vh;
          background: #f7f8fc;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
        }

        /* CARD */
        .profile-card {
          width: 100%;
          max-width: 480px;
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
          border: 1px solid #f1f5f9;
          overflow: hidden;
        }

        /* TOP BANNER */
        .profile-banner {
          background: linear-gradient(135deg, #0a2342 0%, #1a4a7a 100%);
          padding: 36px 32px 64px;
          text-align: center;
          position: relative;
        }
        .profile-banner::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 40px;
          background: #fff;
          border-radius: 40px 40px 0 0;
        }
        .banner-brand {
          display: flex; align-items: center;
          justify-content: center; gap: 8px;
          margin-bottom: 28px;
        }
        .banner-brand-icon {
          width: 32px; height: 32px;
          background: rgba(255,255,255,0.15);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .banner-brand-name {
          font-family: 'Playfair Display', serif;
          color: rgba(255,255,255,0.9); font-size: 16px;
        }

        /* AVATAR */
        .avatar-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 12px;
        }
        .avatar {
          width: 80px; height: 80px;
          background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1));
          border: 3px solid rgba(255,255,255,0.4);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; font-weight: 700; color: #fff;
          letter-spacing: 1px;
        }
        .avatar-edit {
          position: absolute; bottom: 0; right: 0;
          width: 26px; height: 26px;
          background: #fff; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .banner-name {
          font-family: 'Playfair Display', serif;
          color: #fff; font-size: 20px; margin-bottom: 4px;
        }
        .banner-role {
          color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 400;
        }

        /* FORM BODY */
        .profile-body { padding: 8px 28px 28px; }

        .form-section-title {
          font-size: 12px; font-weight: 600;
          color: #94a3b8; letter-spacing: 0.8px;
          text-transform: uppercase; margin-bottom: 16px;
          padding-bottom: 8px; border-bottom: 1px solid #f1f5f9;
        }

        .field-group { margin-bottom: 16px; }
        .field-label {
          display: block; font-size: 12px; font-weight: 600;
          color: #475569; margin-bottom: 6px; letter-spacing: 0.3px;
        }
        .field-wrap { position: relative; }
        .field-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%); font-size: 15px; pointer-events: none;
        }
        .field-input {
          width: 100%; padding: 12px 14px 12px 42px;
          border: 1.5px solid #e2e8f0; border-radius: 12px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #0f172a; background: #fafbfc; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .field-input:focus, .field-input.focused {
          border-color: #1a4a7a;
          box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
          background: #fff;
        }

        /* EMAIL READ-ONLY */
        .field-input.readonly {
          background: #f8fafc; color: #94a3b8; cursor: not-allowed;
        }
        .readonly-badge {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          font-size: 10px; font-weight: 600;
          background: #f1f5f9; color: #94a3b8;
          padding: 3px 8px; border-radius: 6px; letter-spacing: 0.3px;
        }

        /* BUTTONS */
        .btn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }

        .update-btn {
          padding: 13px;
          background: linear-gradient(135deg, #0a2342, #1a4a7a);
          color: #fff; border: none; border-radius: 12px;
          font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          cursor: pointer; letter-spacing: 0.3px;
          transition: opacity 0.2s, transform 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .update-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .update-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .back-btn {
          padding: 13px;
          background: #f8fafc; color: #475569;
          border: 1.5px solid #e2e8f0; border-radius: 12px;
          font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .back-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }

        .spinner {
          display: inline-block; width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="profile-root">
        <div className="profile-card">

          {/* Banner */}
          <div className="profile-banner">
            <div className="banner-brand">
              <div className="banner-brand-icon">💊</div>
              <span className="banner-brand-name">MediCine Finder</span>
            </div>
            <div className="avatar-wrap">
              <div className="avatar">{initials}</div>
              <div className="avatar-edit">✏️</div>
            </div>
            <div className="banner-name">{form.name || "Your Name"}</div>
            <div className="banner-role">Account Member</div>
          </div>

          {/* Form */}
          <div className="profile-body">
            <div className="form-section-title">Personal Information</div>

            <div className="field-group">
              <label className="field-label">Full Name</label>
              <div className="field-wrap">
                <span className="field-icon">👤</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`field-input ${focused === "name" ? "focused" : ""}`}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Email Address</label>
              <div className="field-wrap">
                <span className="field-icon">✉️</span>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`field-input ${focused === "email" ? "focused" : ""}`}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Phone Number</label>
              <div className="field-wrap">
                <span className="field-icon">📱</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={`field-input ${focused === "phone" ? "focused" : ""}`}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused("")}
                />
              </div>
            </div>

            <div className="btn-row">
              <button className="back-btn" onClick={() => navigate(-1)}>
                ← Go Back
              </button>
              <button className="update-btn" onClick={handleUpdate} disabled={loading}>
                {loading ? <span className="spinner" /> : "✓"}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
