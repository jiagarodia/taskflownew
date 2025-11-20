// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ name }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-semibold">TaskFlow</div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">Hi, {name || "User"}</div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-3 py-1 rounded-md text-sm bg-gray-100"
          >
            Dashboard
          </button>
          <button
            onClick={logout}
            className="px-3 py-1 rounded-md text-sm bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
