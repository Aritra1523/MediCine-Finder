

import { useState } from "react";
import { login } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }
    try {
      setLoading(true);
      const res = await login({ email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.role === "pharmacist") {
        localStorage.setItem("shopId", res.data.shopId);
      }
      toast.success("Login successful");
      window.location.href = res.data.role === "pharmacist" ? "/pharmacist" : "/user";
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f7f8fc;
        }

        /* LEFT PANEL */
        .login-left {
          display: none;
          width: 45%;
          background: linear-gradient(155deg, #0a2342 0%, #1a4a7a 60%, #1e6fb5 100%);
          position: relative;
          overflow: hidden;
          padding: 60px 50px;
          flex-direction: column;
          justify-content: space-between;
        }
        @media(min-width: 768px){ .login-left { display: flex; } }

        .login-left::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 340px; height: 340px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }
        .login-left::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 1;
        }
        .brand-icon {
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
        }
        .brand-name {
          font-family: 'Playfair Display', serif;
          color: #fff;
          font-size: 22px;
          letter-spacing: 0.3px;
        }

        .left-content { z-index: 1; }
        .left-title {
          font-family: 'Playfair Display', serif;
          color: #fff;
          font-size: 38px;
          line-height: 1.2;
          margin-bottom: 18px;
        }
        .left-title span { color: #7dd3fc; }
        .left-desc {
          color: rgba(255,255,255,0.65);
          font-size: 15px;
          line-height: 1.7;
          max-width: 320px;
        }

        .features {
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 18px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .feature-icon { font-size: 20px; }
        .feature-text { color: rgba(255,255,255,0.85); font-size: 14px; font-weight: 500; }

        /* RIGHT PANEL */
        .login-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
        }

        .card-header { margin-bottom: 36px; }
        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          color: #0f172a;
          margin-bottom: 6px;
        }
        .card-sub { color: #94a3b8; font-size: 14px; font-weight: 400; }

        .field-group { margin-bottom: 18px; }
        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          margin-bottom: 7px;
          letter-spacing: 0.3px;
        }
        .field-wrap {
          position: relative;
        }
        .field-icon {
          position: absolute;
          left: 14px; top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          pointer-events: none;
        }
        .field-input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #0f172a;
          background: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .field-input:focus, .field-input.focused {
          border-color: #1a4a7a;
          box-shadow: 0 0 0 3px rgba(26,74,122,0.08);
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #0a2342, #1a4a7a);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: 8px;
          letter-spacing: 0.3px;
          transition: opacity 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }
        .login-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .divider {
          display: flex; align-items: center; gap: 12px;
          margin: 22px 0;
          color: #cbd5e1; font-size: 12px;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px; background: #e2e8f0;
        }

        .footer-text {
          text-align: center;
          font-size: 13px;
          color: #94a3b8;
          margin-top: 24px;
        }
        .footer-link {
          color: #1a4a7a;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
        }
        .footer-link:hover { text-decoration: underline; }

        .spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="login-root">
        {/* Left Panel */}
        <div className="login-left">
          <div className="brand">
            <div className="brand-icon">💊</div>
            <span className="brand-name">MediCine Finder</span>
          </div>

          <div className="left-content">
            <h1 className="left-title">Find medicines <span>near you</span>, instantly.</h1>
            <p className="left-desc">
              Connect with local pharmacies, check real-time stock, and get medicines delivered or picked up without the hassle.
            </p>
          </div>

          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">🔍</span>
              <span className="feature-text">Search medicines across nearby pharmacies</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📦</span>
              <span className="feature-text">Real-time stock & pricing information</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📞</span>
              <span className="feature-text">One-tap call or WhatsApp to pharmacist</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="login-right">
          <div className="login-card">
            <div className="card-header">
              <h2 className="card-title">Welcome back</h2>
              <p className="card-sub">Sign in to your account to continue</p>
            </div>

            <div className="field-group">
              <label className="field-label">Email address</label>
              <div className="field-wrap">
                <span className="field-icon">✉️</span>
                <input
                  type="email"
                  className={`field-input ${focused === "email" ? "focused" : ""}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <span className="field-icon">🔒</span>
                <input
                  type="password"
                  className={`field-input ${focused === "password" ? "focused" : ""}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
            </div>

            <button className="login-btn" onClick={handleLogin} disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="footer-text">
              Don't have an account?{" "}
              <span className="footer-link" onClick={() => navigate("/register")}>
                Create one
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

