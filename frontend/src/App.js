import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AdminRequests from "./components/AdminRequests";
import DonorList from "./components/DonorList";
import RegisterForm from "./components/RegisterForm";
import RequestForm from "./components/RequestForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary text-gray-800">
        {/* Navbar */}
        <nav className="bg-primary text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center px-6 py-3">
            <h1 className="text-2xl font-bold tracking-wide">🩸 Blood Bank</h1>
            <ul className="flex space-x-6">
  <li>
    <Link
      to="/"
      className="hover:text-gray-200 transition-colors duration-200"
    >
      Register
    </Link>
  </li>

  <li>
    <Link
      to="/donors"
      className="hover:text-gray-200 transition-colors duration-200"
    >
      Donors
    </Link>
  </li>

  <li>
    <Link
      to="/request"
      className="hover:text-gray-200 transition-colors duration-200"
    >
      Request
    </Link>
  </li>

  {/* ✅ ADMIN PANEL LINK */}
  <li>
    <Link
      to="/admin/requests"
      className="hover:text-gray-200 transition-colors duration-200"
    >
      Admin Panel
    </Link>
  </li>
</ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Routes>
              <Route path="/" element={<RegisterForm />} />
              <Route path="/donors" element={<DonorList />} />
              <Route path="/request" element={<RequestForm />} />
              <Route path="/admin/requests" element={<AdminRequests />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-gray-600 py-4 border-t mt-8">
          © {new Date().getFullYear()} Blood Bank Management System
        </footer>
      </div>
    </Router>
  );
}

export default App;
