import { useState } from "react";
import { login } from "../api";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }

    try {
      setLoading(true);
      const res = await login({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "pharmacist") {
        localStorage.setItem("shopId", res.data.shopId);
      }

      toast.success("Login successful");

      window.location.href =
        res.data.role === "pharmacist" ? "/pharmacist" : "/user";
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mt-1">
          Login to your account
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          © {new Date().getFullYear()} Pharmacy App
        </p>
      </div>
    </div>
  );
}
