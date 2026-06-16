import React, { useState } from 'react';
import api from '../services/api';

function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
    blood_group: '',
    location: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/register', form)
      .then(res => alert('Registered: ' + JSON.stringify(res.data)))
      .catch(err => {
        console.error(err);
        alert('Error: ' + (err.response?.data?.error || err.message));
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <h2 className="text-2xl font-semibold text-primary mb-4">Register</h2>

      {/* Name */}
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 
                     focus:ring-2 focus:ring-primary focus:outline-none
                     placeholder-gray-400"
          placeholder="Enter name"
          required
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5
                     focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Enter email"
          required
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>

      {/* Password */}
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5
                     focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Enter password"
          required
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {/* Role */}
      <div>
        <label className="block mb-1 font-medium">Role</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white
                     focus:ring-2 focus:ring-primary focus:outline-none"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="donor">Donor</option>
          <option value="hospital">Hospital</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Blood Group */}
      <div>
        <label className="block mb-1 font-medium">Blood Group (optional)</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5
                     focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="e.g., O+"
          onChange={e => setForm({ ...form, blood_group: e.target.value })}
        />
      </div>

      {/* Location */}
      <div>
        <label className="block mb-1 font-medium">Location (optional)</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5
                     focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="City / Area"
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg shadow
                     hover:bg-accent transition font-medium"
        >
          Register
        </button>
      </div>

    </form>
  );
}

export default RegisterForm;
