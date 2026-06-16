import React, { useEffect, useState } from "react";
import axios from "axios";

function DonorList() {
  const [donors, setDonors] = useState([]);
  const [editingDonor, setEditingDonor] = useState(null);
  const [form, setForm] = useState({
    blood_group: "",
    location: "",
    last_donation_date: "",
  });

  // Fetch donor data
  const fetchDonors = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/donors`);
      setDonors(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
      alert("⚠️ Unable to fetch donor data. Check your backend connection.");
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Edit donor
  const handleEdit = (donor) => {
    setEditingDonor(donor);
    setForm({
      blood_group: donor.blood_group,
      location: donor.location,
      last_donation_date: donor.last_donation_date
        ? donor.last_donation_date.split("T")[0]
        : "",
    });
  };

  // Save donor
  const handleSave = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/donors/${editingDonor.id}`,
        form
      );
      alert("✅ Donor updated successfully!");
      setEditingDonor(null);
      fetchDonors();
    } catch (err) {
      console.error("Error updating donor:", err);
      alert("❌ Failed to update donor.");
    }
  };

  // Delete donor
  const handleDelete = async (id) => {
    if (!window.confirm("🩸 Are you sure you want to delete this donor?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/donors/${id}`);
      alert("🗑️ Donor deleted successfully!");
      fetchDonors();
    } catch (err) {
      console.error("Error deleting donor:", err);
      alert("❌ Failed to delete donor.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        🩸 Donor List
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-card border">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Blood Group</th>
              <th className="px-5 py-3 text-left">Location</th>
              <th className="px-5 py-3 text-left">Last Donation</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {donors.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-600 italic">
                  No donors found.
                </td>
              </tr>
            ) : (
              donors.map((d) => (
                <tr
                  key={d.id}
                  className="hover:bg-gray-50 transition-all"
                >
                  <td className="px-5 py-3 font-medium">{d.name}</td>

                  {editingDonor && editingDonor.id === d.id ? (
                    <>
                      {/* Blood Group */}
                      <td className="px-5 py-3">
                        <input
                          type="text"
                          name="blood_group"
                          value={form.blood_group}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-lg px-3 py-2 w-24 
                                     focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </td>

                      {/* Location */}
                      <td className="px-5 py-3">
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-lg px-3 py-2 
                                     focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </td>

                      {/* Last Donation */}
                      <td className="px-5 py-3">
                        <input
                          type="date"
                          name="last_donation_date"
                          value={form.last_donation_date}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-lg px-3 py-2 
                                     focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </td>

                      {/* Save / Cancel */}
                      <td className="px-5 py-3 text-center space-x-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingDonor(null)}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-3">{d.blood_group || "—"}</td>
                      <td className="px-5 py-3">{d.location || "—"}</td>
                      <td className="px-5 py-3">
                        {d.last_donation_date
                          ? d.last_donation_date.split("T")[0]
                          : "N/A"}
                      </td>

                      <td className="px-5 py-3 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(d)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DonorList;
