import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    donors: 0,
    requests: 0,
    units: 0,
  });

  const [recentDonors, setRecentDonors] = useState([]);

  // Fetch stats + recent donors
  const fetchDashboardData = async () => {
    try {
      const api = process.env.REACT_APP_API_URL;

      // Fetch donors
      const donorRes = await axios.get(`${api}/api/donors`);
      const donors = donorRes.data;

      // Count sample values (you can adjust based on backend)
      const totalDonors = donors.length;
      const totalUnits = donors.length * 1; // You can replace with real API
      const totalRequests = 12; // Example number (replace when backend ready)

      setStats({
        donors: totalDonors,
        requests: totalRequests,
        units: totalUnits,
      });

      setRecentDonors(donors.slice(0, 5)); // show latest 5 donors
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-10">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-primary text-center">
        Blood Bank Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white shadow-card rounded-2xl p-6 hover:shadow-xl transition">
          <h3 className="text-gray-600 text-sm font-medium">Total Donors</h3>
          <p className="text-4xl font-bold text-primary mt-3">{stats.donors}</p>
        </div>

        <div className="bg-white shadow-card rounded-2xl p-6 hover:shadow-xl transition">
          <h3 className="text-gray-600 text-sm font-medium">Blood Requests</h3>
          <p className="text-4xl font-bold text-primary mt-3">
            {stats.requests}
          </p>
        </div>

        <div className="bg-white shadow-card rounded-2xl p-6 hover:shadow-xl transition">
          <h3 className="text-gray-600 text-sm font-medium">Units Available</h3>
          <p className="text-4xl font-bold text-primary mt-3">{stats.units}</p>
        </div>

      </div>

      {/* Recent Donors */}
      <div className="bg-white shadow-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Donors</h2>

        {recentDonors.length === 0 ? (
          <p className="text-gray-600 italic">No recent donors found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Blood Group</th>
                <th className="px-4 py-2 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {recentDonors.map((d) => (
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{d.name}</td>
                  <td className="px-4 py-2">{d.blood_group || "—"}</td>
                  <td className="px-4 py-2">{d.location || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default Dashboard;
