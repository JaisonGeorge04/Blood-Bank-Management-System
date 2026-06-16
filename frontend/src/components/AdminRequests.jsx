import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/requests`);
    setRequests(res.data);
  } catch (err) {
    console.error("Error loading requests:", err);
    alert("Failed to load requests");
  }
};

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/request/${id}`, {
        status,
      });
      alert(`✅ Request ${status}`);
      fetchRequests();
    } catch (err) {
      console.error("Error updating request:", err);
      alert("Failed to update request");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="space-y-6">

      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        Admin Request Approvals
      </h2>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-3 text-left">Request ID</th>
              <th className="px-4 py-3 text-left">Hospital ID</th>
              <th className="px-4 py-3 text-left">Blood Group</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500 italic">
                  No pending requests.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{req.id}</td>
                  <td className="px-4 py-3">{req.hospital_id}</td>
                  <td className="px-4 py-3">{req.blood_group}</td>
                  <td className="px-4 py-3">{req.quantity}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700">
                    {req.status}
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    {/* Approve Button */}
                    <button
                      onClick={() => updateStatus(req.id, "approved")}
                      className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() => updateStatus(req.id, "rejected")}
                      className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminRequests;
