import React, { useState } from 'react';

const ValidatedForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name should only contain letters and spaces';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone number should be 10 digits';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      alert(JSON.stringify(formData, null, 2));
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-xl font-bold text-gray-800">Contact Form</h1>
          <p className="text-sm text-gray-500 mt-1">Please fill out all required fields</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded bg-white"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded bg-white"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded bg-white"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ValidatedForm;