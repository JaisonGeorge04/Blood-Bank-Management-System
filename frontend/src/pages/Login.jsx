import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        form
      );

      // Save token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("✅ Login successful!");

      window.location.href = "/dashboard";
    } catch (err) {
      alert("❌ Login failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-2">
        Login
      </h2>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                     focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Enter email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                     focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Enter password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg shadow
                   hover:bg-accent transition font-medium"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
