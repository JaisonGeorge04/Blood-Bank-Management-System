import React, { useState } from 'react';
import api from '../services/api';

function RequestForm() {
  const [form, setForm] = useState({
    hospital_id: '',
    blood_group: '',
    quantity: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/request', form)
      .then(res => alert('Request submitted: ' + JSON.stringify(res.data)))
      .catch(err => {
        console.error(err);
        alert('Error: ' + (err.response?.data?.error || err.message));
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <h2 className="text-2xl font-semibold text-primary mb-4">Hospital Request</h2>

      {/* Hospital ID */}
      <div>
        <label className="block mb-1 font-medium">Hospital ID</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                     focus:ring-2 focus:ring-primary focus:outline-none
                     placeholder-gray-400"
          placeholder="Enter Hospital ID (use user id)"
          required
          onChange={e => setForm({ ...form, hospital_id: e.target.value })}
        />
      </div>

      {/* Blood Group */}
      <div>
        <label className="block mb-1 font-medium">Blood Group</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                     focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="e.g., O+"
          required
          onChange={e => setForm({ ...form, blood_group: e.target.value })}
        />
      </div>

      {/* Quantity */}
      <div>
        <label className="block mb-1 font-medium">Quantity (Units)</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                     focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Enter quantity"
          required
          onChange={e => setForm({ ...form, quantity: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg shadow
                     hover:bg-accent transition font-medium"
        >
          Submit Request
        </button>
      </div>

    </form>
  );
}

export default RequestForm;
